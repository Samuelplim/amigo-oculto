import { useState } from 'react';
import { Container } from '../../../components/Container';
import { InputText } from '../../../components/ui/Input';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';

export const NovoParticipante = () => {
    const [loading, setLoading] = useState(false);
    const [participantes, setParticipantes] = useState<string[]>([]);
    const [participante, setParticipante] = useState<string>('');
    const [error, setError] = useState<string>('');

    const saveParticipantes = () => {
        setLoading(true);
        if (participantes.length % 2 !== 0) {
            setError(
                'Só é possivel cadastrar conjunto pares para as pessoas para que não ocorra Conflito caso já tenha sido realizado a lista dos nomes'
            );

            return;
        }
        setLoading(false);
    };

    const addPartcipante = () => {
        setParticipantes((prevPart) => [...prevPart, participante]);
        setParticipante('');
    };
    return (
        <Container>
            <Typography.Title>Cadastrar Participantes</Typography.Title>
            <InputText label="Nome" value={participante} onChange={(e) => setParticipante(e.target.value)} />
            <Typography.Text>{error}</Typography.Text>
            <Button title="Adicionar Proximo participante" onClick={addPartcipante} />
            <div>
                <Typography.Text>Novos participantes ({participantes.length}): </Typography.Text>
                {participantes.map((participante) => (
                    <div>
                        <Typography.Text>{participante}</Typography.Text>
                    </div>
                ))}
            </div>

            <Button title="Salvar" onClick={saveParticipantes} />
        </Container>
    );
};
