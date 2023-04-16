import { Badge, Drawer, Image, Space, Typography, List } from "antd";
import { MailOutlined, BellFilled} from "@ant-design/icons"
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import logo from '../../img/store.png'


function AppHeader() {

    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);



    useEffect(() => {
        getComments().then(res => {
            setComments(res.comments)
        });
        getOrders().then(res => {
            setOrders(res.products)
        });
    }, [])

    return <div className="AppHeader">
    
    <Image 
    width={40}
    src={logo} alt="Store"> 
    </Image>
    <Typography.Title style={{ color: '#28D0D0' }}>Thais's Dashboard</Typography.Title>
    <Space>
        <Badge count={comments.length} dot>
        <MailOutlined 
        style={{ fontSize: 24 }}
        onClick={() => {
            setCommentsOpen(true)
        }} 
        />
        </Badge>
        <Badge count={orders.length}>
        <BellFilled 
        style={{ fontSize: 24 }}
        onClick={() => {
            setNotificationsOpen(true)
        }} 
        />
        </Badge>
    </Space>
        <Drawer 
        title="Comments" 
        open={commentsOpen} 
        onClose={() => {
        setCommentsOpen(false)
        }} maskClosable
        >
            <List dataSource={comments} 
            renderItem={(item)=>{
               return <List.Item>{item.body}</List.Item>
            }}></List>
        </Drawer>
        <Drawer 
        title="Notifications" 
        open={notificationsOpen} 
        onClose={() => {
        setNotificationsOpen(false)
        }} maskClosable
        >
            <List dataSource={orders} 
            renderItem={(item)=>{
               return <List.Item><Typography.Text strong>{item.title}</Typography.Text> has been ordered!</List.Item>
            }}></List>
        </Drawer>
    </div>
}

export default AppHeader