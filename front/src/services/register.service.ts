import { api } from './api';

export const loginService = async (props: {
    username: string;
    password: string;
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
                nome: props.username,
                senha: props.password,
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
