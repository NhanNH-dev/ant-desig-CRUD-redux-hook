import React, { useState } from "react";
import { Menu, Button } from "antd";
import Cart from "../Cart";
import { useSelector } from "react-redux";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./styles.less";
const { SubMenu } = Menu;

const MenuHeader = ({showDrawer}) => {
  const [current, setCurrent] = useState("mail");
  const cartList = useSelector((state) => state.cart.list_product);

  function handleClick(e) {
    setCurrent(e.key);
  }

  return (
    <Menu
      theme="dark"
      onClick={handleClick}
      className="set_padding_header_menu"
      selectedKeys={current}
      mode="horizontal"
    >
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Home
      </Menu.Item>

      <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1" disabled>
            Option 1
          </Menu.Item>
          <Menu.Item key="setting:2" disabled>
            Option 2
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3" disabled>
            Option 3
          </Menu.Item>
          <Menu.Item key="setting:4" disabled>
            Option 4
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>

      <Menu.Item key="alipay">
        <Button type="link" onClick={showDrawer}>
          <ReadOutlined /> Guides
        </Button>
      </Menu.Item>

      <Menu.Item key="shoppingCard">
        <Cart cart={cartList} />
      </Menu.Item>
    </Menu>
  );
};

export default MenuHeader;
