import { useEffect, useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '../../../components/Container';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';
import { Controlled } from '../../../components/ui/Controlled';

type ParticipantForm = { name: string };

const schema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
});

export const EditarParticipante = ({ userId }: { userId: string }) => {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, reset } = useForm<ParticipantForm>({
        resolver: zodResolver(schema),
        defaultValues: { name: '' },
    });

    const saveParticipantes: SubmitHandler<ParticipantForm> = (data) => {
        setLoading(true);

        const parsed = schema.safeParse({ name: data.name || '' });
        if (!parsed.success) {
            setLoading(false);
            return;
        }

        // Simula chamada à API
        setTimeout(() => {
            console.log('Salvando participante:', parsed.data);
            setLoading(false);
            alert('Participante salvo com sucesso!');
        }, 800);
    };

    useEffect(() => {
        const loadParticipante = () => {
            setLoading(true);
            // Simula carregamento
            const mockName = 'Samuel da boca';
            reset({ name: mockName });
            setLoading(false);
        };

        loadParticipante();
    }, [reset, userId]);

    if (loading) {
        return (
            <Container>
                <Typography.Text>Carregando...</Typography.Text>
            </Container>
        );
    }

    return (
        <Container>
            <Typography.Title>Editar Participante</Typography.Title>

            <form onSubmit={handleSubmit(saveParticipantes)}>
                <div className="space-y-4">
                    <Controlled.Input control={control} name="name" label="Nome" input={{ placeholder: 'Nome' }} />

                    <div className="pt-4">
                        <Button title="Salvar" type="submit" />
                    </div>
                </div>
            </form>
        </Container>
    );
};
