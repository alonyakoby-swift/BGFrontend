import React from "react";
import { Row, Col, Divider, Form, Input, Button, message } from "antd";
import UserController from "../../../network/gateway/UserController";

export default function PasswordProfile({ userDetails }) {
    const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";
    const userController = new UserController();

    const onFinish = async (values) => {
        if (values["new-password"] !== values["confirm-new-password"]) {
            message.error("Passwords do not match!");
            return;
        }

        try {
            const userId = userDetails.id; // Replace with the actual user ID
            await userController.overridePassword(userId, values["new-password"]);
            message.success("Password successfully updated!");
        } catch (error) {
            message.error("Failed to update password. Please try again.");
        }
    };

    return (
        <Row>
            <Col span={24}>
                <h2>Change Password</h2>
                <p className="hp-p1-body hp-mb-0">
                    Set a unique password to protect your account.
                </p>

                <Divider className={dividerClass} />
            </Col>

            <Col xxl={5} xl={10} md={15} span={24}>
                <Form layout="vertical" name="basic" onFinish={onFinish}>
                    <Form.Item
                        label={
                            <span className="hp-input-label hp-text-color-black-100 hp-text-color-dark-0">
                New Password :
              </span>
                        }
                        name="new-password"
                        rules={[{ required: true, message: "Please input your new password!" }]}
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="hp-input-label hp-text-color-black-100 hp-text-color-dark-0">
                Confirm New Password :
              </span>
                        }
                        name="confirm-new-password"
                        rules={[{ required: true, message: "Please confirm your new password!" }]}
                    >
                        <Input.Password placeholder="Confirm new password" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
