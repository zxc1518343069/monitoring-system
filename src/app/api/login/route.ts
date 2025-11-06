import { error, success } from '@/lib/apiResponse';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { email, password } = await req.json();

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

    // 模拟登录成功（真实项目应生成 JWT 或 Session）
    return success(
        { token, user: { id: user.id, email: user.email, name: user.name } },
        '登录成功'
    );
}
