import { AuthApi, SignUpRequestDto } from '../api/auth';

const authApi = new AuthApi();

export async function signUp(data: SignUpRequestDto) {
    try {
        const { status, response } = await authApi.create(data);

        if (status === 200) {
            return response;
        } else {
            throw new Error(`Error: ${status}`);
        }
    } catch (error) {
        console.error('Error during sign up:', error);
    }
}
