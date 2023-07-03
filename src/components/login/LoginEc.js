import React, { createContext } from "react";
import { useState, useContext } from "react";
import { Modal } from "antd";
import {
  HomeFilled,
  ShoppingCartOutlined,
  InstagramOutlined,
  GoogleOutlined,
  FacebookOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function LoginEc(props) {
  const getAcountUser = JSON.parse(localStorage.getItem("accountTaiNH"));
  const accountUser = getAcountUser[0].email;
  const password = getAcountUser[0].password;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinishLogin = (values) => {
    console.log("Success:", values);
    setIsModalOpen(false);
  };
  const onFinishFailedLogin = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  const emailValue = Form.useWatch("email", form);
  const passwordValue = Form.useWatch("password", form);
  const onReset = () => {
    form.resetFields();
  };
  const sendData = (send) => {
    props.parentCallback(send);
  };
  return (
    <>
      <Button type="default" onClick={showModal} className="btn-login">
        LOGIN
      </Button>
      <Modal
        className="logo-login"
        title="Account Login?"
        open={isModalOpen}
        onOk={() => {
          if (accountUser === emailValue && password === passwordValue) {
            setIsModalOpen(false);
            sendData(true);
          } else if (accountUser !== emailValue || password !== passwordValue) {
            alert("Wrong username or password!");
            setIsModalOpen(true);
            sendData(false);
            if (accountUser === "" || password === "") {
              alert("Please enter your account and password!");
              sendData(false);
            }
          }
          onReset();
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          form={form}
          onFinish={onFinishLogin}
          onFinishFailed={onFinishFailedLogin}
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
                type: "password",
                message: "Please enter a password...",
              },
            ]}
            label="Password"
            name="password"
          >
            <Input type="password" placeholder="Enter your password..." />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
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

export default LoginEc;
