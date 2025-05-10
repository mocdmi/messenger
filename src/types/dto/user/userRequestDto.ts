export interface UpdateUserPasswordRequestDto {
    oldPassword: string;
    newPassword: string;
}

export interface SearchUserRequestDto {
    login: string;
}
