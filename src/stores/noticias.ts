import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import noticiasData from '../data/noticias.json'
import type { Noticia, Categoria } from '../types/noticia'

export const useNoticiasStore = defineStore('noticias', () => {
    const noticias = ref<Noticia[]>(noticiasData as Noticia[])

    const favoritos = ref<number[]>(
        JSON.parse(localStorage.getItem('tecnoticias-favoritos') || '[]')
    )

    const noticiasDestacadas = computed(() => {
        return noticias.value.slice(0, 3)
    })

    const categorias: Categoria[] = [
        'Educación',
        'Tecnología',
        'Turismo',
        'Comercio',
    ]

    const esFavorito = (id: number) => {
        return favoritos.value.includes(id)
    }

    const toggleFavorito = (id: number) => {
        if (esFavorito(id)) {
            favoritos.value = favoritos.value.filter(
                favoritoId => favoritoId !== id
            )
        } else {
            favoritos.value.push(id)
        }

        localStorage.setItem(
            'tecnoticias-favoritos',
            JSON.stringify(favoritos.value)
        )
    }

    const obtenerNoticia = (id: number) => {
        return noticias.value.find(noticia => noticia.id === id)
    }

    const noticiasFavoritas = computed(() => {
        return noticias.value.filter(noticia =>
            favoritos.value.includes(noticia.id)
        )
    })

    return {
        noticias,
        noticiasDestacadas,
        noticiasFavoritas,
        categorias,
        favoritos,
        esFavorito,
        toggleFavorito,
        obtenerNoticia,
    }
})