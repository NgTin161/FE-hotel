import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Tháng 4',
    'Tổng doanh thu (VND)': 500000000,
    'Tỷ lệ lấp đầy (%)': 75,
  },
  {
    name: 'Tháng 5',
    'Tổng doanh thu (VND)': 420000000,
    'Tỷ lệ lấp đầy (%)': 63,
  },
  {
    name: 'Tháng 6',
    'Tổng doanh thu (VND)': 300000000,
    'Tỷ lệ lấp đầy (%)': 50,
  },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 30,
          right: 50,
          left: 30,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#1890ff" />
        <YAxis yAxisId="right" orientation="right" stroke="gold" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="Tổng doanh thu (VND)" fill="#1890ff" />
        <Bar yAxisId="right" dataKey="Tỷ lệ lấp đầy (%)" fill="gold" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
