import { IsString } from 'class-validator';
import { IUser } from '@jiraf/interfaces';

export namespace AccountChangeProfile {
  export const topic = 'account.change-profile.command';

  export class Request {
    @IsString()
    id: string;

    @IsString()
    user: Pick<IUser, 'displayName'>;

  }

  export class Response {

  }
}
