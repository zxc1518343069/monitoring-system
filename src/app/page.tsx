// src/app/page.tsx
'use client';

import axios from '@/lib/axios';
import { User } from '@prisma/client';
import { useState } from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';

const { Title } = Typography;

export async function login(email: string, password: string): Promise<User> {
    return axios.post('/user/login', { email, password });
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        const { email, password } = values;

        try {
            await login(email, password);
            message.success('登录成功');
            router.push('/welcome');
        } catch (error) {
            message.error('登录失败，请稍后再试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
            }}
        >
            <Card
                style={{
                    width: 350,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: 8,
                }}
            >
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    前端监控系统登录
                </Title>
                <Form name="login" onFinish={onFinish} layout="vertical" requiredMark={false}>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '邮箱格式不正确' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="请输入邮箱" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="请输入密码"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                        >
                            登录
                        </Button>
                        <Button type="link" block onClick={() => router.push('/register')}>
                            没有账号？去注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
