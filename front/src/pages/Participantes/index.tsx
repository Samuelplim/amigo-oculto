import { Container } from '../../components/Container';
import { Typography } from '../../components/ui/Typography';

const Participantes = () => {
    const participantes = {
        data: [{ name: 'Samuel Delgado', isAdmin: true, isVisible: true }],
    };
    return (
        <Container>
            <Typography.Title>Participantes</Typography.Title>
            {participantes.data.map((item) => (
                <div>
                    <Typography.Text>{item.name}</Typography.Text>
                </div>
            ))}
        </Container>
    );
};

export { Participantes };
