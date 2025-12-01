import type { SitemapRoute } from './generator';
import { getTodayISO } from './generator';

/**
 * Configuração das rotas do sitemap
 * Adicione ou remova rotas aqui conforme necessário
 */
export function getSitemapRoutes(): SitemapRoute[] {
    const today = getTodayISO();

    return [
        {
            loc: '/',
            lastmod: today,
            changefreq: 'monthly',
            priority: '1.0',
        },
        {
            loc: '/cronologia',
            lastmod: '2025-05-11',
            changefreq: 'monthly',
            priority: '0.8',
        },
        {
            loc: '/faq',
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.8',
        },
        {
            loc: '/institucional',
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.8',
        },
        {
            loc: '/menu',
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.8',
        },
        {
            loc: '/gritos',
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.8',
        },
    ];
}
