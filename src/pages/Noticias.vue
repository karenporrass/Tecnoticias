<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, SlidersHorizontal } from 'lucide-vue-next'

import NewsCard from '../components/news/NewsCard.vue'
import { useNoticiasStore } from '../stores/noticias'
import type { Categoria } from '../types/noticia'

const noticiasStore = useNoticiasStore()

const categoriaSeleccionada = ref<'Todas' | Categoria>('Todas')
const busqueda = ref('')

const categorias = ['Todas', ...noticiasStore.categorias] as const

const noticiasFiltradas = computed(() => {
  const termino = busqueda.value.trim().toLowerCase()

  return noticiasStore.noticias.filter((noticia) => {
    const coincideCategoria =
      categoriaSeleccionada.value === 'Todas' ||
      noticia.categoria === categoriaSeleccionada.value

    const coincideBusqueda =
      !termino ||
      noticia.titulo.toLowerCase().includes(termino) ||
      noticia.descripcion.toLowerCase().includes(termino) ||
      noticia.categoria.toLowerCase().includes(termino)

    return coincideCategoria && coincideBusqueda
  })
})

const seleccionarCategoria = (categoria: 'Todas' | Categoria) => {
  categoriaSeleccionada.value = categoria
}
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <section class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-wider text-orange-500 mb-3">
            Actualidad
          </p>
          <h1 class="text-4xl md:text-5xl font-bold text-[#1a365d]">
            Todas las Noticias
          </h1>
          <p class="mt-4 text-lg text-slate-600">
            Explora las noticias más relevantes de educación, tecnología,
            turismo y comercio.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div class="flex flex-wrap gap-2">
          <button v-for="categoria in categorias" :key="categoria" type="button"
            @click="seleccionarCategoria(categoria)" :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              categoriaSeleccionada === categoria
                ? 'bg-[#1a365d] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#2b6cb0] hover:text-[#2b6cb0]'
            ]">
            {{ categoria }}
          </button>

        </div>

        <div class="relative w-full lg:w-80">
          <Search :size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input v-model="busqueda" type="search" placeholder="Buscar noticias..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none transition focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="flex items-center gap-2 mb-6 text-sm text-slate-500">
        <SlidersHorizontal :size="17" />
        <span>
          {{ noticiasFiltradas.length }}
          {{ noticiasFiltradas.length === 1 ? 'noticia encontrada' : 'noticias encontradas' }}
        </span>
      </div>
      <div v-if="noticiasFiltradas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard v-for="noticia in noticiasFiltradas" :key="noticia.id" :noticia="noticia"
          :favorito="noticiasStore.esFavorito(noticia.id)" @favorite="noticiasStore.toggleFavorito(noticia.id)" />
      </div>
      <div v-else class="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-slate-100 flex items-center justify-center">
          <Search :size="28" class="text-slate-400" />
        </div>
        <h2 class="text-xl font-semibold text-[#1a365d]">
          No encontramos noticias
        </h2>
        <p class="mt-2 text-slate-500">
          Intenta con otra búsqueda o selecciona una categoría diferente.
        </p>
        <button type="button" @click="busqueda = ''; categoriaSeleccionada = 'Todas'"
          class="mt-6 px-5 py-2.5 bg-[#2b6cb0] text-white rounded-xl font-medium hover:bg-[#1a365d] transition">
          Limpiar filtros
        </button>
      </div>
    </section>
  </main>
</template>