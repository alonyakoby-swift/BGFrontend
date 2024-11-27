import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Chart from "react-apexcharts";
import ApiService from "../../network/ApiService"; // Adjust this import based on your file structure

const apiService = new ApiService();

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await apiService.get("stats"); // Use ApiService's get method
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const totalTranslations = stats.translated + stats.pending + stats.completed;

  const donutChartData = {
    series: [stats.translated, stats.pending, stats.completed],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Translated", "Pending", "Completed"],
      colors: ["#00E396", "#FEB019", "#FF4560"],
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const actualValue = opts.w.globals.series[opts.seriesIndex];
          return `${actualValue} (${val.toFixed(2)}%)`;
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Card className="hp-border-radius-lx">
                <h4 className="h4 hp-d-block hp-text-color-black-bg hp-text-color-dark-0 hp-font-weight-400 hp-mr-4">
                  Total Products 📦
                </h4>
                <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {stats.product_count}
                </div>
                <p className="hp-p1-body">Total number of products in the database.</p>
              </Card>
            </Col>

            <Col span={12}>
              <Card className="hp-border-radius-lx">
                <h4 className="h4 hp-d-block hp-text-color-black-bg hp-text-color-dark-0 hp-font-weight-400 hp-mr-4">
                  Translation Status 📊
                </h4>
                <div id="donut-chart" className="hp-donut-chart">
                  <Chart
                      options={donutChartData.options}
                      series={donutChartData.series}
                      type="donut"
                      height={350}
                  />
                </div>
                <div className="hp-mt-16">
                  <p><strong>Translated:</strong> {stats.translated} ({((stats.translated / totalTranslations) * 100).toFixed(2)}%)</p>
                  <p><strong>Pending:</strong> {stats.pending} ({((stats.pending / totalTranslations) * 100).toFixed(2)}%)</p>
                  <p><strong>Completed:</strong> {stats.completed} ({((stats.completed / totalTranslations) * 100).toFixed(2)}%)</p>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
  );
}
