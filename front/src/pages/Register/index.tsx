import { useState } from 'react';
import { z } from 'zod';
import { Typography } from '../../components/ui/Typography';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controlled } from '../../components/ui/Controlled';
import { Input } from '../../components/ui/Input';
import { userService } from '../../services/user.service';
import { useNavigate } from '@tanstack/react-router';

type RegisterData = {
    name?: string;
    local?: string;
    Data?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: boolean;
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const schema = z
    .object({
        name: z.string().min(2, 'Nome muito curto').nonempty('Nome é obrigatório'),
        email: z.email('Email inválido').nonempty('Email é obrigatório'),
        password: z
            .string()
            .regex(
                passwordRegex,
                'Senha inválida. Deve ter ao menos 8 caracteres, com letras maiúsculas, minúsculas, número e caractere especial'
            )
            .nonempty('Senha é obrigatória'),
        confirmPassword: z.string().nonempty('Confirme sua senha'),
        terms: z.boolean().refine((v) => v === true, {
            message: 'Você deve concordar com os Termos de Serviço',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As senhas não coincidem',
    });

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { control, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const saveChanges: SubmitHandler<RegisterData> = (data) => {
        setLoading(true);

        const parsed = schema.safeParse({
            name: data.name || '',
            email: data.email || '',
            password: data.password || '',
            confirmPassword: data.confirmPassword || '',
        });
        if (!parsed.success) {
            setLoading(false);
            return;
        }

        userService
            .register({
                name: parsed.data.name,
                email: parsed.data.email,
                password: parsed.data.password,
            })
            .then(() => {
                alert('Usuário cadastrado com sucesso!');
                navigate({ to: '/login' });
            })
            .catch(() => {
                setError('Erro ao cadastrar usuário. Tente novamente.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    console.log(formState.errors);
    return (
        <Container>
            <Typography.Title>Cadastre-se</Typography.Title>
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
                        input={{ placeholder: 'meu@email.com', type: 'email' }}
                    />

                    <div className="grid space-y-2">
                        <label>Senha</label>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder="Senha"
                                            type={showPassword ? 'text' : 'password'}
                                            className="pr-20"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary"
                                        >
                                            {showPassword ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    </div>

                                    {error?.message && (
                                        <Typography.Text variant={'warning'} size={'sm'}>
                                            {error.message}
                                        </Typography.Text>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className="grid space-y-2">
                        <label>Confirme a senha</label>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder="Confirme a senha"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="pr-20"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((s) => !s)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary"
                                        >
                                            {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    </div>

                                    {error?.message && (
                                        <Typography.Text variant={'warning'} size={'sm'}>
                                            {error.message}
                                        </Typography.Text>
                                    )}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="terms"
                            render={({ field, fieldState: { error } }) => (
                                <div className="flex flex-col space-y-1">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={!!field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                        <span className="text-sm">
                                            Ao se cadastrar, você concorda com nossos{' '}
                                            <a
                                                href="/terms"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary underline"
                                            >
                                                Termos de Serviço
                                            </a>{' '}
                                            e Política de Privacidade.
                                        </span>
                                    </label>
                                    {error?.message && (
                                        <Typography.Text variant={'warning'} size={'sm'}>
                                            {error.message}
                                        </Typography.Text>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    {error && (
                        <Typography.Text variant={'warning'} size={'sm'}>
                            {error}
                        </Typography.Text>
                    )}

                    <Button title="Cadastrar" type="submit" fullWidth disabled={loading} />
                    <Typography.Text size="sm">
                        Já possui uma conta?{' '}
                        <Typography.Link size="sm" href="/login">
                            Entrar
                        </Typography.Link>
                    </Typography.Text>
                </div>
            </form>
        </Container>
    );
};

export { RegisterPage };
