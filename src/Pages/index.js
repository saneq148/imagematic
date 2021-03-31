import { lazy } from "react";

export { default as Auth } from "./Auth";
export { default as Home } from "./Home";

export const Categories = lazy(() => import("./Categories"));
export const Profile = lazy(() => import("./Profile"));
