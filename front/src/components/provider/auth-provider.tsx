'use client';

import { createContext, useContext, useState } from 'react';
import { loginService } from '../../services/login.service';
import { Navigate } from '@tanstack/react-router';
import { Evento } from '../../domain/Evento';
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

export interface DataUser {
    user: User;
    event: Evento;
}

export type AuthContext = {
    data?: DataUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    error?: string;
    login: (props: { login: string; password: string; type: 'admin' | 'participante' }) => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<DataUser>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const logout = () => {
        setIsAuthenticated(false);
        setData(undefined);
        Navigate({
            to: '/login',
        });
    };
    const login = async (props: { login: string; password: string; type: 'admin' | 'participante' }) => {
        try {
            setIsLoading(true);
            const res = await loginService({
                username: props.login,
                password: props.password,
                type: props.type,
            });
            setIsAuthenticated(true);
            setData({
                user: { id: '123', name: 'asdasd', description: '', isAdmin: props.type === 'admin' },
                event: {
                    totalDePessoas: 10,
                    name: 'Festa de Fim de Ano',
                    local: 'Escritório',
                    Data: '2024-12-20 20:00',
                    createdAt: '',
                    updatedAt: '',
                    sorteioRealizado: false,
                    pedendesVizualizacoes: 0,
                },
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Erro desconhecido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                data,
                isLoading,
                isAuthenticated: isAuthenticated,
                logout,
                login,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}
