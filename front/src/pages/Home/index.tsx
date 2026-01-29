import { Container } from '../../components/Container';
import { useAuth } from '../../components/provider/auth-provider';
import { Typography } from '../../components/ui/Typography';
import { EventSection } from './components/EventSection';

const Home = () => {
    const { data } = useAuth();
    return (
        <Container>
            <Typography.Title>Amigo Oculto</Typography.Title>
            <Typography.Title level={2}>Olá {data?.user.name}</Typography.Title>
            <EventSection data={data} />
        </Container>
    );
};

export { Home };
