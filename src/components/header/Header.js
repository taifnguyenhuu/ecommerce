import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addcart } from "../../actions/counter";
import {
  HomeFilled,
  ShoppingCartOutlined,
  InstagramOutlined,
  GoogleOutlined,
  FacebookOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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
  Pagination,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../api/Api";
import LoginEc from "../login/LoginEc";
import SignupEc from "../login/SignupEc";
import LogoutEc from "../login/LogoutEc";
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
  const counter = useSelector((state) => state.counter);

  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };

  const [login, setLogin] = useState();
  const callbackFunction = (childData) => {
    setLogin(childData);
  };
  return (
    <>
      <div className="appHeader">
        {" "}
        <Menu onClick={onMenuClick} mode="horizontal" items={items} />
        <Typography.Title>E-Commerce</Typography.Title>
        <div className="block-login">
          <AppCart />
          {login ? (
            <LogoutEc parentCallback={callbackFunction} />
          ) : (
            <>
              <LoginEc parentCallback={callbackFunction} /> <SignupEc />
            </>
          )}
        </div>
      </div>
    </>
  );
}
function AppCart() {
  const counter = useSelector((state) => state.counter);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);

  useEffect(() => {
    setCartItems(
      localStorage.getItem("itemslocal")
        ? JSON.parse(localStorage.getItem("itemslocal"))
        : []
    );
  }, [counter]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => {
        return <span>${value}</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value, record) => {
        return (
          <InputNumber
            min={0}
            defaultValue={1}
            onChange={(value) => {
              setCartItems((pre) =>
                pre.map((cart) => {
                  if (record.id === cart.id) {
                    cart.stock = cart.price * value;
                  }
                  return cart;
                })
              );
            }}
          ></InputNumber>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "stock",
      render: (value) => {
        return <span>${value}</span>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      render: (value) => {
        return <span>{value}% </span>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record, index) => {
        return (
          <DeleteOutlined
            className="deleteIcon"
            onClick={() => {
              handleDelete(index);
            }}
          />
        );
      },
    },
  ];
  const summaryTotal = (data) => {
    const total = data.reduce((pre, cur) => pre + cur.stock, 0);

    return <span>${total}</span>;
  };

  const onFinish = (values) => {
    alert("Successfull!");
  };
  const onFinishFailed = (errorInfo) => {
    alert("Please enter information before submitting...");
  };

  const handleDelete = (index) => {
    cartItems.splice(index, 1);
    localStorage.setItem("itemslocal", JSON.stringify(cartItems));
    setCartItems(JSON.parse(localStorage.getItem("itemslocal")));
  };
  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cartItems.length}
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        contentWrapperStyle={{ width: 580 }}
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={cartItems}
          summary={summaryTotal}
        />
        <Button
          className="btn-chekcout"
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
        >
          Checkout Your Cart
        </Button>
        <Drawer
          open={checkoutDrawerOpen}
          onClose={() => {
            setCheckoutDrawerOpen(false);
          }}
          title="Confirm Order"
        >
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your full name",
                },
              ]}
              label="Full Name"
              name="full_name"
            >
              <Input placeholder="Enter your full name.." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              label="Email"
              name="your_name"
            >
              <Input placeholder="Enter your email.." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your address",
                },
              ]}
              label="Address"
              name="your_address"
            >
              <Input placeholder="Enter your full address.." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your number phone",
                },
              ]}
              label="Number Phone"
              name="number_phone"
            >
              <Input placeholder="Enter your full number phone.." />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: false,
                  message: "Please enter description if request",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Typography.Paragraph type="secondary">
              More methods coming soon
            </Typography.Paragraph>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Drawer>
    </div>
  );
}

export default Header;
