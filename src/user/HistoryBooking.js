import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Footer from './Footer';
const items = [
    {
        key: '1',
        icon: <MailOutlined />,
        label: 'Chỉnh Sửa ',
        children: [
            {
                key: '11',
                label: 'Option 1',
            },
            {
                key: '12',
                label: 'Option 2',
            },
            {
                key: '13',
                label: 'Option 3',
            },
            {
                key: '14',
                label: 'Option 4',
            },
        ],
    }];
const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items);
const HistoryBooking = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <>
            <div class="containerHistory ">
                <div class="headerHistory">

                    <h1>Thông tin khách sạn đã đặt</h1>
                </div>
                <div class="searchHistory">
                    <input type="text" placeholder="Search by name, phone number..." />
                    <button>Search</button>
                </div>
                <div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['231']}
                        openKeys={stateOpenKeys}
                        onOpenChange={onOpenChange}
                        style={{
                            width: 256,
                        }}
                        items={items}
                    />
                </div>
                <table className='tableHistory '>


                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First and last name</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>Room Type</th>
                            <th>Room</th>
                            <th>Room Price</th>
                            <th>Checkin Date</th>
                            <th>Checkout Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>hpvodanh</td>
                            <td>1233333</td>
                            <td>hpvodanh030@gmail.com</td>
                            <td>Normal</td>
                            <td>101</td>
                            <td>300.0$</td>
                            <td>09:31 - 6/1/2021</td>
                            <td>Unpaid</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Phạm Nguyên</td>
                            <td>1233333</td>
                            <td></td>
                            <td>Normal</td>
                            <td>103</td>
                            <td>380.0$</td>
                            <td>09:30 - 6/1/2021</td>
                            <td>Unpaid</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Phạm Nguyên</td>
                            <td>1233333</td>
                            <td>hpvodanh030@gmail.com</td>
                            <td>Normal</td>
                            <td>102</td>
                            <td>350.0$</td>
                            <td>09:28 - 6/1/2021</td>
                            <td>09:28 - 6/1/2021</td>
                        </tr>
                    </tbody>

                </table>

                <div class="paginationHistory">
                    <button>First page</button>
                    <button>Last page</button>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default HistoryBooking;
