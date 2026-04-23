"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor(message, data = [], statusCode = 200) {
        const formattedData = Array.isArray(data) ? data : data ? [data] : [];
        return {
            status: true,
            message,
            count: formattedData.length,
            statusCode,
            data: formattedData,
        };
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=successResponse.js.map