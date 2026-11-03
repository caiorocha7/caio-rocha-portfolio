import type { NextConfig } from 'next';

// Publicado como site estático. Em GitHub Pages de projeto o site fica em /<repo>,
// por isso o basePath vem do ambiente (vazio para domínio próprio ou desenvolvimento).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  // GitHub Pages não executa o otimizador de imagens; as imagens já são WebP otimizadas (pnpm images)
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // 404 global estilizado para URLs fora de /pt e /en (o layout raiz é por idioma)
  experimental: { globalNotFound: true },
};

export default nextConfig;
