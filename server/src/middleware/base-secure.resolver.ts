import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/roles.guard";
import { PermissionsGuard } from "./permissions.guard";

@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export abstract class BaseSecureResolver {}
