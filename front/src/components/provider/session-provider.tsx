'use client';

import { createContext, useContext, useState } from 'react';
import { api } from '../../services/api';
interface ParticipanteType {
    id: string;
    nome: string;
    description: string;
    created: string;
    updated: string;
    isAdmin: boolean;
    eventoId: number;
}

interface UsuarioType {
    id: number;
    nome: string;
    isAdmin: boolean;
}

export interface User {
    id: string;
    name: string;
    isAdmin: boolean;
    description: string;
}
export interface Event {
    totalDePessoas: number;
    nome: string;
    local: string;
    Data: string;
    createdAt: string;
    updatedAt: string;
    sorteioRealizado: boolean;
    pedendesVizualizacoes: number;
}
export interface DataUser {
    user: User;
    event: Event;
}

type SessionContextType = {
    data?: ParticipanteType | UsuarioType;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    error?: string;
    login: (props: { login: string; password: string; type: 'admin' | 'participante' }) => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<ParticipanteType | UsuarioType>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const logout = () => {};
    const login = async (props: { login: string; password: string; type: 'admin' | 'participante' }) => {
        try {
            setIsLoading(true);
            const res = await api({
                url: `${import.meta.env.VITE_API_URL}/api/login`,
                method: 'POST',
                body: {
                    nome: props.login,
                    senha: props.password,
                    tipo: props.type,
                },
            });
            if (res.ok === false) {
                setError(res.data?.message);
                return;
            }
            setData({ ...res.data, isAdmin: props.type === 'admin' } as ParticipanteType | UsuarioType);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro desconhecido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SessionContext.Provider
            value={{
                data,
                isLoading,
                isAuthenticated: !!data,
                logout,
                login,
                error,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
