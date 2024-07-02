import React from "react";
import Login from "../../components/Login/Login";
import CoverImage from "../../components/CoverImage/CoverImage";
function LoginPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CoverImage />
      <Login />
    </div>
  );
}

export default LoginPage;
