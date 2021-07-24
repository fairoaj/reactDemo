import React,{ useEffect, useState } from "react"
import { Form, Input,Table, Tag, Space,Modal,Button,Upload  } from 'antd';
import uuid from "react-uuid";
import firebase from "../../confique/confiq"
import { UploadOutlined } from '@ant-design/icons';

export default function Home(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [productData,setproductData]=useState([]);
    const [productname,setproductname]=useState();
    const [customername,setcustomername]=useState();
    const [unitcost,setunitcost]=useState();
    const [sellingunit,setsellingunit]=useState();
    const [totalcost,settotalcost]=useState();
    const [productid,setproductid]=useState();
    const [fileurl, setfileurl] = useState();


useEffect(()=>{
  firebase
  .database()
  .ref("productTable")
  .on(
    "value",
   // getData
    (snapshot) => {
      const datas=snapshot.val();
      let productlist=[];
      for(let id in datas) {
        productlist.push({id,...datas[id]});
             };
      console.log(snapshot.toJSON());
      setproductData(productlist);
    //  setuserData(Object.values(snapshot.toJSON()));
      console.log("userData:",productData);
    },
    (e) => {
      if (e) {
        console.log(e);
      } else {
        console.log("success");
      }
    }
  );
},[])

const onFilechange = async (e) => {
  const file = e.target.files[0];
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  setfileurl(await fileRef.getDownloadURL());
};

const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'error',
  },
];

    const onFinish = (values) => {
      const id=uuid();
      values.id=id;
    //  values.uploadimage=fileurl;
            firebase
            .database()
            .ref("productTable/"+id)
            .set(values)
              console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const onFinishedit = (values) => {
       
        values.id=productid;
       
              firebase
              .database()
              .ref("productTable")
              .child(values.id)
              .update(values)
                console.log('Success:', values.productname);
        };
      
        const onFinishFailededit = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const showModalEdit = (item) => {
     
      setproductid(item.id);
        setproductname(item.Productname);
        setcustomername(item.Customername);
        setunitcost(item.Unitcost);
        setsellingunit(item.Sellingunit);
        settotalcost(item.Totalcost);
        setIsModalVisibleEdit(true);
        console.log(productname);
      };
    
      const handleOkEdit = () => {
        setIsModalVisibleEdit(false);
        window.location="/Home";
      };
    
      const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
        window.location="/Home";
      };
  
const doDelete=(deleteid)=>{
  firebase.database().ref("productTable").child(deleteid).remove();
}

    const columns = [
        {
          title: 'Product Name',
          dataIndex: 'Productname',
          key: 'Productname',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Customer Name',
          dataIndex: 'Customername',
          key: 'Customername',
        },
        {
          title: 'Selling Unit',
          dataIndex: 'Sellingunit',
          key: 'Sellingunit',
        },
        {
          title: 'Unit Cost',
          key: 'Unitcost',
          dataIndex: 'Unitcost',
          
        },
        {
            title: 'Total Cost',
            dataIndex: 'Totalcost',
            key: 'Totalcost',
          },

        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={()=>showModalEdit(record)}>Edit </a>
              <a onClick={()=>doDelete(record.id)}>Delete</a>
            </Space>
          ),
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return(
<div>            
<Button type="primary" onClick={showModal}>
        Add New Product
      </Button>

      <Modal title="Add Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        <Form.Item
        label="Product Name"
        name="Productname"
        rules={[
          {
            required: true,
            message: 'Please input Productname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Customer Name"
        name="Customername"
        rules={[
          {
            required: true,
            message: 'Please input Customername!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Selling Unit"
        name="Sellingunit"
        rules={[
          {
            required: true,
            message: 'Please input Sellingunit!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Unit Cost"
        name="Unitcost"
        rules={[
          {
            required: true,
            message: 'Please input Unitcost!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Total Cost"
        name="Totalcost"
        rules={[
          {
            required: true,
            message: 'Please input Totalcost!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 8,
        }}
      >

{/* <Form.Item 
      label="Upload Image"
      name="uploadimage"
      >
        
      <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
      className="upload-list-inline"
    >
      <Button onChange={onFilechange} icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    
      </Form.Item> */}

        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>
    </Form>
      </Modal>

     
      <Modal title="Edit Product" visible={isModalVisibleEdit} onOk={handleOkEdit} onCancel={handleCancelEdit}>
      <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        Productname: productname,
        Customername:customername,
        Sellingunit:sellingunit,
        Unitcost:unitcost,
        Totalcost:totalcost
      }}
      onFinish={onFinishedit}
      onFinishFailed={onFinishFailededit}
    >
        <Form.Item
        label="Product Name"
        name="Productname"
        rules={[
          {
            required: true,
            message: 'Please input Productname!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Customer Name"
        name="Customername"
        rules={[
          {
            required: true,
            message: 'Please input Customername!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Selling Unit"
        name="Sellingunit"
        rules={[
          {
            required: true,
            message: 'Please input Sellingunit!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Unit Cost"
        name="Unitcost"
        rules={[
          {
            required: true,
            message: 'Please input Unitcost!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Total Cost"
        name="Totalcost"
        rules={[
          {
            required: true,
            message: 'Please input Totalcost!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Edit Product
        </Button>
      </Form.Item>
    </Form>
      </Modal>


<Table dataSource={productData} columns={columns} />
<Button type="primary">
       <a href="/Login">   LogOut </a>
        </Button>
</div>
    )
}