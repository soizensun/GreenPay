import React, { useState } from 'react'
import MainLayout from "../layouts/MainLayout";
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

export default function ShopManagement() {
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (e, { name }) => setActiveItem(name)


    return (
        <MainLayout>
            <Menu vertical size='huge' style={{ fontFamily: 'Prompt', width: "200px", textAlign: "center" }}>

                <Menu.Item>
                    สินค้า
                    <Menu.Menu>
                        <Menu.Item
                            name='search'
                            active={activeItem === 'search'}
                            onClick={handleItemClick}
                        >
                            สินค้าของฉัน
                         </Menu.Item>
                        <Menu.Item
                            name='add'
                            active={activeItem === 'add'}
                            onClick={handleItemClick}
                        >
                            เพิ่มสินค้าใหม่
                        </Menu.Item>

                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    คำสั่งซื้อ
                    <Menu.Menu>
                        <Menu.Item
                            name='search'
                            active={activeItem === 'search'}
                            onClick={handleItemClick}
                        >
                            คำสั่งซื้อของฉัน
                         </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    การเงิน
                    <Menu.Menu>
                        <Menu.Item
                            name='search'
                            active={activeItem === 'search'}
                            onClick={handleItemClick}
                        >
                            รายรับของฉัน
                         </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    การตั้งค่า
                    <Menu.Menu>
                        <Menu.Item
                            name='search'
                            active={activeItem === 'search'}
                            onClick={handleItemClick}
                        >
                            บัญชีของฉัน
                         </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>

            </Menu>
        </MainLayout>
    )
}
