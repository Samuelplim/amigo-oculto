import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Container } from '../../../components/Container';
import { InputText } from '../../../components/ui/Input';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';
import { InputFile } from '../../../components/ui/Input/InputFile';

interface Gift {
    id: string;
    name: string;
    description?: string;
    imagem?: string;
}

export const EditarPresente = ({ presenteId }: { presenteId: string }) => {
    const [loading, setLoading] = useState(false);
    const [presente, setPresente] = useState<Gift | null>(null);
    const [error, setError] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const savePresente = () => {
        if (!presente?.name.trim()) {
            setError('O nome do presente é obrigatório');
            return;
        }

        setLoading(true);
        setError('');

        // Aqui você faria a chamada à API para salvar
        // const formData = new FormData();
        // formData.append('name', presente.name);
        // formData.append('description', presente.description || '');
        // if (file) {
        //     formData.append('imagem', file);
        // }

        // Simulando requisição
        setTimeout(() => {
            console.log('Salvando:', { presente, file });
            setLoading(false);
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
    }, [presenteId]);

    useEffect(() => {
        // Criar preview quando um novo arquivo for selecionado
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        // Cleanup
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [file]);

    const handleInputChange = (field: keyof Gift, value: string) => {
        setPresente((prev) => {
            if (!prev) return null;
            return { ...prev, [field]: value };
        });
    };

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

        // Atualizar o estado do presente com o nome do arquivo
        // ou mantenha a URL existente se quiser atualizar só depois do upload
        handleInputChange('imagem', selectedFile.name);
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl(null);
        if (presente) {
            setPresente({ ...presente, imagem: '' });
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

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

            <div className="space-y-4">
                <InputText
                    label="Nome"
                    value={presente.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite o nome do presente"
                    required
                    disabled={loading}
                />

                <InputText
                    label="Descrição"
                    value={presente.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Digite a descrição do presente"
                    disabled={loading}
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

                    <InputFile
                        ref={fileInputRef}
                        label={previewUrl ? 'Alterar imagem' : 'Selecionar imagem'}
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
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
                    <Button
                        title={loading ? 'Salvando...' : 'Salvar'}
                        onClick={savePresente}
                        disabled={loading || !presente.name.trim()}
                    />

                    <Button title="Cancelar" onClick={() => window.history.back()} disabled={loading} />
                </div>
            </div>
        </Container>
    );
};
