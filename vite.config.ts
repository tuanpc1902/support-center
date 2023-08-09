import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return defineConfig({
        define: {
            'process.env': env,
        },
        plugins: [
            react(),
            alias({
                entries: [
                    {
                        find: '~',
                        replacement: resolve(projectRootDir, 'src'),
                    },
                ],
            }),
        ],
        server: {
            host: '0.0.0.0',
            port: 8786,
            open: false,
            cors: true,
        },
        build: {
            outDir: 'dist',
        },
    });
});
