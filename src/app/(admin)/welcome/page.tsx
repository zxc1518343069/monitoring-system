'use client';

import { Typography, Button, Space, Card } from 'antd';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const { Title, Paragraph } = Typography;

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Title level={2}>欢迎来到前端监控系统</Title>
                <Paragraph>
                    您已成功登录，可以开始管理项目、查看错误日志、分析性能数据等。
                </Paragraph>
                <Space direction="vertical" className={styles.buttonGroup}>
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
