<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  User,
} from 'lucide-vue-next'

import { useNoticiasStore } from '../stores/noticias'

const route = useRoute()
const router = useRouter()
const noticiasStore = useNoticiasStore()
const noticia = computed(() => {
  const id = Number(route.params.id)

  return noticiasStore.obtenerNoticia(id)
})
const esFavorito = computed(() => {
  if (!noticia.value) return false
  return noticiasStore.esFavorito(noticia.value.id)
})
const alternarFavorito = () => {
  if (!noticia.value) return
  noticiasStore.toggleFavorito(noticia.value.id)
}
const volverAlListado = () => {
  router.push('/noticias')
}
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <template v-if="noticia">
      <section class="bg-white border-b border-slate-200">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <button type="button" @click="volverAlListado"
            class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#2b6cb0] transition">
            <ArrowLeft :size="17" />
            Volver a Noticias
          </button>

        </div>
      </section>
      <article class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="overflow-hidden rounded-2xl shadow-sm">
          <img :src="noticia.imagen" :alt="noticia.titulo" class="w-full h-64 md:h-96 object-cover" />
        </div>
        <div class="mt-8">
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700">
            {{ noticia.categoria }}
          </span>
          <h1 class="mt-4 text-3xl md:text-5xl font-bold leading-tight text-[#1a365d]">
            {{ noticia.titulo }}
          </h1>
          <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
            <div class="flex items-center gap-2">
              <CalendarDays :size="17" />
              <span>{{ noticia.fecha }}</span>
            </div>
            <div class="flex items-center gap-2">
              <User :size="17" />
              <span>{{ noticia.autor }}</span>
            </div>
          </div>
          <div class="my-8 h-px bg-slate-200"></div>
          <div class="max-w-4xl text-lg leading-8 text-slate-700 whitespace-pre-line">
            {{ noticia.contenido }}
          </div>
          <div class="mt-10 flex flex-col sm:flex-row gap-3">
            <button type="button" @click="alternarFavorito" :class="[
              'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition',
              esFavorito
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                : 'bg-[#1a365d] text-white hover:bg-[#2b6cb0]'
            ]">
              <Heart :size="20" :fill="esFavorito ? 'currentColor' : 'none'" />
              {{ esFavorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos' }}
            </button>
            <button type="button" @click="volverAlListado"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#1a365d] bg-white border border-slate-200 hover:border-[#2b6cb0] hover:text-[#2b6cb0] transition">
              <ArrowLeft :size="20" />
              Volver al listado
            </button>
          </div>
        </div>
      </article>
    </template>

    <section v-else class="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 class="text-3xl font-bold text-[#1a365d]">
        Noticia no encontrada
      </h1>
      <p class="mt-3 text-slate-500">
        La noticia que buscas no existe o ya no está disponible.
      </p>
      <button type="button" @click="volverAlListado"
        class="mt-6 px-6 py-3 rounded-xl bg-[#1a365d] text-white font-semibold hover:bg-[#2b6cb0] transition">
        Volver a Noticias
      </button>
    </section>
  </main>
</template>