import {
  IsAlphanumeric,
  IsDefined,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { rgx_atLeastOneUppercaseOneLowercaseAndOneNumber_const } from '../../../common/constants/regex.constants';
import { valMsg_passwordPatternValidationErrorMessage_const } from '../../../common/constants/validation-messages.constants';

export class UserCredentialsDto {
  @MinLength(5)
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsDefined()
  readonly username: string;

  @IsNotEmpty()
  @Matches(new RegExp(rgx_atLeastOneUppercaseOneLowercaseAndOneNumber_const), {
    message: valMsg_passwordPatternValidationErrorMessage_const,
  })
  @IsDefined()
  readonly password: string;
}
