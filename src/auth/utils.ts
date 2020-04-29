const TOKEN_STORAGE_KEY = "dashboardAuth";
const TOKEN_STORAGE_TYPE = "dashboardAuthType";

export const getAuthToken = () =>
  localStorage.getItem(TOKEN_STORAGE_KEY) ||
  sessionStorage.getItem(TOKEN_STORAGE_KEY);

export const setAuthToken = (token: string, persist: boolean) =>
  persist
    ? localStorage.setItem(TOKEN_STORAGE_KEY, token)
    : sessionStorage.setItem(TOKEN_STORAGE_KEY, token);

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getAuthTokenType = () => localStorage.getItem(TOKEN_STORAGE_TYPE) || sessionStorage.getItem(TOKEN_STORAGE_TYPE);

export const setAuthTokenType = (type: 'USER' | 'SERVICE_ACCOUNT', persist: boolean) => persist ? localStorage.setItem(TOKEN_STORAGE_TYPE, type) : sessionStorage.setItem(TOKEN_STORAGE_TYPE, type);