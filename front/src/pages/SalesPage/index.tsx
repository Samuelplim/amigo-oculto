import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { InputText } from '../../components/ui/Input';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/Button';
import { InputPass } from '../../components/ui/Input/InputPass';
import { useAuth } from '../../components/provider/auth-provider';

export const SalesPage = ({ userId }: { userId?: string }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        navigate({
            to: '/login',
        });
    };
    const handleRegister = async () => {
        navigate({
            to: '/registrar',
        });
    };

    useEffect(() => {
        setUsername('');
        setPassword('');
    }, []);

    return (
        <Container>
            <Typography.Title>Seu amigo secreto fica facil aqui</Typography.Title>
            <Typography.Text>Aqui você pode fazer o sorteio sem custo</Typography.Text>
            <Typography.Text>Ou com custo caso queira enviar convites por email, e sms</Typography.Text>

            <Button title={loading ? 'Carregando...' : 'Entrar'} onClick={handleLogin} disabled={loading} />
            <Typography.Text>Ou</Typography.Text>
            <Button title={loading ? 'Carregando...' : 'Cadastrar'} onClick={handleRegister} disabled={loading} />
        </Container>
    );
};
