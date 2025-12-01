export interface SitemapRoute {
    loc: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: string;
}

export interface SitemapConfig {
    baseUrl: string;
    routes: SitemapRoute[];
}

/**
 * Gera o XML do sitemap a partir de uma configuração de rotas
 */
export function generateSitemapXML(config: SitemapConfig): string {
    const { baseUrl, routes } = config;

    const urlEntries = routes
        .map(
            (route) => `    <url>
        <loc>${baseUrl}${route.loc}</loc>
        <lastmod>${route.lastmod}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Retorna a data atual no formato ISO (YYYY-MM-DD)
 */
export function getTodayISO(): string {
    return new Date().toISOString().split('T')[0];
}
