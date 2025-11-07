# API 类型使用指南

## 概述

本项目采用 **类型就近原则**，API 类型定义在各自的路由文件中，确保类型安全和易于维护。

## 设计理念

### ✅ 采用的方案：类型就近原则

- API 路由文件导出其请求和响应类型
- 前端页面直接从 API 路由导入类型
- 避免维护单独的类型文件，减少循环依赖

### 优势

1. **单一数据源**：类型和实现在同一文件，修改不会遗漏
2. **避免循环依赖**：单向依赖关系更清晰
3. **类型更精确**：直接使用 Prisma 生成的类型
4. **易于维护**：类型变更时 TypeScript 自动提示所有引用位置

---

## 使用方式

### 1. 在 API 路由中定义和导出类型

```typescript
// src/app/api/user/register/route.ts
import { ApiResponse } from '@/types/api';
import { User } from '@prisma/client';

// ✅ 导出请求类型
export interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
}

// ✅ 导出响应类型
export type RegisterResponse = ApiResponse<{ user: User }>;

export async function POST(req: Request) {
    const body: RegisterRequest = await req.json();
    // ... 业务逻辑 ...
    return success({ user }, '注册成功');
}
```

### 2. 在前端页面中导入使用

```typescript
// src/app/(public)/register/page.tsx
import api from '@/lib/axios';
import type { RegisterRequest, RegisterResponse } from '@/app/api/user/register/route';

export default function RegisterPage() {
    const onFinish = async (values: RegisterRequest) => {
        // ✅ api.post 使用泛型指定响应类型
        const data = await api.post<RegisterResponse>('/user/register', values);

        // ✅ data 自动拥有正确的类型提示
        console.log(data.user.email); // 类型安全 ✅
    };
}
```

### 3. axios 响应拦截器自动解包

由于 `src/lib/axios.ts` 的响应拦截器会自动解包数据：

```typescript
api.interceptors.response.use((response) => {
    const res = response.data; // ApiResponse<T>
    if (res.code === 200) {
        return res.data; // 直接返回 T
    }
});
```

所以：
```typescript
// ✅ 返回的 data 是 { user: User }，不是 ApiResponse<{ user: User }>
const data = await api.post<RegisterResponse>('/user/register', values);
```

---

## 文件组织规范

### API 路由 (`src/app/api/**/*.ts`)

```typescript
// 1. 导出请求类型（如果需要）
export interface XxxRequest {
    field1: string;
    field2: number;
}

// 2. 导出响应类型
export type XxxResponse = ApiResponse<{
    // 响应数据结构
}>;

// 3. 实现 API 处理函数
export async function POST(req: Request) {
    const body: XxxRequest = await req.json();
    // ...
}
```

### 前端页面 (`src/app/**/page.tsx`)

```typescript
// 导入 API 类型
import type { XxxRequest, XxxResponse } from '@/app/api/xxx/route';

// 导入表单类型也可以在页面中定义并导出
export interface XxxFormValues extends XxxRequest {
    confirmPassword?: string; // 额外的前端字段
}
```

---

## 共享类型
`src/type/***.ts` 只包含**真正通用**的类型：

## api 公共定义
`src/lib/apiResponse.ts` 只包含**api定义**的类型：

```typescript
// ✅ 通用响应格式
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data?: T;
}

// ✅ 可选：跨模块共享的业务模型
export interface Project {
    id: string;
    name: string;
    // ...
}
```

---

## 实际示例

### 示例 1：注册功能

**API 路由** (`src/app/api/user/register/route.ts`):
```typescript
export interface RegisterPostValues {
    name: string;
    email: string;
    password: string;
}

export type RegisterRes = ApiResponse<User>;
```

**前端页面** (`src/app/(public)/register/page.tsx`):
```typescript
import { RegisterRes } from '@/app/api/user/register/route';

const data = await api.post<RegisterRes>('/user/register', values);
```

### 示例 2：修改密码

**API 路由** (`src/app/api/user/update/route.ts`):
```typescript
export interface UpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export type UpdatePasswordResponse = ApiResponse<null>;
```

**前端页面** (`src/app/(admin)/user/settings/page.tsx`):
```typescript
import type { UpdatePasswordRequest } from '@/app/api/user/update/route';

const requestData: UpdatePasswordRequest = {
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
};
await api.post('/user/update', requestData);
```

---

## 最佳实践总结

✅ **类型就近定义**：API 路由文件中定义并导出类型

✅ **前端直接导入**：从 API 路由导入类型，确保一致性

✅ **使用 Prisma 类型**：直接使用 `@prisma/client` 的类型定义

✅ **单向依赖**：避免循环依赖，保持清晰的依赖关系

✅ **类型即文档**：清晰的类型定义就是最好的接口文档
