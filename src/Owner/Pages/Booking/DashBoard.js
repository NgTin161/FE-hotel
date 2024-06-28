import React from 'react';
import { Col, DatePicker, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayjs from 'dayjs';
import Chart from './Chart';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const today = dayjs();

const formatter = (value) => (
  <CountUp
    end={value}
    separator=","
    formattingFn={(value) => `${value.toLocaleString()} VND`}
  />
);
const dateFormat = 'DD-MM-YYYY';

const DashBoard = () => (
  <>

    <h1 style={{
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontWeight: 700,
      color: '#379AE6FF'
    }}>Tổng quan</h1>
    <div style={{ display: 'flex  ', gap: 15 }}>
      <span> Chọn ngày:</span>
      <DatePicker
        defaultValue={today}
        format={dateFormat}
        style={{
          borderRadius: '8px',
          border: '1px solid #1890ff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          backgroundColor: 'white'
        }}
      />
    </div>

    <Row style={{ display: 'flex', gap: 50, justifyContent: 'center', marginTop: '20px' }}>

      <Statistic
        style={{
          borderRadius: "30px",
          width: 250,
          textAlign: 'center',
          backgroundColor: '#379AE6FF',
          padding: '20px'
        }}
        title={<span style={{ color: 'white', fontSize: '20px' }}>Doanh thu hôm nay</span>} // Increase title font size
        value={112893}
        valueStyle={{ color: 'white', fontSize: '30px' }} // Increase value font size
        formatter={formatter}
      />

      <Statistic
        style={{
          borderRadius: "30px",
          width: 250,
          textAlign: 'center',
          backgroundColor: '#379AE6FF',
          color: 'white',
          padding: '20px'
        }}
        title={<span style={{ color: 'white', fontSize: '20px' }}>Phòng trống hôm nay</span>}
        valueStyle={{ color: 'white', fontSize: '30px' }}
        value={12}
      />
      <Statistic
        style={{
          borderRadius: "30px",
          width: 250,
          textAlign: 'center',
          backgroundColor: '#379AE6FF',
          color: 'white',
          padding: '20px'
        }}
        title={<span style={{ color: 'white', fontSize: '20px' }}>Doanh thu tháng này</span>}
        value={112893}
        valueStyle={{ color: 'white', fontSize: '30px' }} // Increase value font size
        formatter={formatter} />

    </Row>

    <div>
      <Chart />
    </div>

  </>
);
export default DashBoard;