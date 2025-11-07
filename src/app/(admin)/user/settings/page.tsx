'use client';

import { Typography, Form, Input, Button, message, Card } from 'antd';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import { useState } from 'react';
import type {
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from '@/app/api/user/update/route';

const { Title } = Typography;

export default function UserSettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [passwordForm] = Form.useForm();

    const onFinish = async (values: { name: string }) => {
        // TODO: 调用 API 更新用户信息
        message.success('用户信息已更新');
    };

    const onPasswordChange = async (
        values: UpdatePasswordRequest & { confirmPassword: string }
    ) => {
        setLoading(true);
        try {
            const requestData: UpdatePasswordRequest = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            };
            await api.post<UpdatePasswordResponse>('/user/update', requestData);
            message.success('密码修改成功');
            passwordForm.resetFields();
        } catch (err: any) {
            message.error(err?.message || '密码修改失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600 }}>
            <Title level={3}>用户配置</Title>

            {/* 基本信息 */}
            <Card title="基本信息" style={{ marginBottom: 24 }}>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ name: user?.name }}
                >
                    <Form.Item label="邮箱">
                        <Input value={user?.email} disabled />
                    </Form.Item>
                    <Form.Item name="name" label="昵称">
                        <Input placeholder="请输入昵称" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form>
            </Card>

            {/* 修改密码 */}
            <Card title="修改密码">
                <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={onPasswordChange}
                    autoComplete="off"
                >
                    <Form.Item
                        name="oldPassword"
                        label="旧密码"
                        rules={[{ required: true, message: '请输入旧密码' }]}
                    >
                        <Input.Password placeholder="请输入旧密码" />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="新密码"
                        rules={[
                            { required: true, message: '请输入新密码' },
                            { min: 6, message: '密码长度至少为 6 位' },
                        ]}
                    >
                        <Input.Password placeholder="请输入新密码（至少 6 位）" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="确认新密码"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: '请确认新密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请再次输入新密码" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading}>
                        修改密码
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
