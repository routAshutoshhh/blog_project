import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayut, Login } from "./components/Index.js";
import AddPost from "./pages/AddPost.jsx";
import Signup from "./pages/Signup.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: (
          <AuthLayut authentication={Login}>
            <Login />
          </AuthLayut>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayut authentication={false}>
            <Signup />
          </AuthLayut>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayut authentication>
            {" "}
            <AllPosts />
          </AuthLayut>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayut authentication>
            {" "}
            <AddPost />
          </AuthLayut>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayut authentication>
            {" "}
            <EditPost />
          </AuthLayut>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
