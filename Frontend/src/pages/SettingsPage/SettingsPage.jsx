import React from "react";
import SideNav from "../../components/SideNav/SideNav";
import SettingsComp from "../../components/SettingsComp/SettingsComp";

function SettingsPage() {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <SettingsComp />
    </div>
  );
}

export default SettingsPage;
