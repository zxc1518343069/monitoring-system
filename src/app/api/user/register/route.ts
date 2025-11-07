import { RegisterPostValues } from '@/app/(public)/register/page';
import { prisma } from '@/lib/db';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { success, error } from '@/lib/apiResponse';
import { ApiResponse } from '@/lib/apiResponse';

export type RegisterRes = ApiResponse<User>;

export async function POST(req: Request) {
    const body: RegisterPostValues = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
        return error(400, '邮箱和密码不能为空');
    }

    // 检查是否已存在
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return error(400, '该邮箱已注册');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
        },
    });

    return success({ user }, '注册成功');
}
