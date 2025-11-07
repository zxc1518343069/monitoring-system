import { error, success, ApiResponse } from '@/lib/apiResponse';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import bcrypt from 'bcrypt';

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

    // 验证参数
    if (!oldPassword || !newPassword) {
        return error(400, '请提供旧密码和新密码');
    }

    if (newPassword.length < 6) {
        return error(400, '新密码长度至少为 6 位');
    }

    // 验证旧密码;
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
