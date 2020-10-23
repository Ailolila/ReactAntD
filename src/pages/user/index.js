import React from 'react';
import { Card, Button, Form, Input, Select, Radio, Modal, DatePicker } from 'antd'
import axios from './../../axios/index';
import ETable from './../../components/ETable/index';
import BaseForm from './../../components/BaseForm/index';
import Utils from './../../utils/util';
import Moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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

    // 操作员工
    handleOperator = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                title: '创建员工',
                isVisible: true,
                type
            })
        } else if (type == "edit" || type == 'detail') {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type == 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item,
                type
            })
        } else if (type == "delete") {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: '确认删除',
                content: `是否要删除当前选中的员工${item.id}`,
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code === 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
            // Utils.ui.confirm({
            //     text: '确定要删除此用户吗？',
            //     onOk: () => {
            //         axios.ajax({
            //             url: '/user/delete',
            //             data: {
            //                 params: {
            //                     id: item.id
            //                 }
            //             }
            //         }).then((res) => {
            //             if (res.code == 0) {
            //                 this.setState({
            //                     isVisible: false
            //                 })
            //                 this.requestList();
            //             }
            //         })
            //     }
            // })
        }
    }

    // componentWillUnmount = () => {
    //     this.setState = (state, callback) => {
    //         return;
    //     };
    // }

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

        const handleSubmit = () => {
            let type = this.state.type;
            let data = formRef.current.getFieldsValue();
            axios.ajax({
                url: type == 'create' ? '/user/add' : '/user/edit',
                data: {
                    params: {
                        ...data
                    }
                }
            }).then((res) => {
                if (res.code == 0) {
                    this.setState({
                        isVisible: false,
                        userInfo: ''
                    })
                    this.requestList();
                }
            })
        }

        let footer = {};
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            }
        }

        return (
            <div>
                <Card>
                    <BaseForm formR={formRef} formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-warp">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        //selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}//{false}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={handleSubmit}
                    width={800}
                    onCancel={() => {
                        formRef.current.resetFields();
                        // formRef.current.setFieldsValue({
                        //     userInfo:{}
                        // });
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        })
                    }}
                    destroyOnClose
                    {...footer}
                >
                    <UserForm formR={formRef} userInfo={this.state.userInfo} type={this.state.type} />
                </Modal>
            </div>
        );
    }
}

class UserForm extends React.Component {

    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
        }[state]
    }

    render() {

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form
                layout="horizontal"
                ref={this.props.formR}
                initialValues={
                    {
                        "user_name": userInfo.username,
                        "sex": userInfo.sex,
                        "state": userInfo.state,
                        "birthday": Moment(userInfo.birthday),
                        "address": userInfo.address
                    }
                }
            >
                <FormItem label="姓名" {...formItemLayout} name="user_name">
                    {
                        userInfo && type == 'detail' ? userInfo.username :

                            <Input type="text" placeholder="请输入姓名" />
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout} name="sex">
                    {
                        userInfo && type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout} name="state">
                    {
                        userInfo && type == 'detail' ? this.getState(userInfo.state) :
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout} name="birthday">
                    {
                        userInfo && type == 'detail' ? userInfo.birthday :
                            <DatePicker />
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout} name="address">
                    {
                        userInfo && type == 'detail' ? userInfo.address :
                            <Input.TextArea rows={3} placeholder="请输入联系地址" />
                    }
                </FormItem>
            </Form>
        );
    }
}