// shared/api/client.ts
// وظیفه:
// ساخت یک axios مرکزی.
// چه چیزی حل می‌کند؟
// baseURL واحد
// timeout واحد
// headers واحد

import axios from "axios";
const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};

if (!env.API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL");
}

export default env;
export const apiClient = axios.create({
  baseURL: env.API_URL,

  timeout: 30000,

  headers: {
    Accept: "application/json",
  },

  withCredentials: true,
});
