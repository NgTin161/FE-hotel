import React, { useState } from 'react';
import { Table, Image, Space, InputNumber, Button } from 'antd';
import * as signalR from '@microsoft/signalr';
import { useEffect } from 'react';
import SpinComponents from './Spin';
const roomData = {
  "numberOfDays": 2,
  "roomTypes": [
    {
      "id": 1,
      "name": "Luxury Room",
      "imageURL": "https://localhost:7186/Images/71d05988-0136-4468-bfd5-4956e4ccbb04/8692acce-3762-45ae-bcf5-e839aaf4d093.jpg",
      "maxPeople": 3,
      "price": 2400000,
      "weekendPrice": 0,
      "holidayPrice": 0,
      "numberOfBed": 1,
      "totalRoom": 20,
      "availableRooms": 20,
      "haveFreeDrinkWater": true,
      "haveMiniBar": true,
      "haveClothesHanger": null,
      "haveClosets": null,
      "haveBathtubAndShower": null,
      "haveAirConditioner": null,
      "haveBalcony": null,
      "haveTvScreen": null,
      "haveFreeWifi": null,
      "haveNoSmoking": null,
      "haveFreeBreakfast": null,
      "haveFreeCleaningRoom": null,
      "haveFreeLaundry": true,
      "haveNiceView": null,
      "hotelId": 1,
      "isActive": true
    },
    {
      "id": 2,
      "name": "Double Room",
      "imageURL": "https://localhost:7186/Images/71d05988-0136-4468-bfd5-4956e4ccbb04/8692acce-3762-45ae-bcf5-e839aaf4d093.jpg",
      "maxPeople": 2,
      "price": 1800000,
      "weekendPrice": 0,
      "holidayPrice": 0,
      "numberOfBed": 2,
      "totalRoom": 10,
      "availableRooms": 10,
      "haveFreeDrinkWater": null,
      "haveMiniBar": null,
      "haveClothesHanger": null,
      "haveClosets": null,
      "haveBathtubAndShower": null,
      "haveAirConditioner": null,
      "haveBalcony": null,
      "haveTvScreen": null,
      "haveFreeWifi": null,
      "haveNoSmoking": true,
      "haveFreeBreakfast": null,
      "haveFreeCleaningRoom": null,
      "haveFreeLaundry": true,
      "haveNiceView": true,
      "hotelId": 1,
      "isActive": true
    }
  ]
};

const RoomTypesTable = ({ roomTypes }) => {
  const [roomQuantities, setRoomQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);



  const columns = [
    {
      title: 'Hình đại diện',
      dataIndex: 'imageURL',
      render: imageURL => <Image src={imageURL} width={80} />,
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
    },
    {
      title: 'Số người',
      dataIndex: 'maxPeople',
    },
    {
      title: 'Dịch vụ',
      render: (_, record) => (
        <Space style={{ display: 'flex', flexDirection: 'column' }}>
          {record.haveFreeDrinkWater && <span>Free Drink Water</span>}
          {record.haveMiniBar && <span>Mini Bar</span>}
          {record.haveClothesHanger && <span>Clothes Hanger</span>}
          {record.haveClosets && <span>Closets</span>}
          {record.haveBathtubAndShower && <span>Bathtub & Shower</span>}
          {record.haveAirConditioner && <span>Air Conditioner</span>}
          {record.haveBalcony && <span>Balcony</span>}
          {record.haveTvScreen && <span>TV Screen</span>}
          {record.haveFreeWifi && <span>Free Wifi</span>}
          {record.haveNoSmoking && <span>No Smoking</span>}
          {record.haveFreeBreakfast && <span>Free Breakfast</span>}
          {record.haveFreeCleaningRoom && <span>Free Cleaning Room</span>}
          {record.haveFreeLaundry && <span>Free Laundry</span>}
          {record.haveNiceView && <span>Nice View</span>}
        </Space>
      ),
    },
    {
      title: `Giá tiền  cho ${roomTypes?.numberOfDays} đêm  `,
      dataIndex: 'price',
      render: (_, record) => (
        <span>
          {record.price.toLocaleString()} VND
          <br />
          {record.availableRooms.toLocaleString()} phòng loại này
        </span>
      ),
    },
    {
      title: 'Chọn số lượng',
      render: (_, record) => (
        <InputNumber
          min={0}
          max={record.availableRooms}
          defaultValue={0}
          onChange={value => handleQuantityChange(record.id, value, record.price, roomData.numberOfDays)}
        />
      ),
    },
  ];

  const handleQuantityChange = (roomId, quantity, price, numberOfDays) => {
    const updatedQuantities = {
      ...roomQuantities,
      [roomId]: { quantity, price, numberOfDays },
    };
    setRoomQuantities(updatedQuantities);

    // Tính toán tổng số tiền
    let total = 0;
    Object.values(updatedQuantities).forEach(({ quantity, price }) => {
      if (quantity > 0) {
        total += price * quantity;
      }
    });
    setTotalPrice(total);
  };

  const handleConfirmBooking = () => {
    // Thực hiện xác nhận đặt phòng, ví dụ lưu vào cơ sở dữ liệu, gửi request API, ...
    console.log('Đã xác nhận đặt phòng');
    console.log('Thông tin số lượng phòng:', roomQuantities);
    console.log('Tổng số tiền:', totalPrice);
    // Có thể thêm các xử lý khác ở đây theo nhu cầu của ứng dụng của bạn
  };
  if (!roomTypes) {

    return <SpinComponents />;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Table
        columns={columns}
        dataSource={roomTypes?.roomTypes}
        rowKey="id"
        pagination={false}
        bordered
      />
      <div style={{ marginTop: '20px' }}>
        <h3>Tổng số tiền: {totalPrice.toLocaleString()} VND</h3>
        <Button type="primary" onClick={handleConfirmBooking}>
          Xác nhận đặt phòng
        </Button>
      </div>
    </div>
  );
};

export default RoomTypesTable;
