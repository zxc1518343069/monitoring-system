'use client';

import { Typography, Button, Space, Card } from 'antd';
import { useRouter } from 'next/navigation';

const { Title, Paragraph } = Typography;

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f0f2f5',
                padding: 20,
            }}
        >
            <Card
                style={{
                    maxWidth: 600,
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: 8,
                }}
            >
                <Title level={2}>欢迎来到前端监控系统</Title>
                <Paragraph>
                    您已成功登录，可以开始管理项目、查看错误日志、分析性能数据等。
                </Paragraph>
                <Space direction="vertical" style={{ width: '100%', marginTop: 20 }}>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() => router.push('/dashboard')}
                    >
                        进入看板
                    </Button>
                    <Button size="large" block onClick={() => router.push('/projects')}>
                        管理项目
                    </Button>
                </Space>
            </Card>
        </div>
    );
}
