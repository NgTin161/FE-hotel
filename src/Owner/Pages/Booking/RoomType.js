import React, { useEffect, useState } from 'react';
import { Table, Switch, Button, Modal, Form, Input, InputNumber } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
// 
const RoomType = () => {
  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'Room A',
      maxPeople: 4,
      area: 50,
      price: 100,
      singleBed: 1,
      doubleBed: 1,
      totalRoom: 2,
      isActive: true,
      haveFreeDrinkWater: true,
      haveMiniBar: true,
      haveClothesHanger: true,
      haveClosets: true,
      haveBathtubAndShower: true,
      haveAirConditioner: true,
      haveBacony: true,
      haveTvScreen: true,
      haveFreeWifi: true,
      haveNoSmoking: true,
      haveFreeBreakfast: true,
      haveFreeCleaningRoom: true,
      haveFreeLaundry: true,
      haveNiceView: true,
    },
    {
      id: '2',
      name: 'Room B',
      maxPeople: 2,
      area: 30,
      price: 80,
      singleBed: 1,
      doubleBed: 0,
      totalRoom: 1,
      isActive: false,
      haveFreeDrinkWater: false,
      haveMiniBar: false,
      haveClothesHanger: true,
      haveClosets: false,
      haveBathtubAndShower: false,
      haveAirConditioner: true,
      haveBacony: false,
      haveTvScreen: true,
      haveFreeWifi: true,
      haveNoSmoking: true,
      haveFreeBreakfast: false,
      haveFreeCleaningRoom: false,
      haveFreeLaundry: false,
      haveNiceView: false,
    },
    // Add more rooms as needed
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const showModal = (room) => {
    setCurrentRoom(room);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSwitchChange = (checked, record) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.key === record.key ? { ...room, isActive: checked } : room
      )
    );
  };
  //   const [roomTypeData,setRommTypeData] =
  //   useEffect(() => {
  //     // Lấy query params từ URL hiện tại
  //     // Lấy các giá trị từ query param

  //     const fetchHotelDetail = async () => {
  //          const id = localStorage.getItem('hotelId');
  //         try {
  //             const fetch = await axiosJson.get(`/Hotels/${id}`)
  //             console.log(fetch.data);
  //             setHotelDetail(fetch.data)
  //             // messageApi.open({
  //             //     type: 'success',
  //             //     content: 'Thành công',
  //             // });
  //         } catch (error) {
  //             console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
  //         }
  //     }
  //     fetchHotelDetail();
  // }, []);

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'index',
      render: (text, record, index) => <div style={{ textAlign: 'center' }}>{index + 1}</div>,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Max People',
      dataIndex: 'maxPeople',
      key: 'maxPeople',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Single Bed',
      dataIndex: 'singleBed',
      key: 'singleBed',
    },
    {
      title: 'Double Bed',
      dataIndex: 'doubleBed',
      key: 'doubleBed',
    },
    {
      title: 'Total Room',
      dataIndex: 'totalRoom',
      key: 'totalRoom',
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleSwitchChange(checked, record)}
          checkedChildren="ON"
          unCheckedChildren="OFF"
        />
      ),
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)} />
        </span>
      ),
      align: 'center',
    },
  ];

  const roomDetails = [
    'haveFreeDrinkWater',
    'haveMiniBar',
    'haveClothesHanger',
    'haveClosets',
    'haveBathtubAndShower',
    'haveAirConditioner',
    'haveBacony',
    'haveTvScreen',
    'haveFreeWifi',
    'haveNoSmoking',
    'haveFreeBreakfast',
    'haveFreeCleaningRoom',
    'haveFreeLaundry',
    'haveNiceView',
  ];

  return (
    <div>
      <Table columns={columns} dataSource={rooms} />
      <Modal
        title="Room Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="60%"
      >
        {currentRoom && (
          <Form
            initialValues={{
              name: currentRoom.name,
              maxPeople: currentRoom.maxPeople,
              area: currentRoom.area,
              price: currentRoom.price,
              singleBed: currentRoom.singleBed,
              doubleBed: currentRoom.doubleBed,
              totalRoom: currentRoom.totalRoom,
              ...currentRoom,
            }}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Max People" name="maxPeople">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Area" name="area">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Single Bed" name="singleBed">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Double Bed" name="doubleBed">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Total Room" name="totalRoom">
              <InputNumber />
            </Form.Item>
            {roomDetails.map((detail) => (
              <Form.Item key={detail} label={detail.replace(/([A-Z])/g, ' $1')} name={detail} valuePropName="checked">
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default RoomType;
