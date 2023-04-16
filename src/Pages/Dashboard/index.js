import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then(res=>{
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then(res=>{
      setInventory(res.total);
    });
    getCustomers().then(res=>{
      setCustomers(res.total);
    });
  }, [])

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{ 
                color: "white", 
                backgroundColor: "#20B9D0",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
             }}
            />}
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={<ShoppingOutlined 
            style={{ 
                color: "white", 
                backgroundColor: "#28D0D0",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
             }}
          />}
          title={"Inventory"}
          value={inventory}
        />
        <DashboardCard
          icon={<UserOutlined 
            style={{ 
                color: "white", 
                backgroundColor: "#57E5C6",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
             }}
          />}
          title={"Customers"}
          value={customers}
        />
        <DashboardCard
          icon={<DollarCircleOutlined 
            style={{ 
                color: "white", 
                backgroundColor: "#8DF8B7",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
             }}
          />}
          title={"Revenue"}
          value={revenue}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{paddingLeft: 8, paddingRight: 8}}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setDataSource(res.products.splice(0, 3));
            setLoading(false);
        });
    }, []);

    return (
    <>
    <Typography.Text style={{ fontSize: 16, fontWeight: 600, }}>Recent Orders</Typography.Text>
    <Table
        columns={[
            {
                title:"Title",
                dataIndex:"title",
            },
            {
                title:"Quantity",
                dataIndex:"quantity",
            },
            {
                title:"Price",
                dataIndex:"discountedPrice",
            },
    ]}
    loading={loading}
    dataSource={dataSource}
    pagination={false}
    ></Table>
    </>
    );
}

function DashboardChart(params) {

  const [revenueData, setRevenueData] = useState({
    labels:[],
    datasets: []
  })

  useEffect(() => {
    getRevenue().then(res=>{
      const labels = res.carts.map(cart=>{
        return `User-${cart.userId}`;
      });
      const data = res.carts.map(cart=>{
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
            backgroundColor: '#8DF8B7',
          },
        ],
      };

      setRevenueData(dataSource)

    });
  }, [])

    const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

   
  return (
    <Card style={{width: 500, height: 250}}>
  <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
