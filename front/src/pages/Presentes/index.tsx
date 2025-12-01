import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Typography } from '../../components/ui/Typography';

const Presentes = () => {
    const presentes = [
        {
            id: 1,
            name: 'Caneta azul',
            description: 'Pode encontrar no teto',
            imagem: '',
        },
        {
            id: 1,
            name: 'Caneta azul',
            description: 'Pode encontrar no teto',
            imagem: '',
        },
    ];

    const deletePresente = () => {};

    return (
        <Container>
            <Typography.Title>Presentes ({presentes.length})</Typography.Title>
            {presentes.length < 3 ? (
                <Typography.Link href={`/presentes/novo`}>Cadastrar novo presente</Typography.Link>
            ) : (
                <Typography.Text>Numero maximo de presentes cadastrado atingido</Typography.Text>
            )}
            {presentes.map((item, index) => (
                <div key={index}>
                    <img src={item.imagem} />
                    <Typography.Text>{item.name}</Typography.Text>
                    <Typography.Text>{item.description}</Typography.Text>
                    <Typography.Link href={`/presentes/${item.id}/editar`}>Editar</Typography.Link>
                    <Button title="Deletar" onClick={deletePresente} />
                    <div className="h-2 bg-red-500" />
                </div>
            ))}
        </Container>
    );
};

export { Presentes };
