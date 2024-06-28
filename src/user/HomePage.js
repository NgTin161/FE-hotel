import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPerson, faHouse } from '@fortawesome/free-solid-svg-icons';
import { InputNumber, DatePicker, Dropdown, Menu, Button, AutoComplete } from 'antd';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import dayjs from 'dayjs';
import axios from 'axios';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { useRef } from 'react';

dayjs.locale('vi');

const { RangePicker } = DatePicker;

const HomePage = () => {
    const navigate = useNavigate(); // Use useNavigate hook to access navigate function


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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                const data = response.data.data;
                setDataFromApi(data);
                setOptions(data.map(item => ({ value: item.full_name, label: item.full_name })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDone = () => {
        setAdults(tempAdults);
        setChildren(tempChildren);
        setRooms(tempRooms);
        // Perform any other actions needed on submission
    };

    const dateFormat = 'DD/MM/YYYY';

    const handleDateChange = (dates, dateStrings) => {
        if (dateStrings[0] && dateStrings[1]) {
            const fromDate = dayjs(dateStrings[0], dateFormat).format('YYYY-MM-DD');
            const toDate = dayjs(dateStrings[1], dateFormat).format('YYYY-MM-DD');
            setCheckIn(fromDate);
            setCheckOut(toDate);
            // Additional logic for sending fromDate and toDate to backend
        }
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
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

        console.log(`/filter?${queryString}`);
        navigate(`/filter?${queryString}`); // Navigate to '/filter' with the generated query string
    };

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

    return (
        <div className='Container-Onlet'>
            <div className='Onlet-body'>
                <div className='onlet-text'>
                    <span className='spanstart'>
                        <h1 style={{ marginTop: 50, marginBottom: 10 }}>DU LỊCH, TRẢI NGHIỆM VÀ THƯ GIẢN CÙNG CASA</h1>
                        <i>------------------------</i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i>------------------------</i>
                        <p style={{ color: 'white', marginTop: 20 }}>Tiện ích tức thời  - Không mất phí</p>
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='containerSearch'>
                        <div style={{ marginTop: 20 }}>
                            <AutoComplete
                                style={{ width: 200, borderRadius: '40px' }}
                                options={options}
                                onSelect={handleAutoCompleteSelect}
                                onSearch={handleAutoCompleteSearch}
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
                                <Button style={{}} icon={<UserOutlined />}>
                                    {adults} người lớn - {children} trẻ em - {rooms} phòng
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="icon-container">
                            <Button type="primary" onClick={handleSearch}>

                                <i style={{ color: 'white' }} className="fa-solid fa-magnifying-glass"></i>

                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Onlet-list'>


                <div className='welcome'>
                    <div className='row'>
                        <div className='col-sm-6 LearnMore' style={{ marginTop: 30 }}>
                            <h3>
                                WELCOME TO <a style={{ fontWeight: 'bold' }}>CASA Booking</a>
                            </h3>
                            <p>---------------------------------</p>
                            <h4>
                                LUXURY Resort & Room
                                <br />
                                <br />
                            </h4>
                            <h6 style={{ color: 'black', lineHeight: 2, marginLeft: 30, }}>
                                Trang web Booking CASA là một nền tảng trực tuyến tiên tiến, chuyên cung cấp dịch vụ đặt phòng và thuê nhà cho khách du lịch trên toàn thế giới. Với giao diện thân thiện và dễ sử dụng, người dùng có thể dễ dàng tìm kiếm và lựa chọn các loại hình lưu trú từ căn hộ, biệt thự đến nhà nghỉ và homestay. CASA Booking nổi bật với hệ thống đánh giá minh bạch, giúp người dùng có được cái nhìn khách quan và chính xác về chất lượng dịch vụ. Ngoài ra, trang web còn cung cấp nhiều ưu đãi hấp dẫn và dịch vụ hỗ trợ khách hàng 24/7, đảm bảo mang đến cho người dùng những trải nghiệm du lịch tuyệt vời và đáng nhớ.
                                <p style={{ color: 'black', lineHeight: 4, }} >Chúng tôi rất vui khi được mang đến trải nghiệm tốt nhất cho bạn!</p>
                            </h6>

                        </div>
                        <div className='col-sm-6 ' style={{ display: 'flex' }}>

                            <div className='col-sm-3'>
                                <img class="moving-image" src='../asset/images/1.jpg' style={{ width: 150, height: 300, marginTop: 30, }} />

                            </div>
                            <div className='col-sm-3'>
                                <img class="moving-imageDif" src='../asset/images/2.jpg' style={{ width: 150, height: 360 }} />
                            </div>
                            <div className='col-sm-3'>
                                <img class="moving-image" src='../asset/images/3.jpg' style={{ width: 150, height: 300, marginTop: 30, }} />
                            </div>

                        </div>

                    </div>
                </div>
                <div className='TOP3' style={{ marginTop: 40, color: 'black', fontWeight: 'bold' }}>
                    <h5 style={{ marginLeft: 30, }}>
                        <Link to='/Details'>ĐANG THỊNH HÀNH <i style={{ color: 'red', marginBottom: 30, }} class="fa-solid fa-fire"></i>
                        </Link>
                        <Link to='/Details' style={{ float: 'right' }}>xem thêm <i class="fa-solid fa-arrow-right"></i>
                        </Link>
                    </h5>
                    <div class="containerTrend">
                        <div class="card" >
                            <img class="card-img-top" src='../asset/images/ks1.jpg' alt="Card image" />
                            <div class="card-body" style={{ lineHeight: 2, }}>
                                <h5 class="card-title" style={{ fontWeight: 'bold' }}>Khách sạn Mường Thanh Hội An</h5>
                                <i class="fa-solid fa-map-pin"> <span>Hội An</span></i>
                                <div >
                                    <i class="fas fa-star bg-yellow-500 "></i>
                                    <i class="fas fa-star bg-yellow-500"></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <div className='sale'>
                                    <div className='rateCard'>
                                        <a href='#'>
                                            5.5
                                        </a>
                                    </div>
                                    <div >
                                        <span class="price-strikethrough">1.990.000 đ</span>
                                        <h3 >990.000 đ</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card" >
                            <img class="card-img-top" src='../asset/images/ks2.jpg' alt="Card image" />
                            <div class="card-body" style={{ lineHeight: 2, }}>
                                <h5 class="card-title" style={{ fontWeight: 'bold' }}>Khách sạn Pha Lê</h5>
                                <i class="fa-solid fa-map-pin"> <span>Vũng Tàu</span></i>
                                <div >
                                    <i class="fas fa-star bg-yellow-500 "></i>
                                    <i class="fas fa-star bg-yellow-500"></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star   "></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <div className='sale'>
                                    <div className='rateCard'>
                                        <a href='#'>
                                            5.0
                                        </a>
                                    </div>
                                    <div >
                                        <span class="price-strikethrough">590.000 đ</span>
                                        <h3 >490.000 đ</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card" >
                            <img class="card-img-top" src='../asset/images/ks3.jpg' alt="Card image" />
                            <div class="card-body" style={{ lineHeight: 2, }}>
                                <h5 class="card-title" style={{ fontWeight: 'bold' }}>Khách sạn The Song</h5>
                                <i class="fa-solid fa-map-pin"> <span>Vũng Tàu</span></i>
                                <div >
                                    <i class="fas fa-star bg-yellow-500 "></i>
                                    <i class="fas fa-star bg-yellow-500"></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star bg-yellow-500"></i>
                                </div>
                                <div className='sale'>
                                    <div className='rateCard'>
                                        <a href='#'>
                                            .6
                                        </a>
                                    </div>
                                    <div >
                                        <span class="price-strikethrough">520.000 đ</span>
                                        <h3 >390.000 đ</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card" >
                            <img class="card-img-top" src='../asset/images/ks4.jpg' alt="Card image" />
                            <div class="card-body" style={{ lineHeight: 2, }}>
                                <h5 class="card-title" style={{ fontWeight: 'bold' }}>The IMPERIAL Hotel</h5>
                                <i class="fa-solid fa-map-pin"> <span>Hội An</span></i>
                                <div >
                                    <i class="fas fa-star bg-yellow-500 "></i>
                                    <i class="fas fa-star bg-yellow-500"></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star  bg-yellow-500 "></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <div className='sale'>
                                    <div className='rateCard'>
                                        <a href='#'>
                                            7.5
                                        </a>
                                    </div>
                                    <div >
                                        <span class="price-strikethrough">990.000 đ</span>
                                        <h3 >790.000 đ</h3>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className='TOP3' style={{ top: 0, color: 'black', fontWeight: 'bold', marginBottom: 40, }}>
                    <h5 style={{ marginLeft: 30, }}><Link to='/Details'>ĐÃ QUAN TÂM GẦN ĐÂY</Link>
                        <Link to='/Details' style={{ float: 'right' }}>xem thêm <i class="fa-solid fa-arrow-right"></i>
                        </Link>
                    </h5>
                </div>
                <div className='room'>
                    <div class="card" >
                        <img class="card-img-top" src='../asset/images/ks1.jpg' alt="Card image" />
                        <div class="card-body" style={{ lineHeight: 2, }}>
                            <h5 class="card-title" style={{ fontWeight: 'bold' }}>Khách sạn Mường Thanh Hội An</h5>
                            <i class="fa-solid fa-map-pin"> <span>Hội An</span></i>
                            <div >
                                <i class="fas fa-star bg-yellow-500 "></i>
                                <i class="fas fa-star bg-yellow-500"></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <div className='sale'>
                                <div className='rateCard'>
                                    <a href='#'>
                                        5.5
                                    </a>
                                </div>
                                <div >
                                    <span class="price-strikethrough">1.990.000 đ</span>
                                    <h3 >990.000 đ</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" >
                        <img class="card-img-top" src='../asset/images/ks2.jpg' alt="Card image" />
                        <div class="card-body" style={{ lineHeight: 2, }}>
                            <h5 class="card-title" style={{ fontWeight: 'bold' }}>Khách sạn Pha Lê</h5>
                            <i class="fa-solid fa-map-pin"> <span>Vũng Tàu</span></i>
                            <div >
                                <i class="fas fa-star bg-yellow-500 "></i>
                                <i class="fas fa-star bg-yellow-500"></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star   "></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <div className='sale'>
                                <div className='rateCard'>
                                    <a href='#'>
                                        5.0
                                    </a>
                                </div>
                                <div >
                                    <span class="price-strikethrough">590.000 đ</span>
                                    <h3 >490.000 đ</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" >
                        <img class="card-img-top" src='../asset/images/ks3.jpg' alt="Card image" />
                        <div class="card-body" style={{ lineHeight: 2, }}>
                            <h5 class="card-title" style={{ fontWeight: 'bold' }}>Khách sạn The Song</h5>
                            <i class="fa-solid fa-map-pin"> <span>Vũng Tàu</span></i>
                            <div >
                                <i class="fas fa-star bg-yellow-500 "></i>
                                <i class="fas fa-star bg-yellow-500"></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star bg-yellow-500"></i>
                            </div>
                            <div className='sale'>
                                <div className='rateCard'>
                                    <a href='#'>
                                        .6
                                    </a>
                                </div>
                                <div >
                                    <span class="price-strikethrough">520.000 đ</span>
                                    <h3 >390.000 đ</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" >
                        <img class="card-img-top" src='../asset/images/ks4.jpg' alt="Card image" />
                        <div class="card-body" style={{ lineHeight: 2, }}>
                            <h5 class="card-title" style={{ fontWeight: 'bold' }}>The IMPERIAL Hotel</h5>
                            <i class="fa-solid fa-map-pin"> <span>Hội An</span></i>
                            <div >
                                <i class="fas fa-star bg-yellow-500 "></i>
                                <i class="fas fa-star bg-yellow-500"></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star  bg-yellow-500 "></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <div className='sale'>
                                <div className='rateCard'>
                                    <a href='#'>
                                        7.5
                                    </a>
                                </div>
                                <div >
                                    <span class="price-strikethrough">990.000 đ</span>
                                    <h3 >790.000 đ</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='blogs-back'>
                    <h3 style={{ marginLeft: 30, marginTop: 10, color: 'gray', fontWeight: 'bold', marginBottom: 40, fontSize: 50, }}>Blogs</h3>
                    <div className='container-blogs'>
                        <div class="itemBlogs " >
                            <div style={{ display: 'grid', marginTop: 25, }}>
                                <img className='pic-blogs' src='../asset/images/yp.jpg' alt="Card image" style={{ width: 300, height: 150, }} />
                            </div>
                            <div style={{ display: 'grid', marginTop: 30, }}>
                                <a style={{ color: 'black', fontWeight: 'bold' }}>Đến thành phố Hồ Chí Minh ta nên đi đâu ?</a>
                                <button class="styled-button-xemngay">Xem Ngay</button>
                            </div>

                        </div>
                        <div class="itemBlogs ">
                            <div style={{ display: 'grid', marginTop: 25, }}>
                                <img className='pic-blogs' src='../asset/images/tcv.jpg' alt="Card image" style={{ width: 300, height: 150, }} />
                            </div>
                            <div style={{ display: 'grid', marginTop: 30, }}>
                                <a style={{ color: 'black', fontWeight: 'bold' }}>thành phố Hồ Chí Minh có gì vui ?</a>
                                <button class="styled-button-xemngay">Xem Ngay</button>
                            </div>
                        </div>
                        <div class="itemBlogs ">
                            <div style={{ display: 'grid', marginTop: 25, }}>
                                <img className='pic-blogs' src='../asset/images/coffee.jpg' alt="Card image" style={{ width: 300, height: 150, }} />
                            </div>
                            <div style={{ display: 'grid', marginTop: 30, }}>
                                <a style={{ color: 'black', fontWeight: 'bold' }}>CheckIn coffee chill cùng các món thức uống mới ?</a>
                                <button class="styled-button-xemngay">Xem Ngay</button>
                            </div>
                        </div>
                        <div class="itemBlogs ">
                            <div style={{ display: 'grid', marginTop: 25, }}>
                                <img className='pic-blogs' src='../asset/images/ngon.jpg' alt="Card image" style={{ width: 300, height: 150, }} />
                            </div>
                            <div style={{ display: 'grid', marginTop: 30, }}>
                                <a style={{ color: 'black', fontWeight: 'bold' }}>Đến thành phố Hồ Chí Minh ta nên ăn gì ?</a>
                                <button class="styled-button-xemngay">Xem Ngay</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div >


    );
}

export default HomePage;
