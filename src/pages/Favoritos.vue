<script setup lang="ts">
import { Heart } from 'lucide-vue-next'

import NewsCard from '../components/news/NewsCard.vue'
import { useNoticiasStore } from '../stores/noticias'

const noticiasStore = useNoticiasStore()
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <section class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div class="max-w-3xl">

          <div class="w-12 h-12 mb-5 rounded-xl bg-orange-100 flex items-center justify-center">
            <Heart :size="25" class="text-orange-500" fill="currentColor" />
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-[#1a365d]">
            Mis Favoritos
          </h1>

          <p class="mt-4 text-lg text-slate-600">
            Guarda las noticias que más te interesan y consúltalas cuando
            quieras.
          </p>

        </div>

      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <template v-if="noticiasStore.noticiasFavoritas.length > 0">
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-slate-500">
            {{ noticiasStore.noticiasFavoritas.length }}
            {{
              noticiasStore.noticiasFavoritas.length === 1
                ? 'noticia guardada'
                : 'noticias guardadas'
            }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard v-for="noticia in noticiasStore.noticiasFavoritas" :key="noticia.id" :noticia="noticia"
            :favorito="true" @favorite="noticiasStore.toggleFavorito(noticia.id)" />
        </div>
      </template>

      <div v-else class="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-10 md:p-14 text-center">
        <div class="w-20 h-20 mx-auto rounded-full bg-orange-50 flex items-center justify-center">
          <Heart :size="38" class="text-orange-400" />
        </div>
        <h2 class="mt-6 text-2xl font-bold text-[#1a365d]">
          Aún no tienes favoritos
        </h2>
        <p class="mt-3 text-slate-500 leading-7">
          Cuando encuentres una noticia que quieras guardar, haz clic en el
          corazón para agregarla a tus favoritos.
        </p>
        <RouterLink to="/noticias"
          class="inline-flex items-center justify-center mt-7 px-6 py-3 rounded-xl bg-[#1a365d] text-white font-semibold hover:bg-[#2b6cb0] transition">
          Explorar noticias
        </RouterLink>
      </div>
    </section>
  </main>
</template>