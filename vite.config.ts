import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        })
    ],
    server: {
        host: '0.0.0.0',
        port: 9230
    },
    resolve: {
        alias: {
            // @ 替代为 src
            '@': resolve(__dirname, 'src')
        },
    },
})
