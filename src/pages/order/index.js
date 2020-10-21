import React from 'react';
import { Card, Button, Table, Form, Select, Modal } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/util';
import BaseForm from '../../components/BaseForm';

export default class Order extends React.Component {

    state = {}

    params = {
        page: 1
    }

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: 'INPUT',
            label: '模式',
            field: 'model',
            placeholder: '模式',
            width: 80
        },
        {
            type: '时间查询',
            label: '订单时间',
            field: 'order'
        },
        {
            type: 'CHECKBOX',
            label: '是否角色',
            initialValue: true,
            field: 'isRole'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]

    componentDidMount() {
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        console.log(this.params);
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = () => {
        let _this = this;
        axios.requestList(this, '/order/list', this.params)；
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
    }

    render() {

        const formRef = React.createRef();

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]

        const selectedRowKeys = this.state.selectedRowKeys;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

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
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    >

                    </Table>
                </div>
            </div>
        );
    }
}

// class FilterForm extends React.Component {

//     render() {
//         return (
//             <Form layout="inline">
//                 <FormItem label="城市">
//                     <Select
//                         style={{ width: 100 }}
//                         placeholder="全部"
//                     >
//                         <Option value="">全部</Option>
//                         <Option value="1">北京市</Option>
//                         <Option value="2">天津市</Option>
//                         <Option value="3">深圳市</Option>
//                     </Select>
//                 </FormItem>
//                 <FormItem label="订单时间" name="start_time">
//                     <DatePicker
//                         style={{ width: 240 }}
//                         placeholder="订单时间"
//                         showTime
//                         format="YYYY-MM-DD HH:mm:ss"
//                     >
//                     </DatePicker>
//                 </FormItem>
//                 <FormItem label="~" colon={false} name="ent_time">
//                     <DatePicker
//                         style={{ width: 240 }}
//                         placeholder="订单结束时间"
//                         showTime
//                         format="YYYY-MM-DD HH:mm:ss"
//                     >
//                     </DatePicker>
//                 </FormItem>
//                 <FormItem label="状态">
//                     <Select
//                         style={{ width: 100 }}
//                         placeholder="全部"
//                     >
//                         <Option value="">全部</Option>
//                         <Option value="1">进行中</Option>
//                         <Option value="2">结束行程</Option>
//                     </Select>
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         );
//     }
// }