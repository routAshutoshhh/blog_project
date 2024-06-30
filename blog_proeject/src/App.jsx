import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/Index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout()); //just to amke sure that if the suer isnt logged in he is logged out
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //conditional rendering
  return !loading ? (
    <div className="min-h-sc flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>TODO: {/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
