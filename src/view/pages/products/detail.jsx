import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductController from "../../../network/gateway/ProductController";
import TranslationController from "../../../network/gateway/TranslationController";
import { Row, Col, Card, Spin, Table, Descriptions, Button, Space, Tooltip, message } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import { TranslationOutlined, CheckOutlined, ExportOutlined, RobotOutlined, CopyOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

export default function ProductDetail() {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [exportLoading, setExportLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);

    const productController = new ProductController();
    const translationController = new TranslationController();

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await productController.getProductById(id);
            setProductData(response);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Row justify="center" style={{ marginTop: "20px" }}>
                <Spin size="large" />
            </Row>
        );
    }

    if (!productData) {
        return (
            <Row justify="center" style={{ marginTop: "20px" }}>
                <h3>Product not found.</h3>
            </Row>
        );
    }

    const { product, translations } = productData;

    const translationColumns = [
        {
            title: "Language",
            dataIndex: "language",
            key: "language",
        },
        {
            title: "Translation",
            dataIndex: "translation",
            key: "translation",
            render: (text, record) => (
                <div>
                    <div>{text || "N/A"}</div>
                    {record.verification && (
                        <div style={{ fontSize: "12px", color: "gray" }}>
                            {record.verification}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Tooltip title="Translate">
                        <Button
                            icon={<TranslationOutlined />}
                            onClick={() => handleTranslate(record)}
                            disabled={tableLoading}
                        />
                    </Tooltip>
                    <Tooltip title="AI Verify">
                        <Button
                            icon={<RobotOutlined />}
                            onClick={() => handleAIVerify(record)}
                            disabled={!record.translation || tableLoading}
                        />
                    </Tooltip>
                    <Tooltip title="Copy to Clipboard">
                        <Button
                            icon={<CopyOutlined />}
                            onClick={() => handleCopyToClipboard(record.translation)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleTranslate = async (record) => {
        setTableLoading(true);
        try {
            await productController.translateProductDescription(record.id, record.language, id);
            await fetchProduct();
        } catch (error) {
            console.error("Failed to translate product description:", error);
        }
        setTableLoading(false);
    };

    const handleAIVerify = async (record) => {
        setTableLoading(true);
        try {
            await translationController.verifyTranslatiod(record.id);
            await fetchProduct();
        } catch (error) {
            console.error("Failed to verify translation:", error);
        }
        setTableLoading(false);
    };

    const handleCopyToClipboard = (translation) => {
        if (!translation) {
            message.error("No translation to copy.");
            return;
        }
        navigator.clipboard.writeText(translation).then(() => {
            message.success("Translation copied to clipboard!");
        }).catch((error) => {
            console.error("Failed to copy to clipboard:", error);
            message.error("Failed to copy translation.");
        });
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const handleExport = () => {
        setExportLoading(true);
        try {
            const selectedTranslations = translations.filter((translation) =>
                selectedRowKeys.includes(translation.id)
            );
            const data = selectedTranslations.map((t) => ({
                Language: t.language,
                Translation: t.translation,
                Status: t.status,
                Rating: t.rating,
                Verification: t.verification,
            }));
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Translations");
            XLSX.writeFile(workbook, "translations.xlsx");
        } catch (error) {
            console.error("Failed to export translations:", error);
        }
        setExportLoading(false);
    };

    const displayedFields = [
        "cod_article",
        "product_description_en",
        "product_status",
        "brand",
        "category",
        "sub_category_en",
    ];

    const remainingProductInfo = Object.keys(product)
        .filter((key) => !displayedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = product[key];
            return obj;
        }, {});

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <PageContent
                    title="Product Detail"
                    breadcrumb={[
                        { title: "Products", link: "/products" },
                        { title: "Product Detail" },
                    ]}
                />
                <Row gutter={[32, 32]} style={{ marginTop: "20px" }}>
                    <Col span={24}>
                        <Card className="hp-border-radius-lx" title="Product Details">
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Article Code">{product.cod_article}</Descriptions.Item>
                                <Descriptions.Item label="Description">{product.product_description_en}</Descriptions.Item>
                                <Descriptions.Item label="Status">{product.product_status}</Descriptions.Item>
                                <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
                                <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
                                <Descriptions.Item label="Subcategory">{product.sub_category_en}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card className="hp-border-radius-lx" title="Translations">
                            <div className="hp-mb-16">
                                <Button
                                    type="primary"
                                    onClick={handleExport}
                                    disabled={!hasSelected || exportLoading}
                                    loading={exportLoading}
                                    icon={<ExportOutlined />}
                                >
                                    Export
                                </Button>
                                <span className="hp-ml-8">
                                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                                </span>
                            </div>
                            <Table
                                rowSelection={rowSelection}
                                columns={translationColumns}
                                dataSource={translations}
                                rowKey="id"
                                pagination={false}
                                loading={tableLoading}
                            />
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card className="hp-border-radius-lx" title="Additional Product Information">
                            <Descriptions bordered column={1}>
                                {Object.entries(remainingProductInfo).map(([key, value]) => (
                                    <Descriptions.Item label={key} key={key}>
                                        {JSON.stringify(value)}
                                    </Descriptions.Item>
                                ))}
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
