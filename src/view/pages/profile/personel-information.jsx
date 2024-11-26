// InfoProfile.js
import React, { useState } from "react";
import { Row, Col, Divider, Button } from "antd";
import { useAuth } from "../../../network/authContext";

export default function InfoProfile({ userDetails }) {
  const [showPassword, setShowPassword] = useState(false);

  const listTitle = "hp-p1-body";
  const listResult = "hp-mt-sm-4 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0";
  const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";
  const { user } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <div>
        <Col md={15} span={24}>
          <h2>Personal Information</h2>
          <p className="hp-p1-body hp-mb-0">
            You can edit the user information here.
          </p>
        </Col>

        <Divider className={dividerClass} />

        <Row align="middle" justify="space-between">
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
              <li className="hp-mt-18">
                <span className={listTitle}>Position</span>
                <span className={listResult}>{userDetails?.position}</span>
              </li>
              <li className="hp-mt-18">
                <span className={listTitle}>User Type</span>
                <span className={listResult}>{userDetails?.type}</span>
              </li>
              {(user?.type?.toLowerCase() === "admin" || user?.type?.toLowerCase() === "manager") && (
                  <li className="hp-mt-18">
                    <span className={listTitle}>Password</span>
                    <span className={listResult}>
                  {showPassword ? userDetails?.password : "*****"}
                </span>
                    <Button type="link" onClick={togglePasswordVisibility}>
                      {showPassword ? "Hide Password" : "Show Password"}
                    </Button>
                  </li>
              )}
            </ul>
          </Col>
        </Row>
      </div>
  );
}
