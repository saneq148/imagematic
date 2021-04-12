import { lazy } from "react";

export { default as ImageSelect } from "src/Components/AddPost/ImageSelect";
export { default as ImageSelected } from "src/Components/AddPost/ImageSelected";
export { default as AddPostForm } from "src/Components/AddPost/AddPostForm";
export { default as AddPostEditor } from "src/Components/AddPost/AddPostEditor";

export const AddPost = lazy(() => import("src/Components/AddPost/AddPost"));