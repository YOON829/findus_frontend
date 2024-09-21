// src/components/Layout.js
import React from "react";
import "../css/Layout.css";
import Header from "./Header";
import Footer from "./Footer";

const CustomLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout">
        <main className="content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default CustomLayout;
