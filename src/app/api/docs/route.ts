import { buildSwaggerPaths } from "@/src/shared/swagger/route-docs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("mode") === "public" ? "public" : "admin";

  const spec = {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [{ bearerAuth: [] }],

    paths: buildSwaggerPaths(),
  };

  return Response.json(spec);
}
