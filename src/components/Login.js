import React from 'react';
import {Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {BASE_URL} from '../constants'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Login(props) {
    const { handleLoggedIn } = props;

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const { username, password } = values;
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password,
            },
            headers: { "Content-Type": "application/json" },
        };
        axios(opt)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const {data} = res;
                    handleLoggedIn(data);
                    message.success("Login succeed!");
                }
            })
            .catch(err => {
                console.log('Login failed. ', err.message);
                message.error(`Login failed. ${err.message}`);
            })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <Button type="link">
                    <Link to="/register">Register Now!</Link>
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;
