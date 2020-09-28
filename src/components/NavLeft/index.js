import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
// import {
//     MailOutlined,
//     CalendarOutlined,
//     AppstoreOutlined,
//     SettingOutlined,
//     LinkOutlined,
// } from '@ant-design/icons';
import './index.less'
import MenuConfig from './../../config/menuConfig'

const { SubMenu } = Menu;

export default class NavLeft extends React.Component {

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);

        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }



    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""></img>
                    <h1>React练级demo</h1>
                </div>
                <Menu mode="inline" theme="dark">
                    {this.state.menuTreeNode}
                    {/* <SubMenu key="sub1" icon={<AppstoreOutlined />} title="导航一">
                        <Menu.Item key="1" icon={<SettingOutlined />} >选项1</Menu.Item>
                        <Menu.Item key="2">选项2</Menu.Item>
                        <Menu.Item key="3">选项3</Menu.Item>
                        <Menu.Item key="4">选项4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<MailOutlined />} title="导航二">
                        <Menu.Item key="5">选项5</Menu.Item>
                        <Menu.Item key="6">选项6</Menu.Item>
                        <SubMenu key="sub3" title="三级导航">
                            <Menu.Item key="7">选项7</Menu.Item>
                            <Menu.Item key="8">选项8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><icon type="setting" /><span>导航三</span></span>}>
                        <Menu.Item key="9">选项9</Menu.Item>
                        <Menu.Item key="10">选项10</Menu.Item>
                        <Menu.Item key="11">选项11</Menu.Item>
                        <Menu.Item key="12">选项12</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>

        );
    }
}
