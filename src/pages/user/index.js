import React from 'react';
import { Card, Button } from 'antd';
import axios from './../../axios/index';
import ETable from './../../components/ETable/index';
import BaseForm from './../../components/BaseForm/index';
import util from './../../utils/util';

export default class User extends React.Component {

    state = {}

    params = {
        page: 1
    }

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名',
            width: 120
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'user_mobile',
            placeholder: '请输入手机号',
            width: 120
        },
        {
            type: 'DATEPICKER',
            label: '入职日期',
            field: 'user_date',
            placeholder: '请输入日期',
            width: 80
        }
    ]

    componentDidMount() {
        this.requestList();
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    handleFilter = (params) => {
        this.params = params;
        console.log(this.params);
        this.requestList();
    }

    requestList = () => {
        let _this = this;
        axios.requestList(this, '/user/list', this.params)
    }

    render() {

        const formRef = React.createRef();

        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子一枚',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
                return {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }[interest]
            }
        }, {
            title: '爱好',
            dataIndex: 'isMarried',
            render(isMarried) {
                return isMarried ? '已婚' : '未婚'
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }
        ]

        return (
            <div>
                <Card>
                    <BaseForm formR={formRef} formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>
                <div className="content-warp">
                    <ETable
                        updateSelectedItem={util.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        // selectedIds={this.state.selectedIds}
                        //selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}//{false}
                    />
                </div>
            </div>
        );
    }
}