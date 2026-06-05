const getEnvVar = (key, fallback) => {
  const value = process.env[key];
  if (value && value.trim()) return value.trim();
  return fallback;
};

export const getAccessTokenSecret = () => getEnvVar('ACCESS_TOKEN_SECRET', 'dev-access-secret');
export const getRefreshTokenSecret = () => getEnvVar('REFRESH_TOKEN_SECRET', 'dev-refresh-secret');
export const getAccessTokenExpiry = () => getEnvVar('ACCESS_TOKEN_EXPIRY', '15m');
export const getRefreshTokenExpiry = () => getEnvVar('REFRESH_TOKEN_EXPIRY', '7d');
