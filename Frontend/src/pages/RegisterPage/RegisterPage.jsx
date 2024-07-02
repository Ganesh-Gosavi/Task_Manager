import React from "react";
import Register from "../../components/Register/Register";
import CoverImage from "../../components/CoverImage/CoverImage";

function RegisterPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CoverImage />
      <Register />
    </div>
  );
}

export default RegisterPage;
