import { ApiSuccessResponse, ApiFailureResponse } from '../resources/interfaces/ApiResponseError';
import { Response } from 'express';

export function sendSuccessResponse(messages: string | any, statusCode: number, isSuccess: boolean, response: Response) {
	const res: ApiSuccessResponse = {
		success: isSuccess,
		code: statusCode,
		result: messages
	};
	return response.status(statusCode).json(res);
}
export function sendFailureResponse(messages: any, statusCode: any, isSuccess: any, response: any) {
	const res: ApiFailureResponse = {
		success: isSuccess,
		code: statusCode,
		message: messages
	};
	return response.status(statusCode).json(res);
}
