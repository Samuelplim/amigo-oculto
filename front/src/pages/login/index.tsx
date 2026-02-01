import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '../../components/Container';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/Button';
import { Controlled } from '../../components/ui/Controlled';
import { useAuth } from '../../components/provider/auth-provider';

const schema = z.object({
    login: z.string().min(1, 'Usuário obrigatório'),
    password: z.string().min(1, 'Senha obrigatória'),
});

type LoginForm = z.infer<typeof schema>;

export const LoginPage = ({ userId }: { userId?: string }) => {
    const { login, error: ErrorSection } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { control, handleSubmit, reset } = useForm<LoginForm>({
        resolver: zodResolver(schema),
        defaultValues: { login: '', password: '' },
    });

    const handleLogin: SubmitHandler<LoginForm> = async (data) => {
        setLoading(true);
        setError('');
        try {
            await login({
                login: data.login,
                password: data.password,
                type: userId !== undefined ? 'participante' : 'admin',
            });
            if (ErrorSection) {
                setError(ErrorSection);
            } else {
                navigate({ to: '/evento' });
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        reset();
    }, [reset]);

    return (
        <Container>
            <Typography.Title>Login de Usuário</Typography.Title>

            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-4">
                    <Controlled.Input
                        control={control}
                        name="login"
                        label="Usuário"
                        input={{ placeholder: 'Usuário' }}
                    />

                    <Controlled.Input
                        control={control}
                        name="password"
                        label="Senha"
                        input={{ placeholder: 'Senha', type: 'password' }}
                    />

                    {error && <Typography.Text className="text-red-600">{error}</Typography.Text>}
                    {ErrorSection && <Typography.Text className="text-red-600">{ErrorSection}</Typography.Text>}

                    <div className="pt-4">
                        <Button title={loading ? 'Carregando...' : 'Entrar'} type="submit" disabled={loading} />
                    </div>
                </div>
            </form>
        </Container>
    );
};
