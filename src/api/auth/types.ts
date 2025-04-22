interface ErrorResponse {
    reason: string;
}

interface BaseUserDto {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
}

interface UserResponse extends BaseUserDto {
    id: number;
    display_name: string;
    avatar: string;
}

export type UserResponseDto = UserResponse | ErrorResponse;

// Регистрация
export interface SignUpRequestDto extends BaseUserDto {
    password: string;
}

interface SignUpResponse {
    id: number;
}

export type SignUpResponseDto = SignUpResponse | ErrorResponse;

// Логин
export interface SignInRequestDto {
    login: string;
    password: string;
}

export type SignInResponseDto = object | ErrorResponse;
