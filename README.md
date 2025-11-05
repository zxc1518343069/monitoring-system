This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 前端监控系统（Next.js 15 + Ant Design + PostgreSQL）

## 📖 项目简介
这是一个基于 **Next.js 15**、**Ant Design** 和 **PostgreSQL** 构建的完整前端监控系统，类似于一个小型的 **Sentry / 阿里 ARMS**。  
系统包含 **项目注册与管理、错误采集与查询、性能监控、用户行为回放、网络请求监控、告警通知、权限管理** 等功能，旨在帮助开发者快速搭建并理解前端监控体系的全流程。

本项目将作为一个可运行的 Demo 发布到 GitHub，并支持一键部署到 **Vercel** + **Supabase**（PostgreSQL）。

---

## 🎯 功能结构

### 1. 项目管理
- 创建 / 编辑 / 删除项目
- API Key 管理
- 项目配置（采集类型、采样率、环境）

### 2. 错误监控
- 错误趋势图（按时间统计）
- Top 错误列表
- 错误详情与堆栈信息
- 用户行为回放（错误发生前的操作路径）

### 3. 性能监控
- 核心 Web Vitals 指标（FCP、LCP、CLS、TTFB）
- 性能趋势分析（按时间、版本、设备类型）
- 性能告警（指标超过阈值时触发）

### 4. 网络请求监控
- API 请求日志（URL、方法、状态码、耗时）
- 慢接口分析
- 失败请求统计

### 5. 告警与通知
- 告警规则配置（错误率、性能指标）
- 通知渠道（邮件、钉钉、企业微信、Slack）
- 告警历史记录

### 6. 数据分析与报表
- 日报 / 周报 / 月报
- 趋势分析
- 错误影响评估

### 7. 权限与团队协作
- 用户管理（邀请成员加入项目）
- 角色权限（管理员 / 开发 / 只读）
- 操作日志（配置修改记录）

### 8. SDK 管理
- SDK 版本管理
- 采样率配置
- 数据过滤（忽略某些错误类型或来源）

---

## 🛠 技术栈
- **前端框架**：Next.js 15
- **UI 组件库**：Ant Design
- **数据库**：PostgreSQL（Supabase 免费版）
- **ORM**：Prisma
- **图表库**：ECharts
- **部署平台**：Vercel（前端 + API），Supabase（数据库）

---

# 📌 开发阶段
+ 短期 MVP：
  + 项目管理
  + 错误采集
  + 错误看板
  + 性能监控
+ 中期扩展： 
  + 用户行为回放 
  + 网络请求监控 
  + 告警通知 
+ 长期完善： 
  + 权限管理 
  + 数据分析报表 
  + SDK 管理