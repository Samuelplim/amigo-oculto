import { useEffect, useState } from 'react';
import { Typography } from '../../components/ui/Typography';
import { Container } from '../../components/Container';
import { InputDate, InputText } from '../../components/ui/Input';
import { Button } from '../../components/Button';
import { Evento } from '../../domain/Evento';

const EventoPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Evento | undefined>(undefined);

    useEffect(() => {
        const getData = () => {
            setLoading(true);
            setData({
                name: 'Natal',
                totalDePessoas: 50,
                local: 'Rua XYX - Brazil',
                Data: new Date().toISOString().slice(0, 16),
                sorteioRealizado: true,
                pedendesVizualizacoes: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            setLoading(false);
        };
        getData();
    }, []);

    const handleInputChange = (field: keyof Evento, value: string) => {
        setData((prev) => (prev ? { ...prev, [field]: value } : undefined));
    };
    const saveChanges = () => {
        setLoading(true);

        setLoading(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography.Title>Dados do Evento</Typography.Title>

            <div className="space-y-4">
                <InputText
                    placeholder="Nome"
                    label="Nome"
                    value={data?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />

                <InputText
                    placeholder="Local"
                    label="Local"
                    value={data?.local || ''}
                    onChange={(e) => handleInputChange('local', e.target.value)}
                />

                <InputDate
                    placeholder="Data"
                    label="Data"
                    value={data?.Data || ''}
                    onChange={(e) => handleInputChange('Data', e.target.value)}
                />
                <Button title="Salvar" onClick={saveChanges} />
            </div>
        </Container>
    );
};

export { EventoPage };
