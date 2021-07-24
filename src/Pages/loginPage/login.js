import React, { useEffect, useState } from "react"
import { Form, Input, Button, Checkbox,Card,Row, Col  } from 'antd';
import firebase from "../../confique/confiq"

export default function Login(){
const [userData,setuserData]=useState([]);

useEffect(()=>{
  firebase
      .database()
      .ref("userTable")
      .on(
        "value",
       // getData
        (snapshot) => {
          const datas=snapshot.val();
          let userlist=[];
          for(let id in datas) {
         userlist.push({id,...datas[id]});
                 };
          console.log(snapshot.toJSON());
          setuserData(userlist);
        //  setuserData(Object.values(snapshot.toJSON()));
          console.log("userData:",userData);
        },
        (e) => {
          if (e) {
            console.log(e);
          } else {
            console.log("success");
          }
        }
      );
//     function getData(data){
//       console.log("datas:",data.val())
//       let userlist=[];
//       data.forEach(element => {
//         userlist.push(element.val);
//       });
// //setuserData(userlist);
//      setuserData(data.val());
//       console.log("userdata",userData);
//     }

},[])

    const onFinish = (values) => {
        console.log('Success:', values);
        userData.map((item)=>{
          if(item.username==values.username && item.password==values.password){
         //   window.location="/Home";
         console.log(item.username,values.username,item.password,values.password)
         window.location="/Home";
          }
        })
      //  window.location="/Home"
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
<div>
<Row style={{marginTop:["15%"]}}>
      <Col span={12} offset={4}>
      <Card
    hoverable
    style={{ width: ["100%"] }}
    cover={
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
        wrapperCol={{
          offset: 4,
          span: 8,
        }}
      >
          <p>don't have account<a href="/Register"> go to Register</a>
              </p>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    }
  >
  </Card>

      </Col>
     
    </Row>


</div>
    )
}