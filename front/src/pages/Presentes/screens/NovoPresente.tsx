import { useState, useRef, ChangeEvent } from 'react';
import { Container } from '../../../components/Container';
import { InputText } from '../../../components/ui/Input';
import { Typography } from '../../../components/ui/Typography';
import { Button } from '../../../components/Button';
import { InputFile } from '../../../components/ui/Input/InputFile';

interface Gift {
    name: string;
    description?: string;
    imagem?: string;
}

export const NovoPresente = () => {
    const [loading, setLoading] = useState(false);
    const [presente, setPresente] = useState<Gift>({
        name: '',
        description: '',
        imagem: '',
    });
    const [error, setError] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const criarPresente = () => {
        if (!presente.name.trim()) {
            setError('O nome do presente é obrigatório');
            return;
        }

        setLoading(true);
        setError('');

        // Aqui você faria a chamada à API para criar
        // const formData = new FormData();
        // formData.append('name', presente.name);
        // formData.append('description', presente.description || '');
        // if (file) {
        //     formData.append('imagem', file);
        // }

        // Simulando requisição
        setTimeout(() => {
            console.log('Criando:', { presente, file });
            setLoading(false);

            // Limpar formulário após sucesso
            setPresente({
                name: '',
                description: '',
                imagem: '',
            });
            setFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Opcional: redirecionar ou mostrar mensagem de sucesso
            alert('Presente criado com sucesso!');
        }, 1000);
    };

    const handleInputChange = (field: keyof Gift, value: string) => {
        setPresente((prev) => ({
            ...prev,
            [field]: value,
        }));
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

        // Criar preview imediatamente
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);

        // Atualizar o estado do presente com o nome do arquivo
        handleInputChange('imagem', selectedFile.name);
    };

    const handleRemoveImage = () => {
        setFile(null);
        setPreviewUrl(null);
        setPresente({ ...presente, imagem: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resetForm = () => {
        setPresente({
            name: '',
            description: '',
            imagem: '',
        });
        setFile(null);
        setPreviewUrl(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Container>
            <Typography.Title>Novo Presente</Typography.Title>

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

                    {previewUrl && (
                        <div className="space-y-2">
                            <div className="relative w-32 h-32">
                                <img
                                    src={previewUrl}
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
                        title={loading ? 'Criando...' : 'Criar Presente'}
                        onClick={criarPresente}
                        disabled={loading || !presente.name.trim()}
                    />

                    <Button title="Limpar" onClick={resetForm} disabled={loading} />

                    <Button title="Cancelar" onClick={() => window.history.back()} disabled={loading} />
                </div>
            </div>
        </Container>
    );
};
