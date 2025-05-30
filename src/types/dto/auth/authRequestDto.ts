import { UserDto } from '../base/userDto';

export interface SignInRequestDto {
    login: string;
    password: string;
}

export interface SignUpRequestDto extends UserDto {
    password: string;
}
