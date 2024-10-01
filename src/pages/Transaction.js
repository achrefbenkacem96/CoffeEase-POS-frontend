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

// transaction table configuration
const transactionColumns = [
  {
    title: "TRANSACTION ID",
    dataIndex: "transactionId",
    width: "25%",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "DATE",
    dataIndex: "date",
  },
];

const transactionData = [
  {
    key: "1",
    transactionId: (
      <>
        <div className="semibold">#12345</div>
      </>
    ),
    amount: (
      <>
        <div className="semibold">$500</div>
      </>
    ),
    status: (
      <>
        <div className="text-sm">Completed</div>
      </>
    ),
    date: (
      <>
        <div className="text-sm">2024-09-18</div>
      </>
    ),
  },
  {
    key: "2",
    transactionId: (
      <>
        <div className="semibold">#12346</div>
      </>
    ),
    amount: (
      <>
        <div className="semibold">$1,200</div>
      </>
    ),
    status: (
      <>
        <div className="text-sm">Pending</div>
      </>
    ),
    date: (
      <>
        <div className="text-sm">2024-09-17</div>
      </>
    ),
  },
  {
    key: "3",
    transactionId: (
      <>
        <div className="semibold">#12347</div>
      </>
    ),
    amount: (
      <>
        <div className="semibold">$900</div>
      </>
    ),
    status: (
      <>
        <div className="text-sm">Failed</div>
      </>
    ),
    date: (
      <>
        <div className="text-sm">2024-09-16</div>
      </>
    ),
  },
];

function Transaction() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="completed">Completed</Radio.Button>
                    <Radio.Button value="pending">Pending</Radio.Button>
                    <Radio.Button value="failed">Failed</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={transactionColumns}
                  dataSource={transactionData}
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

export default Transaction;

