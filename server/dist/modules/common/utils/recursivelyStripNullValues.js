"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursivelyStripNullValues = void 0;
const recursivelyStripNullValues = (value) => {
    if (Array.isArray(value)) {
        return value.map(exports.recursivelyStripNullValues);
    }
    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, (0, exports.recursivelyStripNullValues)(value)]));
    }
    if (value !== null) {
        return value;
    }
};
exports.recursivelyStripNullValues = recursivelyStripNullValues;
//# sourceMappingURL=recursivelyStripNullValues.js.map