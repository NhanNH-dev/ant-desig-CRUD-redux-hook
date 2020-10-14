import React, { useState } from "react";
import books from "./mockData/books.json";
import img from "./mockData/img.json";
import { Layout, Drawer, Typography } from "antd";
import "./styles.less";
import ContentProducts from "./components/ContentProducts";
import MenuHeader from "./components/MenuHeader";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

function App() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <Layout>
      <Header className="set_padding_header">
        <MenuHeader showDrawer={showDrawer} />
      </Header>
      <Layout style={{ minHeight: "60vh" }}>
        <Content>
          <ContentProducts arrBooks={books} />
        </Content>
      </Layout>

      <Drawer
        title="プロジェクトの主な機能"
        width={600}
        closable={true}
        onClose={onClose}
        visible={visible}
        className="set_drawer"
      >
        {img.map((image, index) => {
          return (
            <div key={index} style={{ textAlign: "center" }}>
              <Text style={{ textAlign: "left", fontSize: 20 }}>
                {image.text}
              </Text>
              <br />
              <img
                style={{
                  width: image.w,
                  height: image.h,
                }}
                src={require(`./assets/` + image.url + `.jpg`)}
                alt={image.url}
              />
            </div>
          );
        })}
        <Text style={{ textAlign: "left", fontSize: 20 }}>
          以上です。見てくれてありがとう　ございます。
        </Text>
      </Drawer>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2020 Created by Nguyen Huu Nhan
      </Footer>
    </Layout>
  );
}

export default App;
