import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import GaugeChart from 'react-gauge-chart';  // Corrected import for GaugeChart

const data = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 180 },
  { month: 'Mar', value: 130 },
  { month: 'Apr', value: 150 },
  { month: 'May', value: 200 },
];

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Financial Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div>
          <h3>Total Accounts Receivable</h3>
          <p>$6,621,280</p>
        </div>
        <div>
          <h3>Total Accounts Payable</h3>
          <p>$1,630,270</p>
        </div>
        <div>
          <h3>Equity Ratio</h3>
          <p>75.38%</p>
        </div>
        <div>
          <h3>Debt Equity</h3>
          <p>1.10%</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <ResponsiveContainer width="30%" height={200}>
          <GaugeChart id="gauge-chart1" percent={0.86} textColor="#000" />
        </ResponsiveContainer>
        <ResponsiveContainer width="30%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="month" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="30%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ResponsiveContainer width="45%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="45%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
