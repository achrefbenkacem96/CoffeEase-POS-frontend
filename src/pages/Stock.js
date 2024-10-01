/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

// stock table configuration
const stockColumns = [
  {
    title: "ITEM",
    dataIndex: "item",
    width: "32%",
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "REORDER",
    dataIndex: "reorder",
  },
];

const stockData = [
  {
    key: "1",
    item: (
      <>
        <Avatar.Group>
           <div className="avatar-info">
            <Title level={5}>Coffee Beans</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    quantity: (
      <>
        <div className="semibold">50 kg</div>
      </>
    ),
    status: (
      <>
        <div className="text-sm">In Stock</div>
      </>
    ),
    reorder: (
      <>
        <div className="ant-progress-project">
          <Progress percent={70} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
  {
    key: "2",
    item: (
      <>
        <Avatar.Group>
           <div className="avatar-info">
            <Title level={5}>Coffee Cups</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    quantity: (
      <>
        <div className="semibold">200 pcs</div>
      </>
    ),
    status: (
      <>
        <div className="text-sm">Low Stock</div>
      </>
    ),
    reorder: (
      <>
        <div className="ant-progress-project">
          <Progress percent={40} size="small" status="exception" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
  {
    key: "3",
    item: (
      <>
        <Avatar.Group>
           <div className="avatar-info">
            <Title level={5}>Milk</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    quantity: (
      <>
        <div className="semibold">20 liters</div>
      </>
    ),
    status: (
      <>
        <div className="text-sm">Out of Stock</div>
      </>
    ),
    reorder: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" format={() => "Reorder"} />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

function Stock() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Stock Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="in-stock">In Stock</Radio.Button>
                    <Radio.Button value="low-stock">Low Stock</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={stockColumns}
                  dataSource={stockData}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
               
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Stock;

