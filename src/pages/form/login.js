import React from 'react'
import { Form, Input, Button, Card, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Option } = Select;

class FormLogin extends React.Component {

    render() {
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录行内表单" style={{ marginTop: 10 }}>
                    <NormalLoginForm />
                </Card>
            </div>
        )
    }
}


const NormalLoginForm = () => {
    const formRef = React.createRef();

    const onFinish = values => {//提交表单且数据验证成功后回调事件
        console.log('Received values of form: ', values);
    };

    const onFill = () => {
        formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    const onGenderChange = (value) => {
        formRef.current.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };

    const onCheck = async () => {
        try {
            const aa = formRef.current.getFieldValue('username');
            console.log('Success:', aa);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <Form
            ref={formRef}
            style={{ width: 300 }}
            onFinish={onFinish} className="login-form"
            initialValues={{
                username: 'admin',//默认值
            }}
        >
            <FormItem
                name="username"
                rules={[// 声明式验证: 直接使用别人定义好的验证规则进行验证
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名"
                />
            </FormItem>
            <FormItem
                name="password"
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
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                </Button>
                <Button type="link" htmlType="button" onClick={onCheck}>
                onCheck
                </Button>
            </FormItem>
        </Form>
    );
}


export default FormLogin