"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlPublic = exports.GQL_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.GQL_PUBLIC_KEY = 'gql_public';
const GqlPublic = () => (0, common_1.SetMetadata)(exports.GQL_PUBLIC_KEY, true);
exports.GqlPublic = GqlPublic;
//# sourceMappingURL=graph.decorator.js.map