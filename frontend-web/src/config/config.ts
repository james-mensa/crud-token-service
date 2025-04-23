export const appConfig = {
  backendUrl: process.env.REACT_APP_BACKEND_URL ?? "",

} as const;

export type AppConfig = (typeof appConfig)[keyof typeof appConfig];
