import React from "react";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
  CaretDownOutlined,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const items = [
  {
    label: "Home",
    key: "",
    icon: <HomeFilled />,
  },
  {
    label: "Men",
    key: "men",
    children: [
      {
        label: "Shirts",
        key: "mens-shirts",
      },
      {
        label: "Shoes",
        key: "mens-shoes",
      },
      {
        label: "Watchs",
        key: "mens-watches",
      },
    ],
  },
  {
    label: "Women",
    key: "women",
    children: [
      {
        label: "Dresses",
        key: "womens-dresses",
      },
      {
        key: "womens-shoes",
        label: "Shoes",
      },
      {
        key: "womens-watches",
        label: "Watchs",
      },
      {
        key: "womens-bags",
        label: "Bags",
      },
      {
        key: "womens-jewellery",
        label: "Jewellerys",
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Fragrances
      </a>
    ),
    key: "alipay",
  },
];
function Header() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <>
      <div className="appHeader">
        {" "}
        <Menu onClick={onMenuClick} mode="horizontal" items={items} />
        <Typography.Title>TaiNH</Typography.Title>
        <AppCart />
      </div>
    </>
  );
}
function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={5}
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
      ></Drawer>
    </div>
  );
}
export default Header;
