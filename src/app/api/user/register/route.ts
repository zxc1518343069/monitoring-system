import { RegisterPostValues } from '@/app/(public)/register/page';
import { prisma } from '@/lib/db';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { success, error } from '@/lib/apiResponse';
import { ApiResponse } from '@/lib/apiResponse';
import { validateEmail, validatePassword, ValidationResult } from '@/lib/utils/server';

export type RegisterRes = ApiResponse<User>;

export async function POST(req: Request) {
    const body: RegisterPostValues = await req.json();
    const { email, password, name } = body;

    // 校验输入
    const validation = validateRegisterInput(body);
    if (!validation.valid) {
        return error(400, validation.message!);
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

// ==================== 校验函数 ====================

/**
 * 校验注册输入
 */
function validateRegisterInput(body: RegisterPostValues): ValidationResult {
    // 校验邮箱
    const emailValidation = validateEmail(body.email);
    if (!emailValidation.valid) {
        return emailValidation;
    }

    // 校验密码
    const passwordValidation = validatePassword(body.password);
    if (!passwordValidation.valid) {
        return passwordValidation;
    }

    return { valid: true };
}
