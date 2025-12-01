'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface User {
    id: string;
    name: string;
    isAdmin: boolean;
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
    data?: DataUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    login: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<DataUser | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const logout = () => {};
    const login = () => {};
    const eventoExist: Event = {
        totalDePessoas: 50,
        nome: 'Natal',
        local: 'Rua XYX - Brazil',
        sorteioRealizado: true,
        pedendesVizualizacoes: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const eventoNaoExist = undefined;
    useEffect(() => {
        async function loadAdditionalData() {
            setIsLoading(true);
            setData({
                user: { id: '1', name: 'Samuel Delgado', isAdmin: true },
                event: eventoExist,
            });
            setIsLoading(false);
        }

        loadAdditionalData();
    }, []);

    return (
        <SessionContext.Provider
            value={{
                data,
                isLoading,
                isAuthenticated: !!data,
                logout,
                login,
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
