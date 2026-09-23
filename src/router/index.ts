import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/Home.vue'),
        },

        {
            path: '/noticias',
            name: 'noticias',
            component: () => import('../pages/Noticias.vue'),
        },

        {
            path: '/noticias/:id',
            name: 'detalle-noticia',
            component: () => import('../pages/DetalleNoticia.vue'),
        },

        {
            path: '/favoritos',
            name: 'favoritos',
            component: () => import('../pages/Favoritos.vue'),
        },

        {
            path: '/gestionar',
            name: 'gestionar',
            component: () => import('../pages/Gestionar.vue'),
        },

        {
            path: '/contacto',
            name: 'contacto',
            component: () => import('../pages/Contacto.vue'),
        },
    ],
})

export default router