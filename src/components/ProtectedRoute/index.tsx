'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';
import { useEffect } from 'react';

type ProtectedRouteProps = {
    children: React.ReactNode;
    roles?: string[]; // 可选：限制角色访问
};

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/'); // 未登录跳转到登录页
            } else if (roles && !roles.includes(user.role || 'user')) {
                router.push('/'); // 角色不匹配也跳转
            }
        }
    }, [loading, user, roles, router]);

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return null; // 跳转中，不渲染内容
    }

    return <>{children}</>;
}
