import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AutoComplete, DatePicker, Dropdown, InputNumber, Menu, Select, Table, Slider, Checkbox, Button as AntButton, Row, Col, message, Button, Typography, Form, Card } from 'antd';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import moment from 'moment';
import Map from '../Components/Map';
import ListFilter from './ListFilter';
import { axiosJson } from '../axios/axiosCustomize';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import SpinComponents from '../Components/Spin';


const dateFormat = 'DD-MM-YYYY';
const { RangePicker } = DatePicker;

dayjs.locale('vi');

const HotelFilter = () => {
    const navigate = useNavigate();

    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [options, setOptions] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);


    const [checkinDate, setCheckIn] = useState();
    const [checkoutDate, setCheckOut] = useState();
    const [province, setProvince] = useState(null);
    // Temporary state for dropdown menu
    const [tempAdults, setTempAdults] = useState(adults);
    const [tempChildren, setTempChildren] = useState(children);
    const [tempRooms, setTempRooms] = useState(rooms);


    const [provinceParam, setProvinceParam] = useState();
    const [checkInParam, setCheckInParam] = useState();
    const [checkOutParam, setCheckOutParam] = useState();
    const [numberOfRoomParam, setNumberOfRoomParam] = useState();
    const [numberOfAdultsParam, setNumberOfAdultsParam] = useState();
    const [numberOfChilderenParam, setNumberOfChildrenParam] = useState()
    const handleAutoCompleteSearch = (searchText) => {
        const filteredOptions = dataFromApi.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setOptions(filteredOptions.map(item => ({ value: item.full_name, label: item.full_name })));
    };

    const handleAutoCompleteSelect = (value) => {
        setProvince(value);
        // console.log('AutoComplete selected:', value);
    };

    const [hotelData, setHotelData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                const data = response.data.data;
                setDataFromApi(data);
                setOptions(data.map(item => ({ value: item.full_name, label: item.full_name })));

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                // Lấy các giá trị từ query params
                const province = urlParams.get('province');
                setProvince(province.replace('+', ' '))
                const checkIn = urlParams.get('checkinDate');
                const checkOut = urlParams.get('checkoutDate');
                setCheckInParam(checkIn);
                setCheckOutParam(checkOut);

                const numberOfAdults = urlParams.get('numberOfAdults');
                setNumberOfAdultsParam(numberOfAdults);
                const numberOfChildren = urlParams.get('numberOfChildren');
                setNumberOfChildrenParam(numberOfChildren);
                const numberOfRooms = urlParams.get('numberOfRooms');
                setNumberOfRoomParam(numberOfRooms);
                console.log('Province:', province);
                console.log('Checkin Date:', checkIn);
                console.log('Checkout Date:', checkOut);
                console.log('Number of Adults:', numberOfAdults);
                console.log('Number of Children:', numberOfChildren);
                console.log('Number of Rooms:', numberOfRooms);
                const responseHotelData = await axiosJson.get(`/Hotels/getavailablehotel?province=${province}&checkinDate=${checkIn}&checkoutDate=${checkOut}&numberOfAdults=${numberOfAdults}&numberOfChildren=${numberOfChildren}&numberOfRooms=${numberOfRooms}`);
                setHotelData(responseHotelData.data);
                console.log('Data:', responseHotelData.data);
                // Xử lý dữ liệu nhận được ở đây (nếu cần)
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi ở đây (nếu cần)
            }
        };

        fetchData();
    }, []);




    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const handleDateChange = (dates, dateStrings) => {
        if (dateStrings[0] && dateStrings[1]) {
            const fromDate = moment(dateStrings[0], dateFormat).format('YYYY-MM-DD');
            const toDate = moment(dateStrings[1], dateFormat).format('YYYY-MM-DD');
            setCheckIn(fromDate);
            setCheckOut(toDate);
        }
    };

    const handleResetDates = () => {
        setCheckIn(null);
        setCheckOut(null);
    };
    const handleDone = () => {
        setAdults(tempAdults);
        setChildren(tempChildren);
        setRooms(tempRooms);
    };



    const handleInputNumberClick = e => {
        // Prevent Dropdown from closing when clicking on InputNumber
        e.stopPropagation();
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
                        // onPressEnter={() => { }}
                        onClick={handleInputNumberClick}
                        changeOnWheel
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
                        // onPressEnter={() => { }}
                        onClick={handleInputNumberClick}
                        changeOnWheel
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
                        // onPressEnter={() => { }}
                        onClick={handleInputNumberClick}
                        changeOnWheel
                    />
                </div>
            </Menu.Item>
            <Menu.Item key="4">
                <Button type="primary" style={{ width: '100%' }} onClick={handleDone}>Xong</Button>
            </Menu.Item>
        </Menu>
    )

    // const handleSearch = () => {
    //     // Đảm bảo numberOfChildren là số và không phải undefined
    //     const numberOfChildren = typeof children === 'number' ? children : 0;
    //     console.log('numberOfChildren:', numberOfChildren);

    //     const queryParams = {
    //         province: province,
    //         checkinDate: checkinDate,
    //         checkoutDate: checkoutDate,
    //         numberOfAdults: adults,
    //         numberOfChildren: numberOfChildren,
    //         numberOfRooms: rooms,
    //     };

    //     // Tạo query string từ queryParams
    //     const queryString = Object.keys(queryParams)
    //         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    //         .join('&');

    //     console.log(`/filter?${queryString}`);
    //     navigate(`/filter?${queryString}`); // Navigate to '/filter' with the generated query string
    // };


    const [priceRange, setPriceRange] = useState([100000, 2000000]);
    const [filters, setFilters] = useState({
        acceptChildren: false,
        acceptPet: false,
        supportPeopleWithDisabilities: false,
        haveElevator: false,
        haveSwimmingPool: false,
        ratingStarts: Array(5).fill(false), // Array for 5 stars
    });

    const filteredHotels = hotelData.filter((hotel) => {
        return (
            hotel.price >= priceRange[0] &&
            hotel.price <= priceRange[1] &&
            (filters.ratingStarts.every((checked, index) => !checked) || filters.ratingStarts[hotel.ratingStarts - 1]) &&
            (!filters.acceptChildren || hotel.acceptChildren) &&
            (!filters.acceptPet || hotel.acceptPet) &&
            (!filters.supportPeopleWithDisabilities || hotel.supportPeopleWithDisabilities) &&
            (!filters.haveElevator || hotel.haveElevator) &&
            (!filters.haveSwimmingPool || hotel.haveSwimmingPool)
        );
    });
    const handlePriceChange = (value) => {
        setPriceRange(value);
    };
    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.checked,
        });
    };

    const handleRatingChange = (index) => {
        const newRatingStars = filters.ratingStarts.map((checked, i) => (i === index ? !checked : checked));
        setFilters({
            ...filters,
            ratingStarts: newRatingStars,
        });
    };


    return (
        <>
            <div className='row' style={{ top: '-60px' }}>
                <div className='containerSearch' style={{ width: '950px' }}>
                    <div style={{ marginTop: 20 }}>
                        <AutoComplete
                            defaultValue={province}
                            options={options}
                            onSelect={handleAutoCompleteSelect}
                            onSearch={handleAutoCompleteSearch}
                            style={{ width: 200, borderRadius: '40px' }}
                            placeholder={<span style={{ fontWeight: 'normal', color: 'gray' }}>Bạn muốn đến đâu?</span>}
                            prefix={<GlobalOutlined />}
                        />
                    </div>
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
                            <AntButton icon={<UserOutlined />}>
                                {adults} người lớn - {children} trẻ em - {rooms} phòng
                            </AntButton>
                        </Dropdown>
                    </div>
                    <div className="icon-container">
                        <AntButton type="primary">
                            <FontAwesomeIcon icon={faSearch} style={{ color: 'white' }} />
                        </AntButton>
                    </div>
                </div>
            </div>
            <div className='container-filterList'>
                <div className="filter-sidebar" style={{ height: 650, width: 340, }}>

                    <button className='clear-button ' >X</button>

                    <div className='map-filter' style={{ marginBottom: -70, }}>
                        <Map hotelData={hotelData} />
                    </div>

                    <div style={{ padding: '10px', marginTop: 0 }}>
                        <p style={{ fontWeight: 'bold', color: 'black' }}>Giá tiền của bạn</p>
                        <Slider
                            range
                            value={priceRange}
                            onChange={handlePriceChange}
                            defaultValue={[100000, 2000000]}
                            min={100000}
                            max={2000000}
                        />
                        <hr></hr>
                        <Typography variant="body" color="textSecondary">Từ: {priceRange[0].toLocaleString()} VND - Đến: {priceRange[1].toLocaleString()} VND</Typography>
                        <p style={{ fontWeight: 'bold', color: 'black' }}>Dịch vụ chung của khách sạn:</p>
                        <Checkbox name="acceptChildren" checked={filters.acceptChildren} onChange={handleFilterChange} >Chấp nhận trẻ em</Checkbox>
                        <Checkbox name="acceptPet" checked={filters.acceptPet} onChange={handleFilterChange}>Chấp nhận thú cưng </Checkbox>
                        <Checkbox name="supportPeopleWithDisabilities" checked={filters.supportPeopleWithDisabilities} onChange={handleFilterChange}>Hỗ trợ người khuyết tật</Checkbox><br />
                        <Checkbox checked={filters.haveElevator} onChange={handleFilterChange} name="haveElevator" >Có thang máy</Checkbox>
                        <br />
                        <Checkbox checked={filters.haveSwimmingPool} onChange={handleFilterChange} name="haveSwimmingPool">Có hồ bơi</Checkbox>

                        <p style={{ fontWeight: 'bold', color: 'black' }}>Số sao</p>

                        {[...Array(5)].map((_, index) => (
                            <Form.Item key={index}>
                                <Checkbox
                                    checked={filters.ratingStarts[index]}
                                    onChange={() => handleRatingChange(index)}
                                >
                                    {`${index + 1} sao`} <i className="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                                </Checkbox>
                            </Form.Item>
                        ))}
                    </div>

                </div>
                <div className="filter-listCard">
                    <h3>
                        Có {filteredHotels.length} khách sạn từ ngày{' '}
                        {checkInParam ? moment(checkInParam).format('DD-MM-YY') : 'không có ngày'} đến{' '}
                        {checkOutParam ? moment(checkOutParam).format('DD-MM-YY') : 'không có ngày'}
                    </h3>

                    {filteredHotels?.length > 0 ? (
                        filteredHotels?.map((hotel) => (
                            <Col key={hotel.id} span={8}>
                                <Link
                                    to={{
                                        pathname: `/detail/${hotel.id}`,
                                        search: queryString.stringify({
                                            checkinDate: checkInParam,
                                            checkoutDate: checkOutParam,
                                            numberOfAdults: numberOfAdultsParam,
                                            numberOfChildren: numberOfChilderenParam,
                                            numberOfRooms: numberOfRoomParam
                                            // Add more query parameters as needed
                                        }),
                                    }}
                                >
                                    <Card title={hotel.name}>
                                        <p>Giá: {hotel.price.toLocaleString()} VND</p>
                                        <p>Số sao: {hotel.ratingStarts}</p>
                                        <p>Chấp nhận trẻ em: {hotel.acceptChildren ? 'Có' : 'Không'}</p>
                                        <p>Chấp nhận thú cưng: {hotel.acceptPet ? 'Có' : 'Không'}</p>
                                        <p>Hỗ trợ người khuyết tật: {hotel.supportPeopleWithDisabilities ? 'Có' : 'Không'}</p>
                                        <p>Có thang máy: {hotel.haveElevator ? 'Có' : 'Không'}</p>
                                        <p>Có hồ bơi: {hotel.haveSwimmingPool ? 'Có' : 'Không'}</p>
                                    </Card>
                                </Link>
                            </Col>
                        ))
                    ) : (
                        <SpinComponents />
                    )}




                </div>

            </div>

        </>
    );
};

export default HotelFilter;

const hotels = [
    // Dữ liệu giả lập
    { id: 1, name: 'Hotel A', price: 1500000, ratingStars: 4, acceptChildren: true, acceptPet: false, supportPeopleWithDisabilities: true, haveElevator: true, haveSwimmingPool: true },
    { id: 2, name: 'Hotel B', price: 1000000, ratingStars: 3, acceptChildren: true, acceptPet: true, supportPeopleWithDisabilities: false, haveElevator: false, haveSwimmingPool: false },
    // Thêm dữ liệu khách sạn khác
];