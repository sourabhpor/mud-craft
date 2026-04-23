import { SetMetadata } from '@nestjs/common';

export const GQL_PUBLIC_KEY = 'gql_public';
export const GqlPublic = () => SetMetadata(GQL_PUBLIC_KEY, true);
