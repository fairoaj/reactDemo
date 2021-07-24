import React from "react"
import { Form, Input, Button, Checkbox } from 'antd';
import firebase from "../../confique/confiq"
import uuid from "react-uuid";

export default function Register(){

    const onFinish = (values) => {
const id=uuid();
values.id=id;
      firebase
      .database()
      .ref("userTable/"+id)
      .set(values)
        console.log('Success:', values.password);
        values.Firstname="";
        values.Lastname="";
        values.username="";
        values.password="";
        values.Confirmpassword="";
        window.location="/Register";
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

       

    return(
<div>
<Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Form.Item
        label="Firstname"
        name="Firstname"
        rules={[
          {
            required: true,
            message: 'Please input your Firstname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lastname"
        name="Lastname"
        rules={[
          {
            required: true,
            message: 'Please input your Lastname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="Confirmpassword"
        rules={[
          {
            required: true,
            message: 'Please input your Confirm password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <p>if you Register<a href="/Login"> go to Login</a>
              </p>
      </Form.Item>
    </Form>
</div>
    )
}