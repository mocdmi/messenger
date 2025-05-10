import { BaseUserDto } from '../base/baseUserDto';
import { ErrorDto } from '../base/errorDto';
import { UserDto } from '../base/userDto';

export type UpdateUserPasswordResponseDto = string | ErrorDto;

export type UpdateUserAvatarResponseDto = BaseUserDto | ErrorDto;

export type UserResponseDto = UserDto | ErrorDto;
