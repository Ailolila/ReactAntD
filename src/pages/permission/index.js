import React from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal } from 'antd';
import axios from '../../axios/index';
import ETable from '../../components/ETable/index';
import menuConfig from '../../config/menuConfig';
import Utils from '../../utils/util';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class PermissionUser extends React.Component {

    state = {}

    componentWillMount() {
        this.requestList();
    }

    requestList = () => {
        let _this = this;
        axios.requestList(this, '/role/list', {})
    }

    // 角色创建
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }

    // 用户授权提交
    handleUserSubmit = () => {
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isUserVisible: false
                })
                this.requestList();
            }
        })
    }

    render() {

        const formRef = React.createRef();

        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];

        // 角色提交
        const handleRoleSubmit = () => {
            let data = formRef.current.getFieldsValue();
            axios.ajax({
                url: '/role/create',
                data: {
                    params: {
                        ...data
                    }
                }
            }).then((res) => {
                if (res) {
                    this.setState({
                        isRoleVisible: false
                    })
                    this.requestList();
                }
            })
        }

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={handleRoleSubmit}
                    onCancel={() => {
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                    destroyOnClose
                >
                    <RoleForm formR={formRef} />
                </Modal>
            </div>
        );
    }
}

// 角色创建
class RoleForm extends React.Component {

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        return (
            <Form
                ref={this.props.formR}
                layout="horizontal"
                initialValues={
                    {
                        "role_name": '',
                        "state": 1
                    }
                }
            >
                <FormItem label="角色名称" {...formItemLayout} name="role_name">
                    {
                        <Input type="text" placeholder="请输入角色名称" />
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout} name="state">
                    {
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    }
                </FormItem>
            </Form>
        );
    }
}