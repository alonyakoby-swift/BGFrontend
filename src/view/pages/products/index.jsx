import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tag, Input, Button } from "antd"; // Add Input and Button components
import { Link } from "react-router-dom";
import ProductController from "../../../network/gateway/ProductController";
import PageContent from "../../../layout/components/content/page-content";

const { Search } = Input; // Destructure Ant Design's Search component

export default function ProductIndex() {
    const [productsData, setProductsData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const productController = new ProductController();

    const fetchProducts = async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await productController.getAllProducts(page, pageSize);
            setProductsData(response.items);
            setPagination({
                current: page,
                pageSize,
                total: response.metadata.total,
            });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
        setLoading(false);
    };

    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const response = await productController.searchProducts(query); // Call search function in ProductController
            setProductsData(response);
            setPagination({
                current: 1,
                pageSize: pagination.pageSize,
                total: response.length, // Update total to reflect search results
            });
        } catch (error) {
            console.error("Search failed:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination) => {
        fetchProducts(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "Article Code",
            dataIndex: "cod_article",
            key: "cod_article",
            render: (text, record) => (
                <Link to={`/products/detail/${record.id}`}>{text}</Link>
            ),
        },
        {
            title: "Description",
            dataIndex: "product_description_en",
            key: "product_description_en",
        },
        {
            title: "Status",
            dataIndex: "product_status",
            key: "product_status",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
            render: (category) => (
                <Tag color="blue" key={category}>
                    {category}
                </Tag>
            ),
        },
        {
            title: "Subcategory",
            key: "sub_category_en",
            dataIndex: "sub_category_en",
            render: (subCategory) => (
                <Tag color="green" key={subCategory}>
                    {subCategory}
                </Tag>
            ),
        },
    ];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <PageContent
                    title="Products Page"
                    breadcrumb={[
                        {
                            title: "Pages",
                        },
                        {
                            title: "Products Page",
                        },
                    ]}
                />
            </Col>
            <Col span={24}>
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <Col>
                        <Search
                            placeholder="Search by ID, Article Code, or Description"
                            enterButton="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearch={handleSearch} // Trigger search on pressing Enter or clicking Search button
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => fetchProducts(pagination.current, pagination.pageSize)}>
                            Reset
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={productsData}
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
        </Row>
    );
}
