import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Layout, Row, Col } from 'antd';
import { motion } from 'framer-motion';

import MenuLogo from './logo';
import MenuFooter from './footer';
import MenuItem from './item';
import MenuMobile from './mobile';

const { Sider } = Layout;

export default function Sidebar(props) {
  const { visible, setVisible } = props;

  // Redux
  const customise = useSelector((state) => state.customise);

  // Collapsed
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (customise.sidebarCollapsed) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [customise]);

  // Location
  const location = useLocation();

  // Mobile Sidebar
  const onClose = () => {
    setVisible(false);
  };

  // Menu
  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={316}
      className="hp-sidebar hp-bg-black-0 hp-bg-color-dark-90 hp-border-color-black-30 hp-border-color-dark-80"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
        className="hp-d-flex hp-h-100"
        style={{ flexDirection: 'column' }}
      >
        <Row align="bottom" justify="space-between">
          <Col>{collapsed === false ? <MenuLogo onClose={onClose} /> : ''}</Col>

          {customise.sidebarCollapseButton &&
            (collapsed === false ? (
              <Col className="hp-pr-0">
                <div className="hp-cursor-pointer" onClick={toggle}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.2498 1.66663C16.8024 1.66663 17.3323 1.88612 17.723 2.27682C18.1137 2.66752 18.3332 3.19742 18.3332 3.74996V16.25C18.3332 16.8025 18.1137 17.3324 17.723 17.7231C17.3323 18.1138 16.8024 18.3333 16.2498 18.3333H3.74984C3.1973 18.3333 2.6674 18.1138 2.2767 17.7231C1.886 17.3324 1.6665 16.8025 1.6665 16.25V3.74996C1.6665 3.19742 1.886 2.66752 2.2767 2.27682C2.6674 1.88612 3.1973 1.66663 3.74984 1.66663H16.2498ZM8.33317 3.33329H4.99984C4.55781 3.33329 4.13389 3.50889 3.82133 3.82145C3.50877 4.13401 3.33317 4.55793 3.33317 4.99996V15C3.33317 15.442 3.50877 15.8659 3.82133 16.1785C4.13389 16.491 4.55781 16.6666 4.99984 16.6666H8.33317C8.7752 16.6666 9.19912 16.491 9.51168 16.1785C9.82424 15.8659 9.99984 15.442 9.99984 15V4.99996C9.99984 4.55793 9.82424 4.13401 9.51168 3.82145C9.19912 3.50889 8.7752 3.33329 8.33317 3.33329Z"
                      fill="#636E72"
                    />
                  </svg>
                </div>
              </Col>
            ) : (
              <Col span={24} className="hp-d-flex-full-center">
                <div className="hp-cursor-pointer" onClick={toggle}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.2498 1.66663C16.8024 1.66663 17.3323 1.88612 17.723 2.27682C18.1137 2.66752 18.3332 3.19742 18.3332 3.74996V16.25C18.3332 16.8025 18.1137 17.3324 17.723 17.7231C17.3323 18.1138 16.8024 18.3333 16.2498 18.3333H3.74984C3.1973 18.3333 2.6674 18.1138 2.2767 17.7231C1.886 17.3324 1.6665 16.8025 1.6665 16.25V3.74996C1.6665 3.19742 1.886 2.66752 2.2767 2.27682C2.6674 1.88612 3.1973 1.66663 3.74984 1.66663H16.2498ZM14.9998 3.33329H11.6665C11.2245 3.33329 10.8006 3.50889 10.488 3.82145C10.1754 4.13401 9.99984 4.55793 9.99984 4.99996V15C9.99984 15.442 10.1754 15.8659 10.488 16.1785C10.8006 16.491 11.2245 16.6666 11.6665 16.6666H14.9998C15.4419 16.6666 15.8658 16.491 16.1783 16.1785C16.4909 15.8659 16.6665 15.442 16.6665 15V4.99996C16.6665 4.55793 16.4909 4.13401 16.1783 3.82145C15.8658 3.50889 15.4419 3.33329 14.9998 3.33329ZM7.60067 8.08913C7.45251 7.94062 7.25379 7.85345 7.04419 7.84502C6.83458 7.8366 6.62951 7.90753 6.46991 8.04367C6.31031 8.17981 6.20792 8.37114 6.18319 8.57945C6.15847 8.78776 6.21321 8.99774 6.3365 9.16746L4.1665 9.16663C3.94549 9.16663 3.73353 9.25442 3.57725 9.4107C3.42097 9.56698 3.33317 9.77894 3.33317 9.99996C3.33317 10.221 3.42097 10.4329 3.57725 10.5892C3.73353 10.7455 3.94549 10.8333 4.1665 10.8333L6.52317 10.8325L6.42234 10.9341C6.27054 11.0913 6.18654 11.3018 6.18844 11.5203C6.19034 11.7388 6.27798 11.9478 6.43249 12.1023C6.587 12.2568 6.79601 12.3445 7.0145 12.3464C7.233 12.3483 7.4435 12.2643 7.60067 12.1125L8.779 10.9341C9.00484 10.7083 9.074 10.385 8.98734 10.0991C9.03122 9.95463 9.03502 9.80093 8.99833 9.65445C8.96164 9.50796 8.88583 9.3742 8.779 9.26746L7.60067 8.08913Z"
                      fill="#636E72"
                    />
                  </svg>
                </div>
              </Col>
            ))}

          {collapsed && (
            <Col span={24} className="hp-mt-12 hp-d-flex-full-center">
              <MenuLogo onClose={onClose} small={true} />
            </Col>
          )}
        </Row>

        <MenuItem onClose={onClose} />

        <MenuFooter onClose={onClose} collapsed={collapsed} />

        <MenuMobile onClose={onClose} visible={visible} />
      </motion.div>
    </Sider>
  );
}
