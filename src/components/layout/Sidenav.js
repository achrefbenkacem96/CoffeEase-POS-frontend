/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

 
  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];
 
  const command = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const order = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const stock = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M5 2C4.44772 2 4 2.44772 4 3V17C4 17.5523 4.44772 18 5 18H15C15.5523 18 16 17.5523 16 17V3C16 2.44772 15.5523 2 15 2H5Z"
        fill={color}
      ></path>
      <path
        d="M2 6C2 5.44772 2.44772 5 3 5H17C17.5523 5 18 5.44772 18 6V7C18 7.55228 17.5523 8 17 8H3C2.44772 8 2 7.55228 2 7V6Z"
        fill={color}
      ></path>
      <path
        d="M9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const transaction = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M6 3C5.44772 3 5 3.44772 5 4C5 4.55228 5.44772 5 6 5H13C14.1046 5 15 5.89543 15 7V8H13V7C13 6.44772 12.5523 6 12 6H6C5.44772 6 5 5.55228 5 5V10H3V4C3 3.44772 3.44772 3 4 3H6Z"
        fill={color}
      ></path>
      <path
        d="M15 9V13C15 13.5523 14.5523 14 14 14H8C7.44772 14 7 13.5523 7 13V12H5V13C5 14.1046 5.89543 15 7 15H14C15.1046 15 16 14.1046 16 13V9H15Z"
        fill={color}
      ></path>
      <path
        d="M7.70711 9.70711C8.09763 9.31658 8.09763 8.68342 7.70711 8.29289L6.41421 7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H6.41421L7.70711 10.2929C8.09763 10.6834 8.09763 11.3166 7.70711 11.7071C7.31658 12.0976 6.68342 12.0976 6.29289 11.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289L6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L6.41421 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H6.41421L7.70711 9.70711Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const menu = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M6 2C6.55228 2 7 2.44772 7 3V9C7 10.6569 5.65685 12 4 12C2.34315 12 1 10.6569 1 9V3C1 2.44772 1.44772 2 2 2C2.55228 2 3 2.44772 3 3V9C3 9.55228 3.44772 10 4 10C4.55228 10 5 9.55228 5 9V3C5 2.44772 5.44772 2 6 2Z"
        fill={color}
      />
      <path
        d="M9 2C9.55228 2 10 2.44772 10 3V17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17V3C8 2.44772 8.44772 2 9 2Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2C14.5523 2 15 2.44772 15 3V8C15 9.10457 15.8954 10 17 10C18.1046 10 19 9.10457 19 8V3C19 2.44772 18.5523 2 18 2C17.4477 2 17 2.44772 17 3V8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8V3C15 2.44772 14.5523 2 14 2Z"
        fill={color}
      />
    </svg>,
  ];
  
  const category = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M6 2C6.55228 2 7 2.44772 7 3V5C7 5.55228 6.55228 6 6 6H4C3.44772 6 3 5.55228 3 5V3C3 2.44772 3.44772 2 4 2H6Z"
        fill={color}
      />
      <path
        d="M6 9C6.55228 9 7 9.44772 7 10V12C7 12.5523 6.55228 13 6 13H4C3.44772 13 3 12.5523 3 12V10C3 9.44772 3.44772 9 4 9H6Z"
        fill={color}
      />
      <path
        d="M13 2C13.5523 2 14 2.44772 14 3V5C14 5.55228 13.5523 6 13 6H11C10.4477 6 10 5.55228 10 5V3C10 2.44772 10.4477 2 11 2H13Z"
        fill={color}
      />
      <path
        d="M13 9C13.5523 9 14 9.44772 14 10V12C14 12.5523 13.5523 13 13 13H11C10.4477 13 10 12.5523 10 12V10C10 9.44772 10.4477 9 11 9H13Z"
        fill={color}
      />
    </svg>,
  ];

  const product = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M5 3C4.44772 3 4 3.44772 4 4V16C4 16.5523 4.44772 17 5 17H15C15.5523 17 16 16.5523 16 16V4C16 3.44772 15.5523 3 15 3H5Z"
        fill={color}
      />
      <path
        d="M7 6C7 5.44772 7.44772 5 8 5H12C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7H8C7.44772 7 7 6.55228 7 6Z"
        fill={color}
      />
      <path
        d="M7 10C7 9.44772 7.44772 9 8 9H12C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11H8C7.44772 11 7 10.5523 7 10Z"
        fill={color}
      />
    </svg>,
  ];
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Muse Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="102">
          <NavLink to="/menu">
            <span
              className="icon"
              style={{
                background: page === "menu" ? color : "",
              }}
            >
              {menu}
            </span>
            <span className="label">Menu</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/tables">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Tables</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/command">
            <span
              className="icon"
              style={{
                background: page === "command" ? color : "",
              }}
            >
              {command}
            </span>
            <span className="label">Command</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3sg">
          <NavLink to="/order">
            <span
              className="icon"
              style={{
                background: page === "order" ? color : "",
              }}
            >
              {order}
            </span>
            <span className="label">Order</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="4">
          <NavLink to="/billing">
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Billing</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="5">
          <NavLink to="/stock">
            <span
              className="icon"
              style={{
                background: page === "stock" ? color : "",
              }}
            >
              {stock}
            </span>
            <span className="label">Stock</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="875">
          <NavLink to="/transaction">
            <span
              className="icon"
              style={{
                background: page === "transaction" ? color : "",
              }}
            >
              {transaction}
            </span>
            <span className="label">Transaction</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/category">
            <span
              className="icon"
              style={{
                background: page === "category" ? color : "",
              }}
            >
              {category}
            </span>
            <span className="label">Category</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="845">
          <NavLink to="/product">
            <span
              className="icon"
              style={{
                background: page === "product" ? color : "",
              }}
            >
              {product}
            </span>
            <span className="label">Product</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="0325">
          Account Pages
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
       
      </Menu>
      
    </>
  );
}

export default Sidenav;
