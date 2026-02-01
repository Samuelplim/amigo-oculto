import { useNavigate } from '@tanstack/react-router';
import { Container } from '../../components/Container';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/Button';

export const SalesPage = () => {
    const navigate = useNavigate();

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

    return (
        <Container>
            <Typography.Title>Seu amigo secreto fica facil aqui</Typography.Title>
            <Typography.Text>Aqui você pode fazer o sorteio sem custo</Typography.Text>
            <Typography.Text>Ou com custo caso queira enviar convites por email, e sms</Typography.Text>

            <Button title={'Entrar'} onClick={handleLogin} />
            <Typography.Text>Ou</Typography.Text>
            <Button title={'Cadastrar'} onClick={handleRegister} />
        </Container>
    );
};
