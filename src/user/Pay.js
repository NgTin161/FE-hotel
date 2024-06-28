import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Checkbox, Flex, Input, Col, Row } from 'antd';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};
const Pay = () => {
    const pays = () => {
        // Hiển thị thông báo thành công
        swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Thanh toán thành công!',
        });
    };
    return (
        <>

            < div className=''>

                <div className='Payments '>
                    <div>
                        <Flex vertical gap={12}>
                            <label >Họ và Tên khách hàng: </label>
                            <Input placeholder="" />
                        </Flex>
                        <Flex vertical gap={12}>
                            <label >Địa chỉ email: </label>
                            <Input placeholder="" />
                        </Flex>
                        <Flex vertical gap={12}>
                            <label >Số điện thoại: </label>
                            <Input type='number' placeholder="" />
                        </Flex>
                        <div style={{ marginTop: 30, }}>
                            <h5 style={{ fontWeight: 'bold', marginBottom: 12, }}>Chọn phương thức thanh toán </h5>
                            <div className='booking3'>
                                <div className='momo'>
                                    <Checkbox onChange={onChange}></Checkbox>
                                </div>
                                <div className='vnpay'>
                                    <Checkbox onChange={onChange}></Checkbox>
                                </div>
                            </div>
                        </div>
                        {/* <Link class="btn-payment"  to='/Pay'>THANH TOÁN</Link> */}
                        <button class="btn-payment" onClick={pays}>
                            THANH TOÁN
                        </button>
                    </div>
                    <div class="containerpay">



                        <div class="content">

                            <div class="info">Nhận phòng: 15/06/2024</div>

                            <div class="info">Trả phòng: 17/06/2024</div>



                            <div class="label" style={{ fontWeight: 'bold', }}>Chi tiết:</div>

                            <div className='value'>
                                <div class="" >Tổng thời gian lưu trú: 2 đêm</div>

                                <div class="" >Số người: 3 người</div>


                                <div class="">Phòng đôi x 2 phòng</div>

                                <div class="">Phòng đơn x 1 phòng</div>

                            </div>


                            <div class="details">

                                <div class="label">Giảm giá:</div>
                                <input type="text" placeholder="Nhập mã giảm giá:" />

                            </div>
                            <div class="footerpay">

                                <div class="total">Tổng cộng: 1.991.000 ₫</div>

                                <button class="buttongui">Gửi</button>

                            </div>
                        </div>




                    </div>


                    <div>

                    </div>
                </div>
            </div>

        </>
    )
};
export default Pay;