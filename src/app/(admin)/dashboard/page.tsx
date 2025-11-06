'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { Typography } from 'antd';

const { Title } = Typography;

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div style={{ padding: 20 }}>
                <Title level={2}>系统看板</Title>
                <p>这里是错误趋势、性能指标等数据展示。</p>
            </div>
        </ProtectedRoute>
    );
}
