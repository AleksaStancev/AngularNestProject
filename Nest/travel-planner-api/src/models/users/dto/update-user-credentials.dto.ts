import { PartialType } from '@nestjs/mapped-types';
import { UserCredentialsDto } from './user-credentials.dto';

export class UpdateUserCredentialsDto extends PartialType(UserCredentialsDto) {}
