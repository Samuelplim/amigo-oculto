import { api } from './api';

const userRegisterService = async (props: {
    name: string;
    password: string;
    email: string;
}): Promise<{
    id: number;
    nome: string;
}> => {
    try {
        const { data } = await api<{
            id: number;
            nome: string;
        }>({
            url: '/api/usuarios',
            method: 'POST',
            body: {
                email: props.email,
                name: props.name,
                password: props.password,
            },
        });
        return {
            id: data.id,
            nome: data.nome,
        };
    } catch (error) {
        return Promise.reject(error);
    }
};
export const userService = {
    register: userRegisterService,
};
