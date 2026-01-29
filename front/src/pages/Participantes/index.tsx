import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { Typography } from '../../components/ui/Typography';
import { useAuth } from '../../components/provider/auth-provider';

const Participantes = () => {
    interface Participante {
        id: string;
        nome: string;
        description: string;
        created: string;
        updated: string;
        eventoId: number;
        revelouPresenteado: boolean;
        isAdmin: boolean;
    }
    const { data } = useAuth();
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
            {data?.user.isAdmin && (
                <Typography.Link href={`/participantes/novo`}>Cadastrar novo participante</Typography.Link>
            )}
            {participantes.map((item, index) => (
                <div key={index}>
                    <Typography.Text>
                        {item.nome} {item.isAdmin && ' 👑'}
                        {item.revelouPresenteado ? 'Revelou' : 'Não Revelou'}
                    </Typography.Text>
                    {data?.user.isAdmin && (
                        <Typography.Link href={`/participantes/${item.id}/editar`}>Editar</Typography.Link>
                    )}
                    <div className="h-2 bg-red-500" />
                </div>
            ))}
        </Container>
    );
};

export { Participantes };
