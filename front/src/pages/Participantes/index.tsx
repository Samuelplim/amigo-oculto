import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { useSession } from '../../components/provider/session-provider';
import { Typography } from '../../components/ui/Typography';

const Participantes = () => {
    interface Participante {
        id: string;
        nome: string;
        description: string;
        created: string;
        updated: string;
        eventoId: number;
    }
    const { data } = useSession();
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/participantes`)
            .then((response) => response.json())
            .then((data) => setParticipantes(data));
    }, []);
    console.log(data);

    return (
        <Container>
            <Typography.Title>Participantes ({participantes.length})</Typography.Title>
            {data?.isAdmin && (
                <Typography.Link href={`/participantes/novo`}>Cadastrar novo participante</Typography.Link>
            )}
            {participantes.map((item, index) => (
                <div key={index}>
                    <Typography.Text>
                        {item.name} {item.isAdmin && ' 👑'}
                        {item.revelouPresenteado ? 'Revelou' : 'Não Revelou'}
                    </Typography.Text>
                    {data?.isAdmin && (
                        <Typography.Link href={`/participantes/${item.id}/editar`}>Editar</Typography.Link>
                    )}
                    <div className="h-2 bg-red-500" />
                </div>
            ))}
        </Container>
    );
};

export { Participantes };
