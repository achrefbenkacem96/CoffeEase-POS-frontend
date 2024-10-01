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

 
// table code start
const columns = [
  {
    title: "Guest Name",
    dataIndex: "guestName",
    key: "guestName",
    width: "25%",
  },
  {
    title: "Reservation Time",
    dataIndex: "reservationTime",
    key: "reservationTime",
    width: "20%",
  },
  {
    title: "Table Number",
    key: "tableNumber",
    dataIndex: "tableNumber",
    width: "15%",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    width: "15%",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    width: "15%",
  },
];

const data = [
  {
    key: "1",
    guestName: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={40} src={face2}></Avatar>
          <div className="avatar-info">
            <Title level={5}>John Doe</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    reservationTime: <span>12:30 PM, 23/09/24</span>,
    tableNumber: <span>Table 4</span>,
    status: (
      <>
        <Button type="primary" className="tag-primary">
          Confirmed
        </Button>
      </>
    ),
    action: (
      <>
        <a href="#edit">Edit</a> | <a href="#cancel">Cancel</a>
      </>
    ),
  },
  {
    key: "2",
    guestName: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={40} src={face3}></Avatar>
          <div className="avatar-info">
            <Title level={5}>Alexa Liras</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    reservationTime: <span>2:00 PM, 23/09/24</span>,
    tableNumber: <span>Table 7</span>,
    status: (
      <>
        <Button type="default" className="tag-default">
          Pending
        </Button>
      </>
    ),
    action: (
      <>
        <a href="#edit">Edit</a> | <a href="#cancel">Cancel</a>
      </>
    ),
  },
  {
    key: "3",
    guestName: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={40} src={face}></Avatar>
          <div className="avatar-info">
            <Title level={5}>Michael Smith</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    reservationTime: <span>6:00 PM, 23/09/24</span>,
    tableNumber: <span>Table 12</span>,
    status: (
      <>
        <Button type="danger" className="tag-danger">
          Canceled
        </Button>
      </>
    ),
    action: (
      <>
        <a href="#edit">Edit</a>
      </>
    ),
  },
];

function Command() {
  const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Commande Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">Confirmed</Radio.Button>
                    <Radio.Button value="c">Pending</Radio.Button>
                    <Radio.Button value="d">Canceled</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
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

export default Command;
