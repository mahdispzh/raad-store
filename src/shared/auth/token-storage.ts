let accessToken: string | null = null;

export const tokenStorage = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string) {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },
};
