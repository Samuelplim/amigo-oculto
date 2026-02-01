import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Container } from '../../../components/Container';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';
import { Controlled } from '../../../components/ui/Controlled';

interface Gift {
    id: string;
    name: string;
    description?: string;
    imagem?: string;
}

const schema = z.object({
    name: z.string().min(1, 'O nome do presente é obrigatório'),
    description: z.string().optional(),
});

type GiftForm = z.infer<typeof schema>;

export const EditarPresente = ({ presenteId }: { presenteId: string }) => {
    const [loading, setLoading] = useState(false);
    const [presente, setPresente] = useState<Gift | null>(null);
    const [error, setError] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { control, handleSubmit, reset } = useForm<GiftForm>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', description: '' },
    });

    const savePresente: SubmitHandler<GiftForm> = (data) => {
        if (!data.name || !data.name.trim()) {
            setError('O nome do presente é obrigatório');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        if (file) formData.append('imagem', file);

        // Simulando requisição
        setTimeout(() => {
            console.log('Salvando:', { data, file });
            setLoading(false);
            alert('Presente salvo com sucesso!');
        }, 1000);
    };

    useEffect(() => {
        const loadPresente = async () => {
            setLoading(true);
            try {
                // Simulando chamada à API
                // const response = await fetch(`/api/presentes/${presenteId}`);
                // const data = await response.json();

                const mockData: Gift = {
                    id: presenteId,
                    name: 'Caneta Azul',
                    description: 'Uma caneta azul muito bonita',
                    imagem: 'https://exemplo.com/imagem.jpg',
                };

                setPresente(mockData);
                reset({ name: mockData.name, description: mockData.description || '' });
                if (mockData.imagem) {
                    setPreviewUrl(mockData.imagem);
                }
            } catch (error) {
                setError('Erro ao carregar presente');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadPresente();
    }, [presenteId, reset]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        // Validar tipo de arquivo
        if (!selectedFile.type.startsWith('image/')) {
            setError('Por favor, selecione apenas imagens');
            return;
        }

        // Validar tamanho do arquivo (ex: 5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('A imagem deve ter no máximo 5MB');
            return;
        }

        setError('');
        setFile(selectedFile);

        // Criar preview imediatamente
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);

        // Você também poderia persistir o nome no form se desejar
        // setValue('imagemName', selectedFile.name);
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    useEffect(() => {
        // Cleanup para blob urls se usados
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    if (loading && !presente) {
        return (
            <Container>
                <Typography.Text>Carregando...</Typography.Text>
            </Container>
        );
    }

    if (!presente) {
        return (
            <Container>
                <Typography.Text>Presente não encontrado</Typography.Text>
            </Container>
        );
    }

    return (
        <Container>
            <Typography.Title>Editar Presente</Typography.Title>

            <form onSubmit={handleSubmit(savePresente)}>
                <div className="space-y-4">
                    <Controlled.Input
                        control={control}
                        name="name"
                        label="Nome"
                        input={{ placeholder: 'Digite o nome do presente' }}
                    />

                    <Controlled.Input
                        control={control}
                        name="description"
                        label="Descrição"
                        input={{ placeholder: 'Digite a descrição do presente' }}
                    />

                    <div className="space-y-2">
                        <Typography.Text className="font-medium">Imagem</Typography.Text>

                        {(previewUrl || presente.imagem) && (
                            <div className="space-y-2">
                                <div className="relative w-32 h-32">
                                    <img
                                        src={previewUrl || presente.imagem}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                        disabled={loading}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="block"
                        />

                        <Typography.Text className="text-sm text-gray-500">
                            Formatos suportados: JPG, PNG, GIF. Máx: 5MB
                        </Typography.Text>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                            <Typography.Text className="text-red-600">{error}</Typography.Text>
                        </div>
                    )}

                    <div className="flex gap-2 pt-4">
                        <Button title={loading ? 'Salvando...' : 'Salvar'} type="submit" disabled={loading} />

                        <Button title="Cancelar" onClick={() => window.history.back()} disabled={loading} />
                    </div>
                </div>
            </form>
        </Container>
    );
};
