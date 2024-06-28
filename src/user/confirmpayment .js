import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Header from './Header';
import Footer from './Footer';
const Confirmpayment = () => {

    return (
        <>
            <div className='paymentheader'>
                <div style={{  textAlign: 'center', justifyContent: 'center',display:'grid',top:20, }}>
                    <img src='../asset1/images/logo.jpg' alt="Card image" style={{ width: 230, height: 150,}} />

                </div>
            </div>
            <div class="containerPayment">
                <div class="success-icon">&#10004;</div>
                <h2 class="success-message">Thanh toán thành công</h2>
                <p class="success-message">Vui lòng kiểm tra email để xem chi tiết đơn hàng</p>
                <h2>Biên nhận</h2>
                <table className='tablePayment'>
                    <tr>
                        <th>Mã hóa đơn</th>
                        <td>37217</td>
                    </tr>
                    <tr>
                        <th>Mã đặt phòng</th>
                        <td>90019</td>
                    </tr>
                    <tr>
                        <th>Họ và tên</th>
                        <td>Abc</td>
                    </tr>
                    <tr>
                        <td class="total">Total</td>
                        <td class="total">1338,000</td>
                    </tr>
                </table>
                <button class="buttonPayment"><i class="home-icon"></i>Back to Home</button>
            </div>
            <Footer />
        </>

    );
};
export default Confirmpayment;