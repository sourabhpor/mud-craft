"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor(message, data = [], count = 0, statusCode = 200) {
        return {
            status: true,
            message,
            count,
            statusCode,
            data: Array.isArray(data) ? data : [data],
        };
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=successResponse.js.map