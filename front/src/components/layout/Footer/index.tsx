import { FaFolder, FaInstagram, FaTelegram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Typography } from '../../ui/Typography';
import { Container } from '../../Container';

export const Footer = () => {
    return (
        <footer className="text-center py-8 mt-8 hidden md:block">
            <Container>
                <div className="mt-4 flex flex-col md:flex-row justify-items-center gap-8">
                    <div>
                        <Typography.Title level={3}>Documentos</Typography.Title>
                        <ul className="flex justify-center space-x-4">
                            <li>
                                <Typography.Link
                                    href="https://drive.google.com/drive/folders/1Q7mIJVzAa-YzYrStV8ZcQxSPHGQ_Bu7p"
                                    target="_blank"
                                    className="flex items-center gap-1"
                                >
                                    <FaFolder aria-label="Materiais" /> Materiais
                                </Typography.Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Typography.Title level={3}>Redes Sociais</Typography.Title>
                        <ul className="flex justify-center space-x-4">
                            <li>
                                <Typography.Link href="https://www.tiktok.com/@movimento_vat" target="_blank">
                                    <FaTiktok aria-label="Siga-nos no TikTok" />
                                </Typography.Link>
                            </li>
                            <li>
                                <Typography.Link href="https://x.com/movimento_vat" target="_blank">
                                    <FaTwitter aria-label="Siga-nos no X (antigo Twitter)" />
                                </Typography.Link>
                            </li>
                            <li>
                                <Typography.Link href="https://www.instagram.com/movimento_vat/" target="_blank">
                                    <FaInstagram aria-label="Siga-nos no Instagram" />
                                </Typography.Link>
                            </li>
                            <li>
                                <Typography.Link href="https://t.me/+-6FKOpL3K4diMjEx" target="_blank">
                                    <FaTelegram aria-label="Participe do nosso grupo no Telegram" />
                                </Typography.Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Typography.Text className="mt-4">
                    &copy; 2024 Movimento Vida Além do Trabalho. Todos os direitos reservados.
                </Typography.Text>
            </Container>
        </footer>
    );
};
