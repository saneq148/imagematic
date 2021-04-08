import { lazy } from "react";

export { default as Header } from "./Header";
export { default as Preloader } from "./Preloader";
export { default as ImageSelect } from "./ImageSelect";
export { default as ImageSelected } from "./ImageSelected";
export { default as AddPostForm } from "./AddPostForm";

export const Register = lazy(() => import("./Register"));
export const Login = lazy(() => import("./Login"));