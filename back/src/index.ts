import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import participanteRoutes from './routes/participanteRoutes';
import presenteRoutes from './routes/presenteRoutes';
import sorteioRoutes from './routes/sorteioRoutes';

const app = express();
// Middleware
app.use(express.json());

// Novas rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/participantes', participanteRoutes);
app.use('/api/presentes', presenteRoutes);
app.use('/api/sorteios', sorteioRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;
