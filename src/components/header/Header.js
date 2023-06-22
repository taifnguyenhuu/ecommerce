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
  Pagination,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../api/Api";
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
        <Typography.Title>E-Commerce</Typography.Title>
        <AppCart />
      </div>
    </>
  );
}
function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

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
            defaultValue={value}
            onChange={(value) => {
              setCartItems((pre) =>
                pre.map((cart) => {
                  if (record.id === cart.id) {
                    cart.total = cart.price * value;
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
      dataIndex: "total",
      render: (value) => {
        return <span>${value}</span>;
      },
    },
    {
      title: "DiscountPercentage",
      dataIndex: "discountPercentage",
      render: (value) => {
        return <span>{value}%</span>;
      },
    },
  ];
  const summaryTotal = (data) => {
    const total = data.reduce((pre, cur) => pre + cur.total, 0);
    return <span>${total}</span>;
  };

  const onFinish = (values) => {
    alert("Successfull!");
    //console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    alert("Please enter information before submitting...");
    //console.log("Failed:", errorInfo);
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
            console.log(checkoutDrawerOpen);
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
