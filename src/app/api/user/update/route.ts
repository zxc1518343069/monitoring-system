import { error, success, ApiResponse } from '@/lib/apiResponse';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { validatePassword, ValidationResult } from '@/lib/utils/server';

// 修改密码请求类型
export interface UpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

// 修改密码响应类型
export type UpdatePasswordResponse = ApiResponse<null>;

export async function POST(req: Request) {
    // 验证用户登录状态
    const user = await getCurrentUser(req);
    if (!user) {
        return error(401, '未登录');
    }

    const body: UpdatePasswordRequest = await req.json();
    const { oldPassword, newPassword } = body;

    // 校验输入
    const validation = validateUpdatePasswordInput(body);
    if (!validation.valid) {
        return error(400, validation.message!);
    }

    // 验证旧密码
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
        return error(400, '旧密码错误');
    }

    // 哈希新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    return success(null, '密码修改成功');
}

// ==================== 校验函数 ====================

/**
 * 校验修改密码输入
 */
function validateUpdatePasswordInput(body: UpdatePasswordRequest): ValidationResult {
    // 校验旧密码
    if (!body.oldPassword) {
        return { valid: false, message: '请提供旧密码' };
    }

    // 校验新密码
    const newPasswordValidation = validatePassword(body.newPassword, '新密码');
    if (!newPasswordValidation.valid) {
        return newPasswordValidation;
    }

    return { valid: true };
}
