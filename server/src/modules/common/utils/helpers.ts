import { User } from 'src/modules/user/user.entity';

type UserT = User & { token: string };

export type RequestWithUser = Request & { user: UserT; userPermission: string };
