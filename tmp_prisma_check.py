import re, pathlib, json
root=pathlib.Path(r'c:/Users/HosseinAzadpoor/untitled-store')
schema=(root/'prisma'/'schema.prisma').read_text(encoding='utf-8')
models={}
for block in re.finditer(r'model\s+(\w+)\s*\{([^}]*)\}', schema, re.S):
    name=block.group(1)
    body=block.group(2)
    fields=[]
    for line in body.splitlines():
        line=line.strip()
        if not line or line.startswith('//'): continue
        m=re.match(r'([A-Za-z0-9_]+)\s+', line)
        if m: fields.append(m.group(1))
    models[name]=set(fields)
route_files=list(root.glob('src/app/api/**/*.ts'))
bad=[]
for path in route_files:
    text=path.read_text(encoding='utf-8')
    for m in re.finditer(r'prisma\.([A-Za-z0-9_]+)\.(findUnique|findFirst|findMany|count|create|update|upsert|delete|deleteMany)\s*\(', text):
        model=m.group(1)
        if model not in models:
            bad.append((path.relative_to(root), 'unknown model', model))
            continue
        start=m.end()
        sub=text[start:start+2000]
        depth=0
        s=None
        block=None
        for i,ch in enumerate(sub):
            if ch=='{':
                if depth==0: s=i
                depth+=1
            elif ch=='}':
                depth-=1
                if depth==0 and s is not None:
                    block=sub[s:i+1]
                    break
        if not block:
            continue
        for prop in re.findall(r'(\b[A-Za-z0-9_]+)\s*:', block):
            if prop in {'where','data','select','include','orderBy','take','skip','groupBy','having','distinct','asc','desc','connect','create','update','delete','set','push'}:
                continue
            if prop not in models[model]:
                bad.append((path.relative_to(root), model, prop))
bad = sorted(set(bad))
print(json.dumps({'issues':[{'file':str(p),'model':m,'field':f} for p,m,f in bad]}, indent=2))
