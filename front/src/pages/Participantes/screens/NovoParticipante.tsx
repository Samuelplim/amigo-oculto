import { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '../../../components/Container';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';
import { Controlled } from '../../../components/ui/Controlled';

type SingleParticipant = { name: string };

const schema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
});

export const NovoParticipante = () => {
    const [loading, setLoading] = useState(false);
    const [participantes, setParticipantes] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const { control, handleSubmit, reset } = useForm<SingleParticipant>({
        resolver: zodResolver(schema),
        defaultValues: { name: '' },
    });

    const addPartcipante: SubmitHandler<SingleParticipant> = (data) => {
        const name = (data.name || '').trim();
        setError('');
        if (!name) return;
        if (participantes.includes(name)) {
            setError('Participante já adicionado');
            return;
        }

        setParticipantes((prev) => [...prev, name]);
        reset();
    };

    const saveParticipantes = () => {
        setError('');
        if (participantes.length === 0) {
            setError('Adicione ao menos dois participantes antes de salvar');
            return;
        }

        if (participantes.length % 2 !== 0) {
            setError('É preciso um número par de participantes para evitar conflitos no sorteio');
            return;
        }

        setLoading(true);

        // Simular chamada à API
        setTimeout(() => {
            console.log('Salvando participantes:', participantes);
            setLoading(false);
            alert('Participantes salvos com sucesso!');
            setParticipantes([]);
        }, 1000);
    };

    return (
        <Container>
            <Typography.Title>Cadastrar Participantes</Typography.Title>

            <form onSubmit={handleSubmit(addPartcipante)}>
                <div className="space-y-4">
                    <Controlled.Input control={control} name="name" label="Nome" input={{ placeholder: 'Nome' }} />

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                            <Typography.Text className="text-red-600">{error}</Typography.Text>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button title="Adicionar próximo participante" type="submit" />
                        <Button title="Salvar" onClick={saveParticipantes} />
                    </div>

                    <div>
                        <Typography.Text>Novos participantes ({participantes.length}): </Typography.Text>
                        {participantes.map((p) => (
                            <div key={p} className="py-1">
                                <Typography.Text>{p}</Typography.Text>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </Container>
    );
};
