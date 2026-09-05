import fs from "node:fs";
import path from "node:path";

const routeRoot = path.join(process.cwd(), "src/app/api");

/* -----------------------------
   FILE COLLECTOR
------------------------------*/
function collectRouteFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectRouteFiles(fullPath);
    }

    return entry.name === "route.ts" ? [fullPath] : [];
  });
}

/* -----------------------------
   PATH TRANSFORM
------------------------------*/
function toOpenApiPath(relativePath: string): string {
  const sanitized = relativePath.replace(/\/route\.ts$/, "");
  return `/api/${sanitized.replace(/\[([^\]]+)\]/g, "{$1}")}`;
}

/* -----------------------------
   TAGS
------------------------------*/
const tagGroups: Record<string, string[]> = {
  Authentication: ["Authentication"],
  "Public Catalog": ["Public Catalog"],
  Protected: [],
  Other: [],
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTag(relativePath: string): string {
  if (relativePath.startsWith("auth/")) return "Authentication";
  if (relativePath.startsWith("public/")) return "Public Catalog";

  if (relativePath.startsWith("protected/")) {
    const section = relativePath.split("/")[1] ?? "General";
    const tag = `Protected - ${capitalize(section)}`;

    if (!tagGroups.Protected.includes(tag)) {
      tagGroups.Protected.push(tag);
    }

    return tag;
  }

  if (!tagGroups.Other.includes("Other")) {
    tagGroups.Other.push("Other");
  }

  return "Other";
}

/* -----------------------------
   REQUEST BODY INFERENCE
------------------------------*/
function inferRequestBody(src?: string, relPath?: string) {
  if (!src) return undefined;

  if (/send-?otp/i.test(relPath ?? "")) {
    return {
      schema: {
        type: "object",
        properties: { phone: { type: "string" } },
        required: ["phone"],
      },
      example: { phone: "+989123456789" },
    };
  }

  if (/verify-?otp/i.test(relPath ?? "")) {
    return {
      schema: {
        type: "object",
        properties: {
          phone: { type: "string" },
          code: { type: "string" },
        },
        required: ["phone", "code"],
      },
      example: { phone: "+989123456789", code: "1234" },
    };
  }

  const zodMatch = src.match(/z\.object\s*\(\s*\{([\s\S]*?)\}\s*\)/i);
  if (zodMatch?.[1]) {
    const keys = Array.from(zodMatch[1].matchAll(/(\w+)\s*:/g)).map(
      (m) => m[1],
    );

    const props: Record<string, any> = {};
    const example: Record<string, any> = {};

    keys.forEach((k) => {
      props[k] = { type: "string" };
      example[k] = `<${k}>`;
    });

    return {
      schema: { type: "object", properties: props, required: keys },
      example,
    };
  }

  return undefined;
}

/* -----------------------------
   DEFAULT EXAMPLE
------------------------------*/
function generateDefaultExample(method: string, relPath: string) {
  const example: Record<string, any> = {};

  if (/send-?otp/i.test(relPath)) return { phone: "+989123456789" };
  if (/verify-?otp/i.test(relPath)) {
    return { phone: "+989123456789", code: "1234" };
  }

  if (method === "post") {
    example.name = "Example name";
    example.description = "Example description";
  }

  return example;
}

/* -----------------------------
   ROUTE DOC
------------------------------*/
function createRouteDoc(relativePath: string, method: string, source?: string) {
  const isProtected = relativePath.startsWith("protected/");
  const tag = getTag(relativePath);

  const pathParams = Array.from(relativePath.matchAll(/\[([^\]]+)\]/g)).map(
    (m) => m[1].replace(/^\.\.\./, ""),
  );

  const parameters = pathParams.map((name) => ({
    name,
    in: "path",
    required: true,
    schema: { type: "string" },
  }));

  const hasBody = ["post", "put", "patch"].includes(method);

  const inferred = inferRequestBody(source, relativePath);

  const requestBody = hasBody
    ? {
        required: true,
        content: {
          "application/json": {
            schema: inferred?.schema ?? { type: "object" },
            example:
              inferred?.example ?? generateDefaultExample(method, relativePath),
          },
        },
      }
    : undefined;

  return {
    summary: `${method.toUpperCase()} ${relativePath.replace(
      /\/route\.ts$/,
      "",
    )}`,
    description: `${method.toUpperCase()} ${relativePath} endpoint`,
    tags: [tag],
    ...(isProtected ? { security: [{ bearerAuth: [] }] } : {}),
    ...(parameters.length ? { parameters } : {}),
    ...(requestBody ? { requestBody } : {}),
    responses: {
      200: { description: "Success" },
      400: { description: "Bad Request" },
      401: { description: "Unauthorized" },
    },
  };
}

/* -----------------------------
   BUILD PATHS
------------------------------*/
export function buildSwaggerPaths() {
  const routeFiles = collectRouteFiles(routeRoot);

  return routeFiles.reduce<Record<string, any>>((acc, filePath) => {
    const relativePath = path.relative(routeRoot, filePath).replace(/\\/g, "/");

    const openApiPath = toOpenApiPath(relativePath);
    const source = fs.readFileSync(filePath, "utf8");

    const methods = Array.from(
      new Set(source.match(/\b(GET|POST|PUT|DELETE|PATCH)\b/g) ?? []),
    );

    if (!methods.length) return acc;

    acc[openApiPath] = methods.reduce<Record<string, any>>((m, method) => {
      m[method.toLowerCase()] = createRouteDoc(
        relativePath,
        method.toLowerCase(),
        source,
      );
      return m;
    }, {});

    return acc;
  }, {});
}

/* export tagGroups for swagger.ts */
export { tagGroups };
