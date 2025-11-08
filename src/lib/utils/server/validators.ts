/**
 * 服务端通用校验工具函数
 */

/**
 * 校验结果接口
 */
export interface ValidationResult {
    valid: boolean;
    message?: string;
}

/**
 * 校验邮箱格式
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 校验密码强度 (至少6位)
 */
export function isStrongPassword(password: string): boolean {
    return password.length >= 6;
}

/**
 * 校验必填字段
 */
export function validateRequired(value: any, fieldName: string): ValidationResult {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return { valid: false, message: `${fieldName}不能为空` };
    }
    return { valid: true };
}

/**
 * 校验邮箱字段
 */
export function validateEmail(email: string): ValidationResult {
    if (!email) {
        return { valid: false, message: '邮箱不能为空' };
    }
    if (!isValidEmail(email)) {
        return { valid: false, message: '邮箱格式不正确' };
    }
    return { valid: true };
}

/**
 * 校验密码字段
 */
export function validatePassword(password: string, fieldName = '密码'): ValidationResult {
    if (!password) {
        return { valid: false, message: `${fieldName}不能为空` };
    }
    if (!isStrongPassword(password)) {
        return { valid: false, message: `${fieldName}长度至少为 6 位` };
    }
    return { valid: true };
}
