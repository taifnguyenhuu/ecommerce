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
        type: "mens-shirt",
        label: "Shirt",
        children: [
          {
            label: "Shirt",
            key: "shirt",
          },
          {
            label: "T-Shirt",
            key: "t-shirt",
          },
        ],
      },
      {
        type: "mens-shoe",
        label: "Shoe",
        children: [
          {
            label: "Western shoes",
            key: "western-shoes",
          },
          {
            label: "Chelsea Boots",
            key: "chelsea-boots",
          },
        ],
      },
      {
        type: "mens-watch",
        label: "Watch",
        children: [
          {
            label: "Rolex",
            key: "rolex",
          },
          {
            label: "Citizen",
            key: "citizen",
          },

          {
            label: "Casio",
            key: "casio",
          },
        ],
      },
    ],
  },
  {
    label: "Women",
    key: "women",
    children: [
      {
        type: "womens-shirt",
        label: "Shirt",
        children: [
          {
            label: "Shirt",
            key: "shirt",
          },
          {
            label: "T-Shirt",
            key: "t-shirt",
          },
        ],
      },
      {
        type: "womens-shoe",
        label: "Shoe",
        children: [
          {
            label: "Western shoes",
            key: "western-shoes",
          },
          {
            label: "Chelsea Boots",
            key: "chelsea-boots",
          },
        ],
      },
      {
        type: "womens-watch",
        label: "Watch",
        children: [
          {
            label: "Rolex",
            key: "rolex",
          },
          {
            label: "Citizen",
            key: "citizen",
          },

          {
            label: "Casio",
            key: "casio",
          },
        ],
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
    console.log(navigate);
  };
  return (
    <div className="appHeader">
      {" "}
      <Menu onClick={onMenuClick} mode="horizontal" items={items} />
    </div>
  );
}

export default Header;
