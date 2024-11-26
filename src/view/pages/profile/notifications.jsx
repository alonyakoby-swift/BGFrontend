// NotificationsProfile.js
import React from "react";
import { Row, Col, Divider, Switch } from "antd";

export default function NotificationsProfile({ userDetails }) {
  const colTextClass = "hp-caption hp-text-color-black-80 hp-text-color-dark-30";
  const switchClass = "hp-mt-sm-8 hp-ml-sm-0 hp-ml-8";
  const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";

  return (
      <Row>
        <Col span={24}>
          <h2>Notification Settings for {userDetails?.first_name}</h2>
          <p className="hp-p1-body hp-mb-0">
            Here you can manage your notification preferences.
          </p>
        </Col>

        <Divider className={dividerClass} />

        <Col span={24}>
          <h3>Contact Notifications</h3>

          <div className="hp-profile-notifications hp-mt-24">
            <Row align="middle" justify="space-between">
              <Col sm={15} span={24} className={colTextClass}>
                System Notification
              </Col>

              <Switch className={switchClass} defaultChecked />
            </Row>

            <Row className="hp-mt-18" align="middle" justify="space-between">
              <Col sm={15} span={24} className={colTextClass}>
                Mail Notification
              </Col>

              <Switch className={switchClass} />
            </Row>
          </div>
        </Col>
      </Row>
  );
}
