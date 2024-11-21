import React from 'react';

import { Card, Col, Row } from 'antd';

export default function Home() {
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Card className="hp-border-radius-lx">
              <h4 className="h4  hp-d-block hp-text-color-black-bg hp-text-color-dark-0 hp-font-weight-400 hp-mr-4">
                Let's get started 🚀
              </h4>

              <p className="hp-p1-body">
                Are you ready? Please read our{' '}
                <a
                  className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-hover-text-color-primary-3 hp-hover-text-color-dark-0 hp-transition"
                  href="https://hypeople-studio.gitbook.io/yoda-admin-template/"
                  target="_blank"
                >
                  Documentation
                </a>{' '}
                to understand the technical details of the project to use the
                template.
              </p>
            </Card>
          </Col>

          <Col span={24}>
            <Card className="hp-border-radius-lx">
              <h4 className="h4  hp-d-block hp-text-color-black-bg hp-text-color-dark-0 hp-font-weight-400 hp-mr-4">
                Would you like to browse the components? 👀
              </h4>

              <p className="hp-p1-body">
                Everything is in the details. So why wouldn't you want to take a
                look at the{' '}
                <a
                  className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-hover-text-color-primary-3 hp-hover-text-color-dark-0 hp-transition"
                  href="/exceptions"
                  target="_blank"
                >
                  components
                </a>{' '}
                from the preview page? Enjoy!
              </p>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
