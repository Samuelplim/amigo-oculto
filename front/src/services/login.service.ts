import { api } from './api';

export const loginService = async (props: {
    username: string;
    password: string;
    type: 'admin' | 'participante';
}): Promise<{
    id: number;
    nome: string;
    isAdmin: boolean;
}> => {
    try {
        const { data } = await api<{
            id: number;
            nome: string;
            isAdmin: boolean;
        }>({
            url: '/api/login',
            method: 'POST',
            body: {
                nome: props.username,
                senha: props.password,
                tipo: props.type,
            },
        });
        return {
            id: data.id,
            nome: data.nome,
            isAdmin: props.type === 'admin',
        };
    } catch (error) {
        return Promise.reject(error);
    }
};
