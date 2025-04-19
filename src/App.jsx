import React from "react";
import "./App.scss";
import Main from "./Main";
import Header from "./Header";

function CartSideBar() {
  return <aside className="container-cart">cart</aside>;
}

function SideBar() {
  return <aside className="container-sidebar">aside</aside>;
}

function App() {
  return (
    <div className="container-hm">
      <Header />
      <SideBar />
      <Main />
      <CartSideBar />
    </div>
  );
}

export default App;
