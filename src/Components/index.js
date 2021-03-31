import { lazy } from "react";

export { default as Header } from "./Header";
export { default as Preloader } from "./Preloader";

export const Register = lazy(() => import("./Register"));
export const Login = lazy(() => import("./Login"));