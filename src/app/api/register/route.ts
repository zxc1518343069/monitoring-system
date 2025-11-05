import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 });
    }

    // 检查是否已存在
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: "该邮箱已注册" }, { status: 400 });
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
    });

    return NextResponse.json({ message: "注册成功", user });
}