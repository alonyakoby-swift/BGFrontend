import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Layout, Row, Col } from 'antd';

import Sidebar from './components/menu/Sidebar';
import MenuHeader from './components/header';
import MenuFooter from './components/footer';
import ScrollTop from './components/scroll-to-top';

const { Content } = Layout;

export default function VerticalLayout(props) {
  const { children } = props;

  const [visible, setVisible] = useState(false);

  // Redux
  const customise = useSelector((state) => state.customise);

  return (
    <Layout className="hp-app-layout">
      <Sidebar visible={visible} setVisible={setVisible} />

      <Layout className="hp-bg-black-10 hp-bg-color-dark-90">
        {/*<MenuHeader setVisible={setVisible} />*/}

        <Content className="hp-content-main" style={{marginTop: "60px"}}>

          <Row justify="center" gap={16}>
            {customise.contentWidth === 'full' && (
              <Col xxl={22} xl={22} span={24}>
                {children}
              </Col>
            )}

            {customise.contentWidth === 'boxed' && (
              <Col className="hp-w-100" style={{ maxWidth: 936 }}>
                {children}
              </Col>
            )}
          </Row>
        </Content>

        <MenuFooter />
      </Layout>

      <ScrollTop />
    </Layout>
  );
}
