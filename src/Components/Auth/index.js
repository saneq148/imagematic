import { lazy } from "react";

export { default as Auth } from "src/Components/Auth/Auth";

export const Login = lazy(() => import("src/Components/Auth/Login"));
export const Register = lazy(() => import("src/Components/Auth/Register"));