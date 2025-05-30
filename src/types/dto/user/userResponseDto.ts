import { BaseUserDto } from '../base/baseUserDto';
import { ErrorDto } from '../base/errorDto';

export type UpdateUserPasswordResponseDto = string | ErrorDto;

export type UpdateUserAvatarResponseDto = BaseUserDto | ErrorDto;

export type UserResponseDto = BaseUserDto[] | ErrorDto;
