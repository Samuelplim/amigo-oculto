import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { InputText } from '../../components/ui/Input';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/Button';

export const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        setLoading(true);
        // Simulate user login logic
        if (username && password) {
            setError('');
            alert('Bem-vindo, usuário!');
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
            <InputPass label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Typography.Text>{error}</Typography.Text>

            <Button title={loading ? 'Carregando...' : 'Entrar'} onClick={handleLogin} disabled={loading} />
        </Container>
    );
};

export const Route = createFileRoute('/login/$userId')({
    component: LoginPage,
});