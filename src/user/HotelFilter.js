import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AutoComplete, DatePicker, Dropdown, InputNumber, Menu, Select, Table, Slider, Checkbox, Button as AntButton, Row, Col, message, Button, Typography, Form, Card, Rate, Flex } from 'antd';
import { GlobalOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Option } from 'antd/es/mentions';
import moment from 'moment';
import Map from '../Components/Map';
import { axiosJson } from '../axios/axiosCustomize';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import SpinComponents from '../Components/Spin';
import { CiLocationOn } from 'react-icons/ci';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const urlDateFormat = 'YYYY-MM-DD';
const HotelFilter = () => {
    const navigate = useNavigate();

    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [options, setOptions] = useState([]);
    const [dataFromApi, setDataFromApi] = useState([]);



    const [checkinDate, setCheckInDate] = useState(null);
    const [checkoutDate, setCheckOutDate] = useState(null);
    const [province, setProvince] = useState(null);
    // Temporary state for dropdown menu


    // const [checkInParam, setCheckInParam] = useState();
    // const [checkOutParam, setCheckOutParam] = useState();




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
                const province = urlParams.get('province');
                setProvince(province.replace('+', ' '))

                const checkIn = urlParams.get('checkinDate');
                const checkOut = urlParams.get('checkoutDate');
                setCheckInDate(checkIn);
                setCheckOutDate(checkOut);

                const numberOfAdults = urlParams.get('numberOfAdults');
                setAdults(numberOfAdults);
                const numberOfChildren = urlParams.get('numberOfChildren');
                setChildren(numberOfChildren);
                const numberOfRooms = urlParams.get('numberOfRooms');
                setRooms(numberOfRooms);
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
        // Đảm bảo numberOfChildren là số và không phải undefined
        const numberOfChildren = typeof children === 'number' ? children : 0;
        console.log('numberOfChildren:', numberOfChildren);

        const queryParams = {
            province: province,
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            numberOfAdults: adults,
            numberOfChildren: numberOfChildren,
            numberOfRooms: rooms,
        };

        // Tạo query string từ queryParams
        const queryString = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');

        const url = `/filter?${queryString}`;
        console.log(url);

        // Mở trang trong một tab mới
        window.open(url, '_blank');
    };


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



    const [showDropdown, setShowDropdown] = useState(false);


    const handleSelectChange = (value, option) => {

        setProvince(option.label);
    };

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

    const [loading, setLoading] = useState(false);

    /* XẾP GIÁ TIỀN */
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className='row' style={{ top: '-60px' }}>
                <div className='containerSearch' style={{ width: '910px' }}>
                    <div style={{ marginTop: 20 }}>
                        <Select
                            value={province}
                            showSearch
                            style={{ width: 250 }}
                            placeholder={
                                <div style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 'normal', color: 'gray' }}>
                                    <CiLocationOn style={{ fontSize: 20, marginTop: 5, marginRight: 8 }} />
                                    Bạn muốn đến đâu ?
                                </div>
                            }
                            optionFilterProp="label"
                            loading={loading}
                            filterOption={(input, option) =>
                                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={handleSelectChange} // Xử lý khi người dùng chọn một lựa chọn
                        >
                            {dataFromApi.map((province) => (
                                <Option key={province.id} value={province.full_name} label={province.full_name}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <CiLocationOn style={{ marginRight: 8 }} />
                                        <span>{province.full_name}</span>
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>
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
                            style={{ width: 250 }}
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
                                            changeOnWheel
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
                                            changeOnWheel
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
                                            changeOnWheel
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
                    <div style={{ marginTop: 15 }}>
                        <Button style={{ width: 40, height: 40 }} onClick={handleSearch} type="primary" shape="circle" icon={<SearchOutlined />} />
                    </div>
                </div>
            </div>
            <div className='container-filterList'>
                <div className="filter-sidebarLeft" style={{ width: 340, }}>

                    <div className='map-filter' style={{ marginBottom: -70, }}>
                        <Map hotelData={hotelData} />
                    </div>
                    <div className='selectFilter'>
                        <Select
                            defaultValue="chọn"
                            style={{
                                width: 200,
                                marginTop:80,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    label: <span>manager</span>,
                                    title: 'manager',
                                    options: [
                                        {
                                            label: <span>Xếp theo giá cao nhất</span>,
                                            value: 'Jack',
                                        },
                                        {
                                            label: <span>Xếp theo giá thấp nhất</span>,
                                            value: 'Lucy',
                                        },
                                    ],
                                },
                                
                            ]}
                        />


                        
                    </div>
                    <div style={{ padding: '10px', top: 10 }}>
                        <p style={{ fontWeight: 'bold', color: 'black' }}>Giá tiền của bạn từ</p>
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
                        {checkinDate ? moment(checkinDate).format('DD-MM-YY') : 'không có ngày'} đến{' '}
                        {checkoutDate ? moment(checkoutDate).format('DD-MM-YY') : 'không có ngày'}
                    </h3>

                    <div  >
                        {filteredHotels?.length > 0 ? (
                            filteredHotels?.map((hotel) => (
                                <Col key={hotel.id} span={8} >
                                    <Link
                                        to={{
                                            pathname: `/detail/${hotel.id}`,
                                            search: queryString.stringify({
                                                checkinDate: checkinDate,
                                                checkoutDate: checkoutDate,
                                                numberOfAdults: adults,
                                                numberOfChildren: children,
                                                numberOfRooms: rooms
                                                // Add more query parameters as needed
                                            }),
                                        }}
                                    >

                                        <Card className='cardFiltercontainer' style={{ width: 825,marginBottom:20, }}>
                                            <div className='image-container'>
                                                <img src='../asset/images/luxury.jpg' />
                                            </div>
                                            <div className='' style={{ marginTop: -400, }} >
                                                <p style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>{hotel.hotelName}</p>
                                                <p> <Rate disabled defaultValue={hotel.ratingStarts} /></p>
                                                <p><i className="fa-solid fa-map-location-dot"></i> {hotel.address}</p>
                                                <div className='CardFilterBox'>
                                                    <div className='CardFilterLeft'>
                                                        <li>
                                                            <p>Chấp nhận trẻ em: {hotel.acceptChildren ? 'Có' : 'Không'}</p>
                                                        </li>
                                                        <li><p>Chấp nhận thú cưng: {hotel.acceptPet ? 'Có' : 'Không'}</p></li>
                                                        <li><p>Hỗ trợ người khuyết tật: {hotel.supportPeopleWithDisabilities ? 'Có' : 'Không'}</p></li>
                                                        <li><p>Có thang máy: {hotel.haveElevator ? 'Có' : 'Không'}</p></li>
                                                        <li><p>Có hồ bơi: {hotel.haveSwimmingPool ? 'Có' : 'Không'}</p></li>
                                                    </div>
                                                    <div className='CardFilterBoxRight'>
                                                        <p>Giá: {hotel.price.toLocaleString()} VND</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>


                                    </Link>
                                </Col>
                            ))
                        ) : (
                                <SpinComponents />
                                
                        )}

                    </div>




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