import { Menu } from "antd";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SideMenu() {
    const location = useLocation()
    const [selectedKeys, setSelectKeys] = useState('/')

    useEffect(() => {
        const pathName = location.pathname
        setSelectKeys(pathName)

    }, [location.pathname])

    const navigate = useNavigate()
    return <div className="SideMenu">
        <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item)=>{
            navigate(item.key);
        }}
            selectedKeys={[selectedKeys]}
            items={[
                {
                    label: "Dashboard",
                    icon: <AppstoreOutlined />,
                    key: "/",
                },
                {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: "/inventory",
                },
                {
                        label: "Orders",
                        icon: <ShoppingCartOutlined />,
                        key: "/orders",
                },
                {
                    label: "Customers",
                    icon: <UserOutlined />,
                    key: "/customers",
                },
            ]}
        ></Menu>
    </div>
}

export default SideMenu