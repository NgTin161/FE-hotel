import React, { useEffect, useState } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import { Button, Card, Checkbox, Dropdown, Flex, Input, InputNumber, Menu, Rate, Select, message } from 'antd';
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
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import SlidesReview from '../Components/SlidesReview';
import RoomTypesTable from '../Components/RoomTypesTable';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Option } from 'antd/es/mentions';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const urlDateFormat = 'YYYY-MM-DD';

const Details = () => {
    const [position, setPosition] = useState('end');
    const { id: hotelId } = useParams();
    const [hotelDetail, setHotelDetail] = useState();


    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    const [checkinDate, setCheckInDate] = useState(null);
    const [checkoutDate, setCheckOutDate] = useState(null);

    const handleDateChange = (dates, dateStrings) => {
        if (dates) {
            setCheckInDate(dayjs(dateStrings[0], dateFormat).format(urlDateFormat));
            setCheckOutDate(dayjs(dateStrings[1], dateFormat).format(urlDateFormat));
        } else {
            setCheckInDate(null);
            setCheckOutDate(null);
        }
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };


    const handleSearch = () => {

        const numberOfChildren = typeof children === 'number' ? children : 0;

        const fetchNewRoom = async () => {
            try {

                const response = await axiosJson.get(`/RoomTypes/getavailableroom?hotelId=${hotelId}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&numberOfAdult=${adults}&numberOfChildren=${numberOfChildren}&numberOfRooms=${rooms}`);

                console.log(hotelId, checkinDate, checkoutDate, adults, numberOfChildren, rooms);
                console.log('new room', response.data);
                setRoomTypes(response.data); // Cập nhật state với dữ liệu mới
                toast.success('Cập nhật thành công');

            } catch (error) {
                console.log('lỗi', error)
                toast.error('Cập nhật thất bại');
            }
        };

        fetchNewRoom();
    };


    const formatTime = (time) => time.slice(0, 5);

    useEffect(() => {
        // Lấy query params từ URL hiện tại
        // Lấy các giá trị từ query param

        const fetchHotelDetail = async () => {

            try {
                const fetch = await axiosJson.get(`/Hotels/${hotelId}`)
                console.log(fetch.data);
                setHotelDetail(fetch.data)

            } catch (error) {
                console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
            }
        }
        fetchHotelDetail();
    }, []);

    const [roomTypes, setRoomTypes] = useState();
    const location = useLocation();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const checkIn = urlParams.get('checkinDate');
        const checkOut = urlParams.get('checkoutDate');
        const numberOfAdults = urlParams.get('numberOfAdults');
        setAdults(numberOfAdults)
        const numberOfChildren = urlParams.get('numberOfChildren');
        setChildren(numberOfChildren)
        const numberOfRooms = urlParams.get('numberOfRooms');
        setRooms(numberOfRooms);
        if (checkIn) setCheckInDate(checkIn);
        if (checkOut) setCheckOutDate(checkOut);

        if (checkIn && checkOut && numberOfChildren && numberOfAdults && numberOfRooms) {
            const fetchRoomTypes = async () => {
                try {
                    const response = await axiosJson.get(`/RoomTypes/getavailableroom`, {
                        params: {
                            hotelId: hotelId,
                            checkinDate: checkIn,
                            checkoutDate: checkOut,
                            numberOfAdults: numberOfAdults,
                            numberOfChildren: numberOfChildren,
                            numberOfRooms: numberOfRooms
                        }
                    });
                    console.log('roomtype', response.data);
                    setRoomTypes(response.data);

                } catch (error) {
                    console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
                }
            }
            fetchRoomTypes();
        }
    }, [location.search, hotelId]);




    const [showDropdown, setShowDropdown] = useState(false);
    const handleAdultsChange = (value) => {
        setAdults(value);
    };

    const handleChildrenChange = (value) => {
        setChildren(value);
    };

    const handleRoomsChange = (value) => {
        setRooms(value);
    };

    const handleDropdownVisibleChange = (visible) => {
        setShowDropdown(visible);
    };

    const handleDone = () => {
        setShowDropdown(false); // Đóng dropdown khi hoàn thành nhập liệu
    };


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
                        <h3>Dịch vụ khách sạn</h3>
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

                        <h3>Phòng trống</h3>
                        <div className='container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '70px' }}>
                            <div className='containerSearch' style={{ width: '800px' }}>
                                <div style={{ marginTop: 20 }}>
                                    <RangePicker
                                        value={
                                            checkinDate && checkoutDate
                                                ? [dayjs(checkinDate, urlDateFormat), dayjs(checkoutDate, urlDateFormat)]
                                                : null
                                        }
                                        style={{ paddingLeft: 30 }}
                                        format={dateFormat}
                                        placeholder={['Ngày đến', 'Ngày đi']}
                                        disabledDate={disabledDate}
                                        onChange={handleDateChange}
                                    />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <Select
                                        style={{ width: 280 }}
                                        value={`${adults} người lớn - ${children} trẻ em - ${rooms} phòng`}
                                        open={showDropdown}
                                        onDropdownVisibleChange={handleDropdownVisibleChange}
                                        dropdownRender={() => (
                                            <div style={{ padding: 8 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                    <label style={{ flex: 1 }}>Người lớn:</label>
                                                    <InputNumber
                                                        min={1}
                                                        max={30}
                                                        defaultValue={adults}
                                                        value={adults}
                                                        onChange={handleAdultsChange}
                                                        style={{ flex: 1 }}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                    <label style={{ flex: 1 }}>Trẻ em:</label>
                                                    <InputNumber
                                                        min={0}
                                                        max={30}
                                                        value={children}
                                                        onChange={handleChildrenChange}
                                                        style={{ flex: 1 }}
                                                    />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                    <label style={{ flex: 1 }}>Phòng:</label>
                                                    <InputNumber
                                                        min={1}
                                                        max={15}
                                                        value={rooms}
                                                        onChange={handleRoomsChange}
                                                        style={{ flex: 1 }}
                                                    />
                                                </div>
                                                <Button type="primary" style={{ width: '100%' }} onClick={handleDone}>Xong</Button>
                                            </div>
                                        )}
                                    >
                                        <Button style={{}} icon={<UserOutlined />} onClick={() => setShowDropdown(true)}>
                                            {`${adults} người lớn - ${children} trẻ em - ${rooms} phòng`}
                                        </Button>
                                    </Select>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <Button onClick={handleSearch} type="primary" icon={<SearchOutlined />} iconPosition={position}>
                                        Thay đổi tìm kiếm
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <RoomTypesTable roomTypes={roomTypes} />
                        </div>
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