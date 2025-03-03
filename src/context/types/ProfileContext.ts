export interface ProfileDetail {
    label: string;
    name: string;
    value: string;
}

export interface ProfileContext {
    name: string;
    detail: ProfileDetail[];
    password: string;
}
