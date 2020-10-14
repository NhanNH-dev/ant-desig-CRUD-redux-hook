import React, { useState } from "react";
import {
  Modal,
  Button,
  Table,
  Space,
  Badge,
  Divider,
  Typography,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { handle_Quantity } from "../../actions/cart";
import "./styles.less";
const { Title } = Typography;

function Cart({ cart }) {
  const dispatch = useDispatch();

  const quantity_cart = cart.reduce((amount, nextProduct) => {
    return (amount += nextProduct.quantity);
  }, 0);

  const handleQuantity = (index, flag) => {
    const inc_des_quantity = {
      index,
      flag,
    };
    const action = handle_Quantity(inc_des_quantity);
    return dispatch(action);
  };

  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: "IdBook",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Images",
      dataIndex: "url",
      render: (text, record) => {
        return (
          <img
            style={{ width: 50 }}
            src={require(`../../assets/` + record.url + `.jpg`)}
            alt={record.url}
          />
        );
      },
    },
    {
      title: "BookName",
      dataIndex: "book_name",
      key: "book_name",
      sorter: (a, b) => a.book_name.length - b.book_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleQuantity(record.stt, false)}>-</Button>
          {record.quantity}
          <Button onClick={() => handleQuantity(record.stt, true)}>+</Button>
        </Space>
      ),
    },
    {
      title: "Price",
      key: "newprice",
      dataIndex: "newprice",
      sorter: (a, b) => a.newprice - b.newprice,
    },
    {
      title: "Total Price",
      key: "totalPrice",
      render: (text, record) => record.newprice * record.quantity + ".00",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            danger
            onClick={() =>
              dispatch({ type: "DELETE_TO_CART", payload: record.stt })
            }
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  let data = cart.map((dt, index) => {
    return {
      stt: index,
      id: dt.id,
      url: dt.url,
      book_name: dt.book_name,
      newprice: dt.newprice,
      quantity: dt.quantity,
    };
  });

  function showModal() {
    setVisible(true);
  }
  function handleConfirm() {
    message.success("Payment Success!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  function handleOk(e) {
    if (cart.length === 0) {
      message.error("No products in the cart. Please select a product!", [2.5]);
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    } else {
      Modal.confirm({
        title: "Please confirm to proceed with payment.",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        cancelText: "No",
        onOk: () => handleConfirm(),
      });
    }
  }

  function handleCancel(e) {
    console.log(e);
    setVisible(false);
  }

  return (
    <div>
      <Button type="link" onClick={showModal}>
        <ShoppingCartOutlined style={{ fontSize: 20 }} />
        <Badge count={quantity_cart} offset={[-21, -23]}></Badge>
      </Button>

      <Modal
        title="Your Cart"
        className="cartModal"
        visible={visible}
        okText="Buy Now"
        cancelText="continue shopping"
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: false }}
      >
        <Table
          pagination={false}
          columns={columns}
          className="add_img_empty_cart"
          dataSource={data}
        />
        <Divider style={{ marginBottom: 5 }} />
        <Title level={4} className="set_title_total_price">
          Total:
          {cart.reduce((total, product, index) => {
            return (total += product.quantity * product.newprice);
          }, 0)}{" "}
          $
        </Title>
      </Modal>
    </div>
  );
}

export default Cart;
