import { BaseUserDto } from './baseUserDto';

export type UserDto = Omit<BaseUserDto, 'id' | 'display_name' | 'avatar'>;
