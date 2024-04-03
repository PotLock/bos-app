/**
 * constants
 */

export const ROOT_SRC = "/potlock.near/widget/Index";
export const DEFAULT_POT_ID = "build.v1.potfactory.potlock.near";
export const DEFAULT_PROJECT_ID = "potlock.near";

export const ROUTER_CONFIG = {
  param: "tab",
  routes: [
    {
      path: "createproject",
      element: {
        src: "potlock.near/widget/Project.Create",
      },
    },
    {
      path: "editproject",
      element: {
        src: "potlock.near/widget/Project.Create",
      },
    },
    {
      path: "projects",
      element: {
        src: "potlock.near/widget/Project.ListPage",
      },
    },
    {
      path: "project",
      element: {
        src: "potlock.near/widget/Project.Detail",
      },
    },
    {
      path: "cart",
      element: {
        src: "potlock.near/widget/Cart.Checkout",
      },
    },
    {
      path: "feed",
      element: {
        src: "potlock.near/widget/Components.Feed",
      },
    },
    {
      path: "pots",
      element: {
        src: "potlock.near/widget/Pots.Home",
      },
    },
    {
      path: "deploypot",
      element: {
        src: "potlock.near/widget/Pots.Deploy",
      },
    },
    {
      path: "pot",
      element: {
        src: "potlock.near/widget/Pots.Detail",
      },
    },
    {
      path: "donors",
      element: {
        src: "potlock.near/widget/Components.Donors",
      },
    },
    {
      path: "profile",
      element: {
        src: "potlock.near/widget/Profile.Detail",
      },
    },
    {
      path: "editprofile",
      element: {
        src: "potlock.near/widget/Profile.Edit",
      },
    },
  ],
};
