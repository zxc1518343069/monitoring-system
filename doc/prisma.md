
# Prisma 常用命令选择速查表

## 1️⃣ 开发阶段命令

| 场景                              | 是否修改数据库结构 | 使用命令                                  | 说明                         |
|---------------------------------|-----------|---------------------------------------|----------------------------|
| 新增/删除字段                         | ✅         | `npx prisma migrate dev --name 描述性名字` | 会生成迁移文件并更新本地数据库            |
| 修改字段类型（如 `String?` → `String`）  | ✅         | `npx prisma migrate dev --name 描述性名字` | 会生成迁移文件并更新本地数据库            |
| 修改关系（新增外键、删除外键）                 | ✅         | `npx prisma migrate dev --name 描述性名字` | 会生成迁移文件并更新本地数据库            |
| 仅修改 `schema.prisma` 中的默认值或索引    | ✅         | `npx prisma migrate dev --name 描述性名字` | 会生成迁移文件并更新本地数据库            |
| 仅修改 Prisma Client 生成逻辑（不改数据库结构） | ❌         | `npx prisma generate`                 | 重新生成 Prisma Client         |
| 快速试验，不需要迁移文件（本地测试）              | ✅         | `npx prisma db push`                  | 直接更新数据库结构，不生成迁移文件（不推荐团队协作） |

---

## 2️⃣ 部署阶段命令

| 场景             | 使用命令                        | 说明                    |
|----------------|-----------------------------|-----------------------|
| 部署到生产环境并应用所有迁移 | `npx prisma migrate deploy` | 会执行所有未应用的迁移文件         |
| 查看当前数据库状态      | `npx prisma migrate status` | 显示迁移是否已应用             |
| 重置本地数据库并重新应用迁移 | `npx prisma migrate reset`  | 会清空数据库并重新运行所有迁移（谨慎使用） |

---

## 3️⃣ 常用命令速览

```bash
# 生成迁移文件并更新本地数据库
npx prisma migrate dev --name add-user-email

# 直接更新数据库结构（无迁移文件）
npx prisma db push

# 重新生成 Prisma Client
npx prisma generate

# 部署迁移到生产环境
npx prisma migrate deploy

# 查看迁移状态
npx prisma migrate status

# 重置数据库并重新应用迁移
npx prisma migrate reset

修改了 schema.prisma ?
        |
        +-- 是 --> 是否影响数据库结构？
                    |
                    +-- 是 --> migrate dev --name 描述性名字
                    |
                    +-- 否 --> prisma generate
        |
        +-- 否 --> 不需要执行 Prisma 命令
```