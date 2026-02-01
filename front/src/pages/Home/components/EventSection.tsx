import { Button } from '../../../components/Button';
import { DataUser } from '../../../components/provider/auth-provider';
import { Typography } from '../../../components/ui/Typography';

export const EventSection = ({ data }: { data?: DataUser }) => {
    if (data === undefined) {
        return (
            <div>
                <Typography.Title level={3}>Informações do evento</Typography.Title>
            </div>
        );
    }
    const { event, user } = data;

    return (
        <div>
            <Typography.Title level={3}>Informações do evento</Typography.Title>
            <div className="flex items-end">
                <Typography.Title level={2}>{event.totalDePessoas}</Typography.Title>
                <Typography.Text>pessoas</Typography.Text>
            </div>
            {user.isAdmin ? (
                <div>
                    <Typography.Text>
                        {event.sorteioRealizado ? 'Sorteio realizado' : 'Sorteio não realizado'}
                    </Typography.Text>
                    <Typography.Text>
                        {event.pedendesVizualizacoes
                            ? `Total de pessoas que ainda não viram :${event.pedendesVizualizacoes}`
                            : ''}
                    </Typography.Text>
                </div>
            ) : (
                <div> </div>
            )}

            <Typography.Text>Local : {event.local}</Typography.Text>
            <Typography.Text>Data/Hora : {event.Data}</Typography.Text>
            {event.sorteioRealizado ? null : <Button title="Realizar Sorteio" />}
        </div>
    );
};
