/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  ///we will ask store about that uise is logged in or not amd selector has state which will telll that the user is
  //and that state will be enough to telll that the use is logged in or not
  const authStatus = useSelector((state) => state.auth.status);

  //we will use useeffect and useEffect will tell that where to send the use to login or any place like home
  // and changes in which places would be checkable or not
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);
  return loading ? <h1>Loading....</h1> : <>{children}</>;
}
