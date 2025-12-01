import type { Connect, Plugin } from 'vite';
import { generateSitemapXML } from '../src/libs/sitemap/generator';
import { getSitemapRoutes } from '../src/libs/sitemap/routes';

const BASE_URL = 'https://www.vidaalemdotrabalho.com.br';

/**
 * Plugin Vite para servir sitemap.xml dinamicamente
 *
 * Em desenvolvimento: intercepta requisições para /sitemap.xml e retorna o XML gerado
 * Em produção: pode ser estendido para gerar o arquivo estático durante o build
 */
export function sitemapPlugin(): Plugin {
    return {
        name: 'vite-plugin-sitemap',
        configureServer(server) {
            server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
                if (req.originalUrl === '/sitemap.xml') {
                    const routes = getSitemapRoutes();
                    const xml = generateSitemapXML({
                        baseUrl: BASE_URL,
                        routes,
                    });

                    res.setHeader('Content-Type', 'application/xml');
                    res.setHeader('Cache-Control', 'public, max-age=3600');
                    res.end(xml);
                } else {
                    next();
                }
            });
        },
    };
}
