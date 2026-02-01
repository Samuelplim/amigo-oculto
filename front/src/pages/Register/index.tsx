import { useState } from 'react';
import { z } from 'zod';
import { Typography } from '../../components/ui/Typography';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controlled } from '../../components/ui/Controlled';

type RegisterData = { name?: string; local?: string; Data?: string; email?: string; password?: string };

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const schema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
    email: z.string().email('Email inválido'),
    password: z
        .string()
        .regex(
            passwordRegex,
            'Senha inválida. Deve ter ao menos 8 caracteres, com letras maiúsculas, minúsculas, número e caractere especial'
        ),
});

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(schema),
    });
    /*     const handleInputChange = (field: keyof RegisterData, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({
            ...prev,
            ...(field === 'email' || field === 'password' ? { [field]: undefined } : {}),
        }));
    }; */

    const saveChanges: SubmitHandler<RegisterData> = (data) => {
        setLoading(true);

        const parsed = schema.safeParse({
            name: data.name || '',
            email: data.email || '',
            password: data.password || '',
        });
        if (!parsed.success) {
            setLoading(false);
            return;
        }

        setLoading(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography.Title>Dados do Evento</Typography.Title>
            <form onSubmit={handleSubmit(saveChanges)}>
                <div className="space-y-4">
                    <Controlled.Input
                        control={control}
                        name="name"
                        label="Como você quer ser chamado(a)?"
                        input={{ placeholder: 'Nome' }}
                    />

                    <Controlled.Input
                        control={control}
                        name="email"
                        label="Seu Email"
                        input={{ placeholder: 'meu@email.com' }}
                    />

                    <Controlled.Input
                        control={control}
                        name="password"
                        label="Senha"
                        input={{ placeholder: 'Senha', type: 'password' }}
                    />

                    <Button title="Salvar" type="submit" />
                </div>
            </form>
        </Container>
    );
};

export { RegisterPage };
