import React from 'react';
import { DatePicker } from 'antd'; // Giả sử bạn đang sử dụng Ant Design cho DatePicker
const { RangePicker } = DatePicker;

const hotels = [
    {
        id: 1,
        image: '../asset/images/hotel.jpg',
        name: 'The Song Black',
        rating: '5.7',
        features: [
            { icon: 'fa-map-pin', label: 'KHU VỰC:' },
            { icon: 'fa-location-dot', label: 'ĐỊA CHỈ:' },
            { icon: 'fa-hand-holding-dollar', label: 'GIÁ:' },
            { icon: 'fa-phone', label: 'SĐT:' }
        ],
        contact: {
            img: 'https://i.imgur.com/5r09Y4G.png',
            name: 'Brenda W. Jensen',
            role: 'CEO & Founder',
            phoneIcon: 'https://i.imgur.com/5r09Y4G.png',
            phone: '+256 21458.2146'
        }
    },
    {
        id: 2,
        image: '../asset/images/hotel.jpg',
        name: 'The Song Black',
        rating: '5.7',
        features: [
            { icon: 'fa-map-pin', label: 'KHU VỰC:' },
            { icon: 'fa-location-dot', label: 'ĐỊA CHỈ:' },
            { icon: 'fa-hand-holding-dollar', label: 'GIÁ:' },
            { icon: 'fa-phone', label: 'SĐT:' }
        ],
        contact: {
            img: 'https://i.imgur.com/5r09Y4G.png',
            name: 'Brenda W. Jensen',
            role: 'CEO & Founder',
            phoneIcon: 'https://i.imgur.com/5r09Y4G.png',
            phone: '+256 21458.2146'
        }
    },
    // Thêm các đối tượng khác nếu cần
];

const dateFormat = 'YYYY/MM/DD'; // Định dạng ngày tháng
const disabledDate = (current) => {
    // Disable past dates
    return current && current < Date.now();
};

const handleDateChange = (dates) => {
    console.log(dates);
};

const ListFilter = () => {
    return (
        <>
            {hotels.map((hotel) => (
                <div key={hotel.id} className="containerFilter">
                    <div className="image-containerfilter">
                        <img src={hotel.image} alt={hotel.name} />
                    </div>

                    <div className="content-container">
                        <h1 className="headerfilter">{hotel.name}</h1>
                        <p className="descriptionFilter">{hotel.rating}</p>

                        <ul className="features">
                            {hotel.features.map((feature, index) => (
                                <li key={index}>
                                    <i className={`fa-solid ${feature.icon}`}></i> {feature.label}
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: 20 }}>
                            <RangePicker
                                style={{ paddingLeft: 30 }}
                                format={dateFormat}
                                placeholder={['Ngày đến', 'Ngày đi']}
                                disabledDate={disabledDate}
                                onChange={handleDateChange}
                            />
                        </div>

                        <div className="contactFilter">
                            <div className="contact-info">
                                <img src={hotel.contact.img} alt={hotel.contact.name} />
                                <p>
                                    {hotel.contact.name}
                                    <br />
                                    {hotel.contact.role}
                                </p>
                            </div>

                            <div className="phone-number">
                                <img src={hotel.contact.phoneIcon} alt="Phone Icon" />
                                <p>
                                    Call us anytime
                                    <br />
                                    {hotel.contact.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListFilter;










// import React, { useState, useEffect } from 'react';
// import { DatePicker } from 'antd';
// import './antd.css'; 
// const { RangePicker } = DatePicker;

// const dateFormat = 'YYYY/MM/DD'; 
// const apiUrl = 'https://api.example.com/hotels'; 

// const ListFilter = () => {
//     const [hotels, setHotels] = useState([]);

//     // Function to fetch data from API
//     const fetchHotels = async () => {
//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setHotels(data); 
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchHotels();
//     }, []); 

//     const disabledDate = (current) => {
       
//         return current && current < Date.now();
//     };

//     const handleDateChange = (dates) => {
//         console.log(dates);
//     };

//     return (
//         <>
//             {hotels.map((hotel) => (
//                 <div key={hotel.id} className="containerFilter">
//                     <div className="image-containerfilter">
//                         <img src={hotel.ImageUrl} alt={hotel.name} />
//                     </div>

//                     <div className="content-container">
//                         <h1 className="headerfilter">{hotel.HotelName}</h1>
//                         <p className="descriptionFilter">{hotel.RatingStarts}</p>

                        
//                         <ul class="features">
//                             <li><i class="fa-solid fa-map-pin"></i> KHU VỰC: {hotel.Province} </li>

//                             <li><i class="fa-solid fa-location-dot"></i> ĐỊA CHỈ: {hotel.Address}</li>

//                             <li><i class="fa-solid fa-hand-holding-dollar"></i> GIÁ: {hotel.Price}</li>

//                             <li><i class="fa-solid fa-phone"></i> SĐT: {hotel.PhoneNumber}</li>
//                         </ul>

//                         <div style={{ marginTop: 20 }}>
//                             <RangePicker
//                                 style={{ paddingLeft: 30 }}
//                                 format={dateFormat}
//                                 placeholder={['Ngày đến', 'Ngày đi']}
//                                 disabledDate={disabledDate}
//                                 onChange={handleDateChange}
//                             />
//                         </div>

//                         <div className="contactFilter">
//                             <div className="contact-info">
//                                 <img src={hotel.contact.img} alt={hotel.contact.name} />
//                                 <p>
//                                     {hotel.contact.name}
//                                     <br />
//                                     {hotel.contact.role}
//                                 </p>
//                             </div>

//                             <div className="phone-number">
//                                 <img src={hotel.contact.phoneIcon} alt="Phone Icon" />
//                                 <p>
//                                     Call us anytime
//                                     <br />
//                                     {hotel.contact.phone}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default ListFilter;
