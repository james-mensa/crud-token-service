const routePath = {
  HOME_PATH: "/",
  TOKEN_FORM_PAGE:"/tokens/new",
  TOKEN_UPDATE_PAGE:"/tokens/:address/update"
} as const;
export type AppRoutePathTy = (typeof routePath)[keyof typeof routePath];
export default routePath;
