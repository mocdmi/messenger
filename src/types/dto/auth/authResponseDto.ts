import { BaseUserDto } from '../base/baseUserDto';
import { ErrorDto } from '../base/errorDto';

export type SignUpResponseDto =
    | {
          id: number;
      }
    | ErrorDto;

export type SignInResponseDto = string | ErrorDto;

export type AuthUserResponseDto = BaseUserDto | ErrorDto;
