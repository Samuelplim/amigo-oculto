import { useEffect, useState } from 'react';
import { Container } from '../../../components/Container';
import { InputText } from '../../../components/ui/Input';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';

export const EditarParticipante = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState(false);
    const [participante, setParticipante] = useState<string>('');
    const [error, setError] = useState<string>('');

    const saveParticipantes = () => {
        setLoading(true);

        setLoading(false);
    };

    useEffect(() => {
        const loadParticipante = () => {
            setLoading(true);
            setParticipante('Samuel da boca');
            setLoading(false);
        };
        loadParticipante();
    }, []);

    return (
        <Container>
            <Typography.Title>Editar Participante</Typography.Title>
            <InputText label="Nome" value={participante} onChange={(e) => setParticipante(e.target.value)} />
            <Typography.Text>{error}</Typography.Text>

            <Button title="Salvar" onClick={saveParticipantes} />
        </Container>
    );
};
