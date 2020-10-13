import React from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, message, InputNumber } from 'antd';
import { UserOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//const Option = Select.Option;
const { Option } = Select;
const TestArea = Input.TextArea;

var imgUrl;

export default class Register extends React.Component {

    state = {}

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            debugger;
            // this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            //     userImg: imageUrl,
            //     loading: false,
            // }));
            this.setState({
                userImg: info.file.response.url,
                loading: false,
            })
        }
    }

    render() {
        const NormalLoginForm = () => {
            const formRef = React.createRef();
            const [form] = Form.useForm();
            const formItemlayout = {
                labelCol: {
                    //xs: 24,
                    sm: 4,
                    md: 6
                },
                wrapperCol: {
                    //xs: 24,
                    sm: 12,
                    md: 4
                }
            }
            const rowObject = {
                minRows: 4,
                maxRows: 6
            }

            const offsetLayout = {
                wrapperCol: {
                    sm: 12,
                    md: {
                        span: 4,
                        offset: 6
                    }
                }
            }

            const handleSubmit = () => {
                let userInfo = formRef.current.getFieldValue();
                console.log(JSON.stringify(userInfo))
                message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
            }

            return (
                <div>
                    <Card title="注册表单">
                        <Form
                            form={form}
                            ref={formRef}
                            //style={{ width: 300 }}
                            //onFinish={onFinish} className="login-form"
                            initialValues={{
                                sex: "1",//默认值
                                age: "18",
                                state: "2",
                                interest: ["2", "4", "6"],
                                isMarried: true,
                                birthday: moment("2019-3-2 00:00:01"),
                                address: "天津",
                                time: moment("12:08:23", "HH:mm:ss")
                            }}
                        >
                            <FormItem
                                label="用户名"
                                {...formItemlayout}
                                name="userName"
                                rules={[// 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    { required: true, whitespace: true, message: '用户名必须输入' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                ]}
                            >
                                <Input
                                    {...formItemlayout}
                                    prefix={<UserOutlined />}
                                    placeholder="用户名"
                                />
                            </FormItem>
                            <FormItem
                                label="密码"
                                {...formItemlayout}
                                name="userPwd"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </FormItem>
                            <FormItem
                                label="性别"
                                {...formItemlayout}
                                name="sex"
                            >
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem
                                label="年龄"
                                {...formItemlayout}
                                name="age"
                            >
                                <InputNumber />
                            </FormItem>
                            <FormItem
                                label="当前状态"
                                {...formItemlayout}
                                name="state"
                            >
                                <Select>
                                    <Option value="1">咸鱼一条</Option>
                                    <Option value="2">风华浪子</Option>
                                    <Option value="3">北大才子</Option>
                                    <Option value="4">百度FE</Option>
                                    <Option value="5">创业者</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                label="爱好"
                                {...formItemlayout}
                                name="interest"
                            >
                                <Select mode="multiple">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">打篮球</Option>
                                    <Option value="3">踢足球</Option>
                                    <Option value="4">跑步</Option>
                                    <Option value="5">爬山</Option>
                                    <Option value="6">骑行</Option>
                                    <Option value="7">桌球</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                label="是否已婚"
                                {...formItemlayout}
                                valuePropName="checked"
                                name="isMarried"
                            >
                                <Switch />
                            </FormItem>
                            <FormItem
                                label="生日"
                                {...formItemlayout}
                                name="birthday"
                            >
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </FormItem>
                            <FormItem
                                label="联系地址"
                                {...formItemlayout}
                                name="address"
                            >
                                <TestArea
                                    autoSize={rowObject}
                                />
                            </FormItem>
                            <FormItem
                                label="早起时间"
                                {...formItemlayout}
                                name="time"
                            >
                                <TimePicker placeholder="请选择时间" />
                            </FormItem>
                            <FormItem
                                label="头像"
                                {...formItemlayout}
                                name="userImg"
                            >
                                <Upload
                                    listType="picture-card"
                                    showUploadList={true}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}
                                >
                                    {this.state.userImg ? <img src={this.state.userImg} /> : <PlusOutlined />}
                                </Upload>
                            </FormItem>
                            <FormItem
                                {...offsetLayout}
                                name="xy"
                                valuePropName="checked"
                            >
                                <Checkbox>我已阅读过<a href="#">练级协议</a></Checkbox>
                            </FormItem>
                            <FormItem {...offsetLayout}>
                                <Button type="primary" onClick={handleSubmit}>注册</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            );
        }
        return (
            <div>
                <NormalLoginForm />
            </div>
        );
    }
}

