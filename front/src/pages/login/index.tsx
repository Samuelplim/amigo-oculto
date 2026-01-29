import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { InputText } from '../../components/ui/Input';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/Button';
import { InputPass } from '../../components/ui/Input/InputPass';
import { useAuth } from '../../components/provider/auth-provider';

export const LoginPage = ({ userId }: { userId?: string }) => {
    const { login, error: ErrorSection } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        if (username && password) {
            await login({ login: username, password, type: userId !== undefined ? 'participante' : 'admin' });
            setError('');
            navigate({
                to: '/',
            });
        } else {
            setError('Por favor, preencha todos os campos.');
        }
        setLoading(false);
    };

    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);

    return (
        <Container>
            <Typography.Title>Login de Usuário</Typography.Title>
            <InputText label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputPass label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Typography.Text>{error}</Typography.Text>
            <Typography.Text>{ErrorSection}</Typography.Text>
            <Button title={loading ? 'Carregando...' : 'Entrar'} onClick={handleLogin} disabled={loading} />
        </Container>
    );
};
