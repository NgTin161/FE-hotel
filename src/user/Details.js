import React, { useEffect, useState } from 'react';

import * as signalR from '@microsoft/signalr';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Checkbox, Dropdown, Flex, Input, InputNumber, Menu, Rate, message } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { axiosJson } from '../axios/axiosCustomize';
import SlidesDetails from '../Components/SlidesDetails';
import MapDetail from '../Components/MapDetail';

import { MdOutlineEmail } from "react-icons/md";
import { FaRegClock, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import SpinComponents from '../Components/Spin';
import { UserOutlined } from '@ant-design/icons';
import SlidesReview from '../Components/SlidesReview';
import RoomTypesTable from '../Components/RoomTypesTable';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const Details = () => {
    const { id: hoteld } = useParams();
    const [hotelDetail, setHotelDetail] = useState();


    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);


    const [checkinDate, setCheckIn] = useState();
    const [checkoutDate, setCheckOut] = useState();
    const dateFormat = 'DD/MM/YYYY';

    const [tempAdults, setTempAdults] = useState(adults);
    const [tempChildren, setTempChildren] = useState(children);
    const [tempRooms, setTempRooms] = useState(rooms);


    const handleDateChange = (dates, dateStrings) => {
        if (dateStrings[0] && dateStrings[1]) {
            const fromDate = dayjs(dateStrings[0], dateFormat).format('YYYY-MM-DD');
            const toDate = dayjs(dateStrings[1], dateFormat).format('YYYY-MM-DD');
            setCheckIn(fromDate);
            setCheckOut(toDate);
        }
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const handleDone = () => {
        setAdults(tempAdults);
        setChildren(tempChildren);
        setRooms(tempRooms);
        // Perform any other actions needed on submission
    };





    const handleSearchRoom = () => {

        // const queryParams = {
        //     province: province,
        //     checkinDate,
        //     checkoutDate,
        //     numberOfPeople: (adults + children),
        //     numberOfRooms: rooms,
        // };

        // // Tạo một mảng các phần tử trong query string
        // const queryString = Object.keys(queryParams)
        //     .map(key => {
        //         if (key === 'fromDate' || key === 'toDate') {
        //             return queryParams[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}` : '';
        //         }
        //         // Thay dấu cách bằng dấu '+', không cần encode
        //         const value = queryParams[key] ? queryParams[key].toString().replace(/ /g, '+') : '';
        //         return value ? `${encodeURIComponent(key)}=${value}` : '';
        //     })
        //     .filter(Boolean) // Loại bỏ các phần tử rỗng trong mảng
        //     .join('&');

    };

    const menu = (
        <Menu style={{ display: 'flow', justifyContent: 'space-between', alignItems: 'center' }}>
            <Menu.Item key="1">
                <div style={{ display: 'flex' }}>
                    <label>Người lớn</label>
                    <InputNumber
                        min={1}
                        max={10}
                        value={tempAdults}
                        style={{ marginLeft: 30 }}
                        onChange={value => setTempAdults(value)}
                    />
                </div>
            </Menu.Item>
            <Menu.Item key="2">
                <div style={{ display: 'flex' }}>
                    <label>Trẻ em</label>
                    <InputNumber
                        min={0}
                        max={10}
                        value={tempChildren}
                        style={{ marginLeft: 50 }}
                        onChange={value => setTempChildren(value)}
                    />
                </div>
            </Menu.Item>
            <Menu.Item key="3">
                <div style={{ display: 'flex' }}>
                    <label>Phòng</label>
                    <InputNumber
                        min={1}
                        max={10}
                        value={tempRooms}
                        style={{ marginLeft: 50 }}
                        onChange={value => setTempRooms(value)}
                    />
                </div>
            </Menu.Item>
            <Menu.Item key="4">
                <Button type="primary" style={{ width: '100%' }} onClick={handleDone}>Xong</Button>
            </Menu.Item>
        </Menu>
    );

    const [room, setRoom] = useState();
    const [messageApi, contextHolder] = message.useMessage()
    const formatTime = (time) => time.slice(0, 5);

    useEffect(() => {
        // Lấy query params từ URL hiện tại
        // Lấy các giá trị từ query param

        const fetchHotelDetail = async () => {

            try {
                const fetch = await axiosJson.get(`/Hotels/${hoteld}`)
                console.log(fetch.data);
                setHotelDetail(fetch.data)
                // messageApi.open({
                //     type: 'success',
                //     content: 'Thành công',
                // });
            } catch (error) {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
            }
        }
        fetchHotelDetail();
    }, []);

    const [roomTypes, setRoomTypes] = useState();
    useEffect(() => {
        // Lấy query params từ URL hiện tại
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

    
        const checkIn = urlParams.get('checkinDate');
        const checkOut = urlParams.get('checkoutDate');
        const numberOfAdults = urlParams.get('numberOfAdults');
        const numberOfChildren = urlParams.get('numberOfChildren');
        const numberOfRooms = urlParams.get('numberOfRooms');

        if (checkIn && checkOut && numberOfChildren && numberOfAdults && numberOfRooms) {
            // Tạo object chứa dữ liệu để gửi đi
            // const requestData = {
            //     province: province,
            //     checkinDate: checkIn,
            //     checkinDate: checkOut,
            //     numberOfPeople: parseInt(numberOfPeople),
            //     numberOfRooms: parseInt(numberOfRooms)
            // };

            // URL endpoint
            const fetchRoomTypes = async () => {
                try {
                    const fetch = await axiosJson.get(`/RoomTypes/getavailableroom?hotelId=${hoteld}&checkinDate=${checkIn}&checkoutDate=${checkOut}&numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}&numberOfRooms=${numberOfRooms}`)
                    console.log('roomtype', fetch.data);
                    setRoomTypes(fetch.data)
                    messageApi.open({
                        type: 'success',
                        content: 'Thành công',
                    });
                } catch (error) {
                    console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
                }
            }
            fetchRoomTypes();
        }
    }, []);





    return (
        <>
            {hotelDetail ? (
                <div className='container'>

                    <Card
                        style={{
                            width: '90%',
                            backgroundColor: '#ebf2f7',
                            marginLeft: '30px',
                            fontSize: '15px',
                        }}
                    >

                        <h5>{hotelDetail.hotelName}</h5>
                        <p><FaLocationDot size={26} />{hotelDetail.address}</p>

                        <p> <Rate disabled defaultValue={hotelDetail.ratingStarts} /></p>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <p><strong><FaRegClock size={25} /> Giờ checkin:</strong> {formatTime(hotelDetail.checkinTime)}</p>
                            <p><strong><FaRegClock size={25} /> Giờ checkin:</strong>  {formatTime(hotelDetail.checkoutTime)} </p>
                        </div>
                        <p><MdOutlineEmail size={25} />:{hotelDetail.email}</p>
                        <p><FaPhoneAlt size={25} />:{hotelDetail.phoneNumber}</p>
                    </Card>
                    <div className='container' style={{ display: 'flex', marginTop: '20px' }}>
                        <SlidesDetails hotelDetail={hotelDetail} />
                        <MapDetail hotelData={hotelDetail} />
                    </div>


                    {/* Right column for hotel details */}

                    <Card style={{
                        width: '90%',
                        backgroundColor: '#ebf2f7',
                        marginLeft: '30px',
                        fontSize: '15px',
                        marginTop: '20px'
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: hotelDetail.description }} />
                        <h3>Hotel Services</h3>
                        <ul>
                            <li>Accepts Children: {hotelDetail.acceptChildren ? 'Yes' : 'No'}</li>
                            <li>Accepts Pets: {hotelDetail.acceptPet ? 'Yes' : 'No'}</li>
                            {/* Add more hotel services as needed */}
                        </ul>
                    </Card>
                    <hr></hr>
                    <Card
                        style={{
                            width: '90%',
                            backgroundColor: '#ebf2f7',
                            marginLeft: '30px',
                            fontSize: '10px',
                            marginTop: '20px'
                        }}>
                        <h4>Phòng trống</h4>
                        <div className='container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className='containerSearch' style={{ width: '750px' }}>
                                <div style={{ marginTop: 20 }}>
                                    <RangePicker
                                        style={{ paddingLeft: 30 }}
                                        format={dateFormat}
                                        placeholder={['Ngày đến', 'Ngày đi']}
                                        disabledDate={disabledDate}
                                        onChange={handleDateChange}
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <Button style={{}} icon={<UserOutlined />}>
                                            {adults} người lớn - {children} trẻ em - {rooms} phòng
                                        </Button>
                                    </Dropdown>
                                </div>
                                <div className="icon-container">
                                    <Button type="primary" onClick={handleSearchRoom}>

                                        <i style={{ color: 'white' }} className="fa-solid fa-magnifying-glass"></i>

                                    </Button>
                                </div>
                            </div>
                        </div>
                        <RoomTypesTable roomTypes={roomTypes} />
                    </Card>
                    <hr></hr>
                    <h3> Đánh giá</h3>
                    <SlidesReview />

                </div >
            ) : (

                <SpinComponents />
            )

            }

        </>
    );
}
export default Details;