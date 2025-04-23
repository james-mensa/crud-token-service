const routePath = {
  HOME_PATH: "/",
} as const;
export type AppRoutePathTy = (typeof routePath)[keyof typeof routePath];
export default routePath;
