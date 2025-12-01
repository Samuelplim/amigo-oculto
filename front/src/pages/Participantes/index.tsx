import { Container } from '../../components/Container';
import { useSession } from '../../components/provider/session-provider';
import { Typography } from '../../components/ui/Typography';

const Participantes = () => {
    const { data } = useSession();
    const participantes = {
        data: [
            { id: 'foroig', name: 'Samuel Delgado', isAdmin: true, revelouPresenteado: true },
            { id: 'foroig', name: 'Ana Silva', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Carlos Oliveira', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Mariana Santos', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Pedro Costa', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Juliana Pereira', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Ricardo Almeida', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Fernanda Lima', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Roberto Souza', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Amanda Rodrigues', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Lucas Mendes', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Patrícia Ferreira', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Bruno Carvalho', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Tatiane Gomes', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Diego Martins', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Camila Barbosa', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Rafael Silva', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Letícia Oliveira', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Felipe Costa', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Vanessa Santos', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Gabriel Pereira', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Isabela Almeida', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Marcos Lima', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Laura Souza', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Thiago Rodrigues', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Beatriz Mendes', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Vinícius Ferreira', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Clara Carvalho', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Eduardo Gomes', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Sophia Martins', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Daniel Barbosa', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Larissa Silva', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Alexandre Oliveira', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Natália Costa', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Leonardo Santos', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Gabriela Pereira', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Guilherme Almeida', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Carolina Lima', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'André Souza', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Júlia Rodrigues', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Rodrigo Mendes', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Manuela Ferreira', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Paulo Carvalho', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Helena Gomes', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Marcelo Martins', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Alice Barbosa', isAdmin: false, revelouPresenteado: false },
            { id: 'foroig', name: 'Fábio Silva', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Cecília Oliveira', isAdmin: true, revelouPresenteado: false },
            { id: 'foroig', name: 'Sérgio Costa', isAdmin: false, revelouPresenteado: true },
            { id: 'foroig', name: 'Elaine Santos', isAdmin: false, revelouPresenteado: false },
        ],
    };

    return (
        <Container>
            <Typography.Title>Participantes ({participantes.data.length})</Typography.Title>
            {data?.user.isAdmin && (
                <Typography.Link href={`/participantes/novo`}>Cadastrar novo participante</Typography.Link>
            )}
            {participantes.data.map((item, index) => (
                <div key={index}>
                    <Typography.Text>
                        {item.name} {item.isAdmin && ' 👑'}
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
