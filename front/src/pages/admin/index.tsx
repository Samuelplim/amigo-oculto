import { useState } from 'react';
import { Container } from '../../components/Container';
import { useSession } from '../../components/provider/session-provider';
import { Typography } from '../../components/ui/Typography';
import { InputText } from '../../components/ui/Input';
import { Button } from '../../components/Button';

const LoginAdmin = () => {
    const { login, isLoading } = useSession();
    const [loginName, setLoginName] = useState<string>('');
    const [password, setPassowrd] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const handleLogin = async () => {
        setError(null);
        try {
            await login({ login: loginName, password, type: 'admin' });
        } catch {
            setError('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <Container>
            <Typography.Title>Login</Typography.Title>
            {isLoading && <Typography.Text>Carregando...</Typography.Text>}
            {error && <Typography.Text className="text-red-500">{error}</Typography.Text>}
            <InputText
                label="Usuário"
                placeholder="Digite seu usuário"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
            />
            <InputText
                label="Senha"
                value={password}
                placeholder="Digite sua senha"
                onChange={(e) => setPassowrd(e.target.value)}
            />
            <Button title="Entrar" onClick={handleLogin} />
        </Container>
    );
};

export { LoginAdmin };
