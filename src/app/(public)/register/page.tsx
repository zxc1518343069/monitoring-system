'use client';

import { RegisterRes } from '@/app/api/user/register/route';
import api from '@/lib/axios';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const { Title } = Typography;

export interface RegisterPostValues {
    name: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm<RegisterPostValues>();
    const onFinish = async () => {
        setLoading(true);
        const formValue = await form.validateFields();
        try {
            // api.post 会自动处理响应，成功时返回 data
            await api.post<RegisterRes>('/user/register', {
                ...formValue,
                name: formValue.name || formValue.email.split('@')[0],
            });
            message.success('注册成功，请登录');
            router.push('/');
        } catch (err) {
            // axios 拦截器已经显示了错误消息，这里可以做额外处理
            console.error('注册失败:', err);
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
            <Card style={{ width: 350, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8 }}>
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    注册账号
                </Title>
                <Form layout="vertical" form={form}>
                    <Form.Item name="name" label="昵称">
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="请输入昵称,默认邮箱前缀"
                            size="large"
                        />
                    </Form.Item>
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
                    <Button
                        type="primary"
                        size="large"
                        block
                        loading={loading}
                        onClick={() => {
                            onFinish();
                        }}
                    >
                        注册
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
