import { BaseUserDto, ErrorResponse } from '@api';

export type UserUpdateRequestDto = BaseUserDto;

export interface PasswordUpdateRequestDto {
    oldPassword: string;
    confirmPassword: string;
}

export type PasswordUpdateResponseDto = string | ErrorResponse;

export interface SearchUserRequestDto {
    login: string;
}
