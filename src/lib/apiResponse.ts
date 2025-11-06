import { requestSuccess } from '@/const/request';

export function success<T>(data?: T, message = '成功') {
    return Response.json({
        code: requestSuccess,
        message,
        data,
    });
}

export interface ResType {
    code: number;
    message: string;
    data?: any;
}

export function error(code: number, message: string) {
    return Response.json({
        code,
        message,
    });
}
