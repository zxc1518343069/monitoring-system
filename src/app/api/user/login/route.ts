import { ApiResponse, error, success } from '@/lib/apiResponse';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 登录请求类型
export interface LoginRequest {
    email: string;
    password: string;
}

// 登录响应类型
export type LoginResponse = ApiResponse<{
    token: string;
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
    };
}>;

export async function POST(req: Request) {
    const body: LoginRequest = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return error(400, '账号密码错误');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return error(400, '用户不存在');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return error(400, '密码错误');
    }

    // 生成 JWT（有效期 1 小时）
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    // 设置 HttpOnly Cookie
    const res = NextResponse.json({ message: '登录成功' });
    res.cookies.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1小时
        path: '/',
    });

    return success(
        {
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
        },
        '登录成功'
    );
}
