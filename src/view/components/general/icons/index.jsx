import React, { useState } from 'react';

import { Card, Row, Col, Radio, message, Input } from 'antd';

import PageContent from '../../../../layout/components/content/page-content';
import PhosphorIcon from '../../../../assets/phosphor';

export default function Icons() {
  const { Search } = Input;

  const [checked, setChecked] = useState('light');
  const [search, setSearch] = useState('');
  const icon = PhosphorIcon.Data.map(({ name }) => name);

  function onChange(e) {
    setChecked(e.target.value);
  }

  const icons = icon
    .filter((icon) => icon.includes(search))
    .map((icon, index) => (
      <React.Fragment key={index}>
        <Col xl={4} md={8} span={12}>
          <Card
            onClick={() => {
              navigator.clipboard.writeText(
                `<i className="ph-${checked} ph-${icon}" />`
              );
              message.success(
                `<i className="ph-${checked} ph-${icon}" /> Copied successfully`
              );
            }}
            className="hp-text-center hp-icon-card"
          >
            <i class={`ph-${checked} ph-${icon} h2`} />

            <p className="hp-badge-text">{icon}</p>
          </Card>
        </Col>
      </React.Fragment>
    ));

  return (
    <Row className="hp-mb-32">
      <Col className="hp-mb-32" span={24}>
        <PageContent
          title="Icons"
          desc="We used Phosphor Icon for Yoda Admin Template"
          breadcrumb={[
            {
              title: 'Components',
              link: '/components/components-page',
            },
            {
              title: 'General',
            },
            {
              title: 'Icons',
            },
          ]}
        />
      </Col>

      <Col lg={24} md={24} sm={24} xs={24}>
        <Row>
          <Col flex={0}>
            <Radio.Group
              size="large"
              onChange={onChange}
              defaultValue="light"
              className="hp-pb-32 hp-mr-16"
            >
              <Radio.Button value="thin">Thin</Radio.Button>
              <Radio.Button value="light">Light</Radio.Button>
              <Radio.Button value="bold">Bold</Radio.Button>
              <Radio.Button value="duotone">Duotone</Radio.Button>
              <Radio.Button value="fill">Fill</Radio.Button>
            </Radio.Group>
          </Col>

          <Col flex={5}>
            <Search
              className="hp-pb-32"
              placeholder="input search text"
              size="large"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row gutter={[32, 32]}>{icons}</Row>
      </Col>
    </Row>
  );
}
