import { createBrowserRouter } from "react-router-dom";

const RootRouter = createBrowserRouter(
  [
    {
      path: "/",
      element:<></>
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default RootRouter;
