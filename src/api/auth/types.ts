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

export interface UserDto extends BaseUserDto {
    id: number;
    display_name: string;
    avatar: string;
}

export interface SignUpRequestDto extends BaseUserDto {
    password: string;
}

interface SignUpResponse {
    id: number;
}

export type SignUpResponseDto = SignUpResponse | ErrorResponse;
