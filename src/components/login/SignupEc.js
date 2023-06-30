import React from "react";
import { useState } from "react";
import { Modal } from "antd";
import {
  HomeFilled,
  ShoppingCartOutlined,
  InstagramOutlined,
  GoogleOutlined,
  FacebookOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, DatePicker } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function SignupEc() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinishSignUp = (values) => {
    console.log("Success:", values);
    setIsModalOpen(false);
  };
  const onFinishFailedSignUp = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  const emailValue = Form.useWatch("email", form);
  const passwordValue = Form.useWatch("password", form);
  const fullnameValue = Form.useWatch("fullname", form);
  const dateUserValue = Form.useWatch("dateUser", form);
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Button type="primary" onClick={showModal} className="btn-login">
        SIGN UP
      </Button>
      <Modal
        className="logo-login"
        title="Account Sign-Up"
        open={isModalOpen}
        onOk={() => {
          const account = [
            {
              email: `${emailValue}`,
              password: `${passwordValue}`,
              fullname: `${fullnameValue}`,
              date: `${dateUserValue}`,
            },
          ];
          const setAccountJson = JSON.stringify(account);
          localStorage.setItem("accountTaiNH", setAccountJson);
          setIsModalOpen(false);
          onReset();
          alert("Saved the account to localStorage!");
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          form={form}
          onFinish={onFinishSignUp}
          onFinishFailed={onFinishFailedSignUp}
        >
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email/phone...",
              },
            ]}
            label="Email/Phone"
            name="email"
          >
            <Input
              placeholder="Enter your email/number phone..."
              onChange={(value) => {
                console.log(value);
              }}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "text",
                message: "Please enter a full name...",
              },
            ]}
            label="Full Name"
            name="fullname"
          >
            <Input type="text" placeholder="Enter your full name..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "password",
                message: "Please enter a password...",
              },
            ]}
            label="Password"
            name="password"
          >
            <Input type="password" placeholder="Enter your password..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "password",
                message: "Please re-enter your password...",
              },
            ]}
            label="Confirm Password"
            name="confirmPassword"
          >
            <Input
              type="password"
              placeholder="Please re-enter your password..."
            />
          </Form.Item>
          <Form.Item name="dateUser" label="Date of birth">
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              Already have an account?
              <a style={{ marginLeft: "5px" }} href="">
                Login
              </a>
            </Form.Item>
          </Form.Item>
          <Form.Item className="login-icon">
            <a className="gg-icon" href="">
              <GoogleOutlined style={{ fontSize: "32px" }} />
            </a>
            <a className="fb-icon" href="">
              <FacebookOutlined style={{ fontSize: "32px" }} />
            </a>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SignupEc;
