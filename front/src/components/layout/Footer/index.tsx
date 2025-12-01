import { Typography } from '../../ui/Typography';
import { Container } from '../../Container';

export const Footer = () => {
    return (
        <footer className="text-center py-8 mt-8 hidden md:block">
            <Container>
                <Typography.Text className="mt-4">
                    &copy; 2025 Amigo Oculto. Todos os direitos reservados.
                </Typography.Text>
            </Container>
        </footer>
    );
};
