"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import "swagger-ui-react/swagger-ui.css";
import "./swagger-theme.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

type DebugResponse = {
  user: {
    id: number;
    name: string;
    token: string;
    role: number;
  };

  ids: {
    addresses: number[];
    carts: number[];
    orders: number[];
    payments: number[];

    products: number[];
    variants: number[];
    comments: number[];
    blogs: number[];
    categories: number[];
    brands: number[];
    discounts: number[];
    banners: number[];
  };
} | null;
export type ServicesStatusResponse = {
  success: boolean;
  database: {
    connected: boolean;
  };
  storage: {
    connected: boolean;
  };
};
export default function DocsPage() {
  const [serverConnection, setServerConnection] =
    useState<ServicesStatusResponse | null>(null);
  const [data, setData] = useState<DebugResponse>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const fetchDebug = async () => {
      try {
        const res = await fetch("/api/auth/debug", {
          credentials: "include",
        });

        if (!res.ok) {
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    const checkDatabase = async () => {
      try {
        const res = await fetch("/api/check/database");
        const data: ServicesStatusResponse = await res.json();
        setServerConnection(data);
      } catch {
        setServerConnection(null);
      }
    };

    checkDatabase();
    fetchDebug();
  }, []);
  const copy = async (value: string | number, key: string) => {
    try {
      await navigator.clipboard.writeText(String(value));

      setCopied(key);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="swagger-wrapper" dir="ltr">
      {/* Debug Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "#111",
          borderBottom: "1px solid #333",
          color: "#fff",
          fontFamily: "monospace",
          boxShadow: "0 4px 12px rgba(0,0,0,.35)",
        }}
      >
        {/* Header */}
        <div
          style={{
            height: 48,
            padding: "0 2vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color:
                serverConnection === null
                  ? "#facc15"
                  : serverConnection?.storage.connected
                    ? "#4ade80"
                    : "#ff5b5b",
              fontWeight: 700,
            }}
          >
            {serverConnection === null
              ? "🟡 DB Checking..."
              : serverConnection?.storage.connected
                ? "🟢 CDN Connected"
                : "🔴 CDN Disconnected"}
          </span>
          <span
            style={{
              color:
                serverConnection === null
                  ? "#facc15"
                  : serverConnection?.database.connected
                    ? "#4ade80"
                    : "#ff5b5b",
              fontWeight: 700,
            }}
          >
            {serverConnection === null
              ? "🟡 DB Checking..."
              : serverConnection?.database.connected
                ? "🟢 DB Connected"
                : "🔴 DB Disconnected"}
          </span>
          {loading ? (
            <div>loading!!!</div>
          ) : !data ? (
            <div style={{ color: "#ff5b5b" }}>🔴 Not Logged In</div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  color: "#4ade80",
                  fontWeight: 700,
                }}
              >
                🟢 Logged In
              </span>

              <span>
                User:
                <strong style={{ marginLeft: 5 }}>
                  {data.user.name || "user"}
                </strong>
              </span>

              <span>
                Role:
                <strong style={{ marginLeft: 5 }}>
                  {data.user.role === 2 ? "admin" : "user"}
                </strong>
              </span>

              <span>
                ID:
                <strong style={{ marginLeft: 5 }}>{data.user.id}</strong>
              </span>

              <button
                style={buttonStyle}
                onClick={() => copy(data.user.token, "token")}
              >
                {copied === "token" ? "✅ Copied" : "Copy Token"}
              </button>
            </div>
          )}
          <button
            style={{
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: 5,
              padding: "4px 10px",
              cursor: "pointer",
            }}
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? "▲ Hide" : "▼ Show"}
          </button>
        </div>

        {/* Body */}
        {expanded && (
          <div
            style={{
              padding: 16,
              maxHeight: "90vh",
              overflowY: "auto",
              borderTop: "1px solid #222",
            }}
          >
            {loading ? (
              <div>⏳ Loading debug information...</div>
            ) : !data ? (
              <div style={{ color: "#ff5b5b" }}>🔴 Not Logged In</div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                    gap: 12,
                  }}
                >
                  {Object.entries(data.ids).map(([title, ids]) => (
                    <div
                      key={title}
                      style={{
                        background: "#1b1b1b",
                        border: "1px solid #333",
                        borderRadius: 8,
                        padding: 12,
                      }}
                    >
                      <div
                        style={{
                          color: "#4ade80",
                          marginBottom: 10,
                          fontWeight: 700,
                          textTransform: "capitalize",
                        }}
                      >
                        {title}
                      </div>

                      {ids.length === 0 ? (
                        <div
                          style={{
                            color: "#777",
                            fontSize: 12,
                          }}
                        >
                          Empty
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          {ids.map((id) => (
                            <button
                              key={id}
                              style={{
                                background:
                                  copied === `${title}-${id}`
                                    ? "#22c55e"
                                    : "#2a2a2a",
                                color: "#fff",
                                border: "1px solid #555",
                                borderRadius: 4,
                                padding: "4px 8px",
                                cursor: "pointer",
                                fontSize: 12,
                              }}
                              title="Copy"
                              onClick={() => copy(id, `${title}-${id}`)}
                            >
                              {copied === `${title}-${id}` ? "✓ Copied" : id}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* فاصله برای پنل */}
      <div style={{ height: expanded ? 430 : 48 }} />

      <SwaggerUI
        displayRequestDuration
        tryItOutEnabled
        defaultModelExpandDepth={2}
        defaultModelsExpandDepth={-1}
        docExpansion="none"
        requestInterceptor={(req) => {
          req.credentials = "include";
          return req;
        }}
        url="/api/docs"
      />
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  background: "#22c55e",
  color: "#000",
  border: "none",
  borderRadius: 5,
  padding: "5px 10px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 12,
};
