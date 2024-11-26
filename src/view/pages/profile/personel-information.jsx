// InfoProfile.js
import React from "react";
import { Row, Col, Divider } from "antd";

export default function InfoProfile({ userDetails }) {
  const listTitle = "hp-p1-body";
  const listResult = "hp-mt-sm-4 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0";
  const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";

  return (
      <div>
        <Col md={15} span={24}>
          <h2>Personal Information</h2>
          <p className="hp-p1-body hp-mb-0">
            You can edit your personal information here.
          </p>
        </Col>

        <Divider className={dividerClass} />

        <Row align="middle" justify="space-between">
          <Col md={12} span={24}>
            <h3>Contact</h3>
          </Col>

          <Col span={24} className="hp-profile-content-list hp-mt-8 hp-pb-sm-0 hp-pb-120">
            <ul>
              <li>
                <span className={listTitle}>Full Name</span>
                <span className={listResult}>
                {userDetails?.first_name} {userDetails?.last_name}
              </span>
              </li>
              <li className="hp-mt-18">
                <span className={listTitle}>Email</span>
                <span className={listResult}>{userDetails?.email}</span>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
  );
}
