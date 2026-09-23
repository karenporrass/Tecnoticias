<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  CalendarDays,
  ArrowRight,
  Heart,
} from 'lucide-vue-next'

import type { Noticia } from '../../types/noticia'

defineProps<{
  noticia: Noticia
  favorito?: boolean
}>()

defineEmits<{
  favorite: [id: number]
}>()
</script>

<template>
  <article
    class="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div class="relative h-52 overflow-hidden">
      <img :src="noticia.imagen" :alt="noticia.titulo"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />

      <span class="absolute left-4 top-4 rounded-full bg-[#2b6cb0] px-3 py-1 text-xs font-semibold text-white shadow">
        {{ noticia.categoria }}
      </span>

      <button type="button"
        class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-105"
        :aria-label="favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'" @click="$emit('favorite', noticia.id)">
        <Heart :size="18" :fill="favorito ? 'currentColor' : 'none'"
          :class="favorito ? 'text-red-500' : 'text-slate-600'" />
      </button>
    </div>
    <div class="p-5">
      <div class="mb-3 flex items-center gap-2 text-xs text-slate-500">
        <CalendarDays :size="14" />
        <span>{{ noticia.fecha }}</span>
      </div>
      <h3 class="line-clamp-2 text-lg font-bold text-[#1a365d]">
        {{ noticia.titulo }}
      </h3>
      <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {{ noticia.descripcion }}
      </p>
      <RouterLink :to="`/noticias/${noticia.id}`"
        class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2b6cb0] transition hover:text-[#1a365d]">
        Ver más
        <ArrowRight :size="16" class="transition group-hover:translate-x-1" />
      </RouterLink>
    </div>
  </article>
</template>