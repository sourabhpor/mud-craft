// src/utils/successResponse.ts

export class SuccessResponse {
  constructor(message: string, data: any = [], statusCode: number = 200) {
    const formattedData = Array.isArray(data) ? data : data ? [data] : [];

    return {
      status: true,
      message,
      count: formattedData.length, // ✅ auto count
      statusCode,
      data: formattedData,
    };
  }
}
