import React, { useState } from "react";
import {
    Row,
    Col,
    Drawer,
    Form,
    Button,
    Input,
} from "antd";
import { RiCloseFill } from "react-icons/ri";
import ExceptionController from "../../../network/gateway/ExceptionController";

const ExceptionCreateDrawer = ({ visible, onClose, onExceptionCreated }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const exceptionController = new ExceptionController();

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            await exceptionController.createException({
                original: values.original,
                replace: values.replace,
            });

            // Call the onExceptionCreated callback after a successful creation
            if (onExceptionCreated) {
                onExceptionCreated();
            }

            onClose(); // Close the drawer after creating the exception
        } catch (error) {
            console.error("Failed to create exception:", error);
        }
        setLoading(false);
    };

    return (
        <Drawer
            title={<h5>Create a New Exception</h5>}
            width={400}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            closeIcon={<RiCloseFill size={24} />}
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button onClick={onClose} type="text" style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button form="createExceptionForm" htmlType="submit" type="primary" loading={loading}>
                        Submit
                    </Button>
                </div>
            }
        >
            <Form id="createExceptionForm" form={form} layout="vertical" onFinish={handleFinish} hideRequiredMark>
                <Form.Item
                    name="original"
                    label="Original Text"
                    rules={[{ required: true, message: "Please enter the original text" }]}
                >
                    <Input placeholder="Please enter the original text" />
                </Form.Item>

                <Form.Item
                    name="replace"
                    label="Replacement Text"
                    rules={[{ required: true, message: "Please enter the replacement text" }]}
                >
                    <Input placeholder="Please enter the replacement text" />
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default ExceptionCreateDrawer;

// Copyright © 2023.
// Alon Yakobichvili
// All rights reserved.