import { createSwaggerSpec } from "next-swagger-doc";
import { buildSwaggerPaths } from "./src/shared/swagger/route-docs";

const swaggerPaths = buildSwaggerPaths();

export const getApiDocs = async () => {
  return createSwaggerSpec({
    apiFolder: "src/app/api",

    definition: {
      openapi: "3.0.0",

      info: {
        title: "Untitled Store API",
        version: "1.0.0",
        description: "Swagger documentation for the store API",
      },

      servers: [
        {
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],

      paths: swaggerPaths,

      /* ✅ FIXED TAGS (inside object) */
      tags: [
        { name: "Authentication", description: "Auth & OTP" },
        { name: "Public Catalog", description: "Public data" },
        { name: "Protected - Users" },
        { name: "Protected - Orders" },
        { name: "Protected - Products" },
      ],

      /* 🔥 STRIPE-STYLE GROUPING */
      "x-tagGroups": [
        {
          name: "Auth",
          tags: ["Authentication"],
        },
        {
          name: "Storefront",
          tags: ["Public Catalog"],
        },
        {
          name: "Core API",
          tags: [
            "Protected - Users",
            "Protected - Orders",
            "Protected - Products",
          ],
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },

      /* 🚀 STRIPE-LIKE UI ENHANCEMENT FLAGS */
      "x-samples-languages": ["curl", "javascript", "typescript"],

      "x-tag-expanded": true,
    },
  });
};
