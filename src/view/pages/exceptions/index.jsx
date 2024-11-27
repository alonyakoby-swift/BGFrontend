import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Input, Avatar, Modal } from "antd";
import ExceptionController from "../../../network/gateway/ExceptionController";
import PageContent from "../../../layout/components/content/page-content";
import ExceptionCreateDrawer from "../exceptions/createExceptionModel";

const { Search } = Input;

export default function ExceptionIndex() {
    const [exceptionsData, setExceptionsData] = useState([]);
    const [filteredExceptions, setFilteredExceptions] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false);

    const exceptionController = new ExceptionController();

    const fetchExceptions = async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await exceptionController.getAllExceptions(page, pageSize);
            setExceptionsData(response.items);
            setFilteredExceptions(response.items);
            setPagination({
                current: page,
                pageSize,
                total: response.metadata.total,
            });
        } catch (error) {
            console.error("Failed to fetch exceptions:", error);
        }
        setLoading(false);
    };

    const handleSearch = () => {
        const filtered = exceptionsData.filter((exception) =>
            exception.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exception.replace.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredExceptions(filtered);
        setPagination({
            ...pagination,
            current: 1,
            total: filtered.length,
        });
    };

    useEffect(() => {
        fetchExceptions(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const confirmDelete = (exceptionId) => {
        Modal.confirm({
            title: "Are you sure you want to delete this exception?",
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => handleDelete(exceptionId),
        });
    };

    const handleDelete = async (exceptionId) => {
        setLoading(true);
        try {
            await exceptionController.deleteException(exceptionId);
            fetchExceptions(pagination.current, pagination.pageSize);
        } catch (error) {
            console.error("Failed to delete exception:", error);
        }
        setLoading(false);
    };

    const handleUpdate = async (exceptionId, updatedData) => {
        setLoading(true);
        try {
            await exceptionController.updateException(exceptionId, updatedData);
            fetchExceptions(pagination.current, pagination.pageSize);
        } catch (error) {
            console.error("Failed to update exception:", error);
        }
        setLoading(false);
    };

    const columns = [
        {
            title: "Original",
            dataIndex: "original",
            key: "original",
            render: (text, record) => (
                <Input
                    defaultValue={text}
                    onBlur={(e) => handleUpdate(record.id, { original: e.target.value })}
                />
            ),
        },
        {
            title: "Replace",
            dataIndex: "replace",
            key: "replace",
            render: (text, record) => (
                <Input
                    defaultValue={text}
                    onBlur={(e) => handleUpdate(record.id, { replace: e.target.value })}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button type="danger" onClick={() => confirmDelete(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <PageContent
                    title="Exceptions Page"
                />
            </Col>
            <Col span={24}>
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <Col span={16}>
                        <Search
                            placeholder="Search by Exception Original or Replace"
                            enterButton="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearch={handleSearch}
                        />
                    </Col>
                    <Col>
                        <Button
                            onClick={() => {
                                setSearchQuery("");
                                setFilteredExceptions(exceptionsData);
                                setPagination({
                                    ...pagination,
                                    current: 1,
                                    total: exceptionsData.length,
                                });
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="primary"
                            style={{ marginLeft: 8 }}
                            onClick={() => setDrawerVisible(true)}
                        >
                            Create New Exception
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filteredExceptions}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50", "100"],
                    }}
                    onChange={handleTableChange}
                />
            </Col>
            <ExceptionCreateDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                onExceptionCreated={() => fetchExceptions(pagination.current, pagination.pageSize)}
            />
        </Row>
    );
}
