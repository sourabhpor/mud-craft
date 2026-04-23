"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginType = exports.PaymentMethod = exports.PaymentStatus = exports.OrderStatus = exports.UserStatus = exports.RoleType = void 0;
var RoleType;
(function (RoleType) {
    RoleType["SUPER_ADMIN"] = "SUPER_ADMIN";
    RoleType["ADMIN"] = "ADMIN";
    RoleType["USER"] = "USER";
})(RoleType || (exports.RoleType = RoleType = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["INACTIVE"] = "INACTIVE";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["COD"] = "COD";
    PaymentMethod["UPI"] = "UPI";
    PaymentMethod["CARD"] = "CARD";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var LoginType;
(function (LoginType) {
    LoginType["EMAIL"] = "EMAIL";
    LoginType["OTP"] = "OTP";
    LoginType["GOOGLE"] = "GOOGLE";
})(LoginType || (exports.LoginType = LoginType = {}));
//# sourceMappingURL=common.enum.js.map