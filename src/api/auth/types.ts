interface ErrorResponse {
    reason: string;
}

interface BaseUserDto {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
}

interface UserResponse extends BaseUserDto {
    id: number;
    display_name: string;
    avatar: string;
}

export type UserResponseDto = UserResponse | ErrorResponse;

export interface SignUpRequestDto extends BaseUserDto {
    password: string;
}

interface SignUpResponse {
    id: number;
}

export type SignUpResponseDto = SignUpResponse | ErrorResponse;

export interface SignInRequestDto {
    login: string;
    password: string;
}

export type SignInResponseDto = string | ErrorResponse;
