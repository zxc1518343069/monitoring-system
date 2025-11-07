'use client';

import { Typography, Form, Input, Button, message } from 'antd';
import { useAuth } from '@/context/AuthContext';

const { Title } = Typography;

export default function UserSettingsPage() {
    const { user } = useAuth();

    const onFinish = async (values: { name: string }) => {
        // TODO: 调用 API 更新用户信息
        message.success('用户信息已更新');
    };

    return (
        <div style={{ maxWidth: 500 }}>
            <Title level={3}>用户配置</Title>
            <Form layout="vertical" onFinish={onFinish} initialValues={{ name: user?.name }}>
                <Form.Item name="name" label="昵称">
                    <Input placeholder="请输入昵称" />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form>
        </div>
    );
}
