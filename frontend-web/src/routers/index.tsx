import routePath from "@config/paths";
import Home from "@pages/Home";
import { AddTokenPage } from "@pages/AddTokenPage";

import { createBrowserRouter } from "react-router-dom";
import { UpdateTokenPage } from "@pages/UpDateTokenPage";


const RootRouter = createBrowserRouter(
  [
    {
      path: routePath.HOME_PATH,
      element:<Home/>,
    },
    {
      path: routePath.TOKEN_FORM_PAGE,
      element:<AddTokenPage/>,
    },
    {
      path: routePath.TOKEN_UPDATE_PAGE,
      element:<UpdateTokenPage/>,
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
