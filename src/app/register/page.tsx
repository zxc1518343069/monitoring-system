"use client";

import { Form, Input, Button, Typography, Card, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title } = Typography;

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { email: string; password: string; name: string }) => {
        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.ok) {
                message.success("注册成功，请登录");
                router.push("/");
            } else {
                message.error(data.error || "注册失败");
            }
        } catch {
            message.error("注册失败，请稍后再试");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        }}>
            <Card style={{ width: 350, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: 8 }}>
                <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>注册账号</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="昵称">
                        <Input prefix={<UserOutlined />} placeholder="请输入昵称" size="large" />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[
                        { required: true, message: "请输入邮箱" },
                        { type: "email", message: "邮箱格式不正确" }
                    ]}>
                        <Input prefix={<MailOutlined />} placeholder="请输入邮箱" size="large" />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block loading={loading}>注册</Button>
                </Form>
            </Card>
        </div>
    );
}