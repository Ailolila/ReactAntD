import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/util';
import './../../style/common.less';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {
    state = {
        list: [],
        isShowOpenCity: false
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list: list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    render() {

        const formRef = React.createRef();

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }

        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode == 1 ? '停车点' : '禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]

        const FilterForm = () => {
            return (
                <Form layout="inline">
                    <FormItem label="城市">
                        <Select
                            style={{ width: 100 }}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                            <Option value="3">深圳市</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="用车模式">
                        <Select
                            style={{ width: 120 }}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="营运模式">
                        <Select
                            style={{ width: 80 }}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="加盟商授权状态">
                        <Select
                            style={{ width: 100 }}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                        <Button>重置</Button>
                    </FormItem>
                </Form>
            );
        }

        // 城市开通提交
        const handleSubmit = () => {
            let cityInfo = formRef.current.getFieldValue();
            console.log(cityInfo);
            axios.ajax({
                url: '/city/open',
                data: {
                    params: cityInfo
                }
            }).then((res) => {
                if (res.code == '0') {
                    message.success('开通成功');
                    this.setState({
                        isShowOpenCity: false
                    })
                    this.requestList();
                }
            })
        }

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={handleSubmit}
                >
                    <OpenCityForm formR={formRef} itemlayou = {formItemLayout} />

                </Modal>
                <UserForm itemlayou = {formItemLayout} userInfo="111" type={this.state.type} />
            </div>
        );
    }
}

class OpenCityForm extends React.Component {
    render() {
        //const formRef = React.createRef();
        return (
            <Form
                layout="horizontal"
                ref={this.props.formR}
                initialValues={{
                    city: "1",//默认值
                }}
            >
                <FormItem label="选择城市" name="city" {...this.props.itemlayou}>
                    <Select style={{ width: 100 }}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                </FormItem>
                <FormItem name="op_mode" label="营运模式" {...this.props.itemlayou}>
                    <Select style={{ width: 100 }}>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem name="use_mode" label="用车模式" {...this.props.itemlayou}>
                    <Select style={{ width: 100 }}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        );
    }
}

class UserForm extends React.Component {
    render() {
        message.info(this.props.userInfo)
        console.log("form:" + this.userInfo);

        const formRef = React.createRef();
        //const [form2] = Form.useForm();

        const handleSubmit1 = () => {
            let cityInfo = formRef.current.getFieldValue("aab");
            console.log("cityinfo:" + cityInfo);
        }

        return (
            <div>
                <Form ref={formRef}>
                    <FormItem label="用车模式" name="aab">
                        <Select style={{ width: 100 }}>
                            <Option value="">全部</Option>
                            <Option value="1">指定停车点</Option>
                            <Option value="2">禁停区</Option>
                        </Select>
                    </FormItem>
                    <Button type="primary" onClick={handleSubmit1}>开通城市</Button>
                </Form>
            </div>
        );
    }
}