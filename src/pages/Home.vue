<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BookOpen,
  Laptop,
  MapPin,
  ShoppingBag,
} from 'lucide-vue-next'

import NewsCard from '../components/news/NewsCard.vue'
import { useNoticiasStore } from '../stores/noticias'

const noticiasStore = useNoticiasStore()

const toggleFavorito = (id: number) => {
  noticiasStore.toggleFavorito(id)
}
</script>

<template>

  <section class="relative overflow-hidden bg-[#1a365d]">
    <div class="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#2b6cb0] to-[#1a365d] opacity-90" />
    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <span
          class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
          📰 Información que conecta
        </span>
        <h1 class="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Descubre las noticias
          <span class="text-[#ed8936]">
            que importan
          </span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
          Explora las últimas noticias y experiencias sobre
          educación, tecnología, turismo y comercio.
        </p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <RouterLink to="/noticias"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ed8936] px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#dd7728]">
            Explorar noticias
            <ArrowRight :size="18" />
          </RouterLink>
          <RouterLink to="/contacto"
            class="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
            Contáctanos
          </RouterLink>
        </div>
      </div>

      <div class="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <BookOpen class="mx-auto text-blue-200" :size="24" />
          <p class="mt-2 text-sm font-medium text-white">
            Educación
          </p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <Laptop class="mx-auto text-blue-200" :size="24" />
          <p class="mt-2 text-sm font-medium text-white">
            Tecnología
          </p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <MapPin class="mx-auto text-blue-200" :size="24" />
          <p class="mt-2 text-sm font-medium text-white">
            Turismo
          </p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
          <ShoppingBag class="mx-auto text-blue-200" :size="24" />
          <p class="mt-2 text-sm font-medium text-white">
            Comercio
          </p>
        </div>
      </div>
    </div>
  </section>


  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <span class="text-sm font-semibold uppercase tracking-wider text-[#ed8936]">
          Mantente informado
        </span>
        <h2 class="mt-2 text-3xl font-bold text-[#1a365d] sm:text-4xl">
          Noticias destacadas
        </h2>
        <p class="mt-3 max-w-2xl text-slate-600">
          Descubre algunas de las noticias más recientes de Tecnoticias.
        </p>
      </div>
      <RouterLink to="/noticias"
        class="inline-flex items-center gap-2 font-semibold text-[#2b6cb0] hover:text-[#1a365d]">
        Ver todas
        <ArrowRight :size="18" />
      </RouterLink>
    </div>


    <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NewsCard v-for="noticia in noticiasStore.noticiasDestacadas" :key="noticia.id" :noticia="noticia"
        :favorito="noticiasStore.esFavorito(noticia.id)" @favorite="toggleFavorito" />
    </div>
  </section>


  <section class="bg-slate-100">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-[#ed8936]">
          Nuestra propuesta
        </span>
        <h2 class="mt-2 text-3xl font-bold text-[#1a365d] sm:text-4xl">
          ¿Por qué Tecnoticias?
        </h2>
        <p class="mt-4 text-slate-600">
          Una plataforma pensada para encontrar información
          de manera clara, sencilla y organizada.
        </p>
      </div>


      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div class="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2b6cb0]">
            <BookOpen :size="24" />
          </div>
          <h3 class="mt-5 text-lg font-bold text-[#1a365d]">
            Información clara
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            Contenido organizado para que puedas encontrar
            rápidamente la información que buscas.
          </p>
        </div>


        <div class="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ed8936]">
            <Laptop :size="24" />
          </div>
          <h3 class="mt-5 text-lg font-bold text-[#1a365d]">
            Diferentes categorías
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            Educación, tecnología, turismo y comercio
            reunidos en un solo lugar.
          </p>
        </div>


        <div class="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2b6cb0]">
            <MapPin :size="24" />
          </div>
          <h3 class="mt-5 text-lg font-bold text-[#1a365d]">
            Tu información favorita
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            Guarda las noticias que más te interesan
            y consúltalas cuando quieras.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>