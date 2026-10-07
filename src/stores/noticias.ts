import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import noticiasData from '../data/noticias.json'
import type { Noticia, Categoria } from '../types/noticia'
const STORAGE_KEY = 'tecnoticias-noticias'
const FAVORITOS_KEY = 'tecnoticias-favoritos'

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


    const noticiasFavoritas = computed(() => {
        return noticias.value.filter(noticia =>
            favoritos.value.includes(noticia.id)
        )
    })

    const obtenerNoticia = (id: number) => {
        return noticias.value.find(
            (noticia) => noticia.id === id
        )
    }

    const agregarNoticia = (nuevaNoticia: Noticia) => {
        noticias.value.unshift(nuevaNoticia)

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(noticias.value)
        )
    }

    const eliminarNoticia = (id: number) => {
        noticias.value = noticias.value.filter(
            (noticia) => noticia.id !== id
        )

        favoritos.value = favoritos.value.filter(
            (favoritoId) => favoritoId !== id
        )

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(noticias.value)
        )

        localStorage.setItem(
            FAVORITOS_KEY,
            JSON.stringify(favoritos.value)
        )
    }

    const generarNuevoId = () => {
        if (noticias.value.length === 0) {
            return 1
        }

        return Math.max(
            ...noticias.value.map((noticia) => noticia.id)
        ) + 1
    }

    return {
        noticias,
        noticiasDestacadas,
        noticiasFavoritas,
        categorias,
        favoritos,
        esFavorito,
        toggleFavorito,
        obtenerNoticia,
        agregarNoticia,
        eliminarNoticia,
        generarNuevoId
    }
})