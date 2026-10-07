<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  FilePlus2,
  Trash2,
  X,
} from 'lucide-vue-next'

import { useNoticiasStore } from '../stores/noticias'
import type { Categoria, Noticia } from '../types/noticia'

const noticiasStore = useNoticiasStore()

const mostrarFormulario = ref(false)

const formulario = reactive({
  titulo: '',
  descripcion: '',
  imagen: '',
  categoria: 'Tecnología' as Categoria,
  contenido: '',
  autor: '',
  fecha: '',
})

const errores = ref<Record<string, string>>({})

const mensajeExito = ref('')

const noticiasOrdenadas = computed(() => {
  return [...noticiasStore.noticias].sort(
    (a, b) => b.id - a.id
  )
})

const limpiarFormulario = () => {
  formulario.titulo = ''
  formulario.descripcion = ''
  formulario.imagen = ''
  formulario.categoria = 'Tecnología'
  formulario.contenido = ''
  formulario.autor = ''
  formulario.fecha = ''

  errores.value = {}
}

const abrirFormulario = () => {
  limpiarFormulario()
  mensajeExito.value = ''
  mostrarFormulario.value = true
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  limpiarFormulario()
}

const validarFormulario = () => {
  const nuevosErrores: Record<string, string> = {}

  if (!formulario.titulo.trim()) {
    nuevosErrores.titulo = 'El título es obligatorio.'
  }

  if (!formulario.descripcion.trim()) {
    nuevosErrores.descripcion = 'La descripción es obligatoria.'
  }

  if (!formulario.imagen.trim()) {
    nuevosErrores.imagen = 'La URL de la imagen es obligatoria.'
  }

  if (!formulario.contenido.trim()) {
    nuevosErrores.contenido = 'El contenido es obligatorio.'
  }

  if (!formulario.autor.trim()) {
    nuevosErrores.autor = 'El autor es obligatorio.'
  }

  if (!formulario.fecha) {
    nuevosErrores.fecha = 'La fecha es obligatoria.'
  }

  errores.value = nuevosErrores

  return Object.keys(nuevosErrores).length === 0
}

const crearNoticia = () => {
  mensajeExito.value = ''

  if (!validarFormulario()) {
    return
  }

  const nuevaNoticia: Noticia = {
    id: noticiasStore.generarNuevoId(),
    titulo: formulario.titulo.trim(),
    descripcion: formulario.descripcion.trim(),
    imagen: formulario.imagen.trim(),
    categoria: formulario.categoria,
    contenido: formulario.contenido.trim(),
    fecha: formulario.fecha,
    autor: formulario.autor.trim(),
  }

  noticiasStore.agregarNoticia(nuevaNoticia)

  mensajeExito.value = 'La noticia fue creada correctamente.'

  cerrarFormulario()

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const eliminarNoticia = (id: number, titulo: string) => {
  const confirmar = window.confirm(
    `¿Seguro que deseas eliminar la noticia "${titulo}"?`
  )

  if (!confirmar) {
    return
  }

  noticiasStore.eliminarNoticia(id)

  mensajeExito.value = 'La noticia fue eliminada correctamente.'

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <section class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wider text-orange-500 mb-3">
              Administración
            </p>
            <h1 class="text-4xl md:text-5xl font-bold text-[#1a365d]">
              Gestionar Noticias
            </h1>
            <p class="mt-4 text-lg text-slate-600 max-w-2xl">
              Crea nuevas noticias y administra el contenido disponible
              en Tecnoticias.
            </p>
          </div>
          <button type="button" @click="abrirFormulario"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1a365d] text-white font-semibold hover:bg-[#2b6cb0] transition">
            <FilePlus2 :size="20" />
            Nueva noticia
          </button>
        </div>
      </div>
    </section>
    <section v-if="mensajeExito" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
        {{ mensajeExito }}
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-[#1a365d]">
          Noticias registradas
        </h2>
        <p class="mt-1 text-slate-500">
          {{ noticiasStore.noticias.length }}
          {{
            noticiasStore.noticias.length === 1
              ? 'noticia registrada'
              : 'noticias registradas'
          }}
        </p>
      </div>
      <div v-if="noticiasOrdenadas.length > 0" class="space-y-4">
        <article v-for="noticia in noticiasOrdenadas" :key="noticia.id"
          class="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row gap-5">
          <img :src="noticia.imagen" :alt="noticia.titulo" class="w-full md:w-48 h-32 object-cover rounded-xl" />
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                {{ noticia.categoria }}
              </span>
              <span class="text-xs text-slate-400">
                #{{ noticia.id }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-[#1a365d]">
              {{ noticia.titulo }}
            </h3>
            <p class="mt-2 text-slate-600 line-clamp-2">
              {{ noticia.descripcion }}
            </p>
            <div class="mt-3 flex flex-wrap gap-4 text-sm text-slate-400">
              <span>{{ noticia.fecha }}</span>
              <span>{{ noticia.autor }}</span>
            </div>
          </div>

          <div class="flex md:items-center">
            <button type="button" @click="eliminarNoticia(noticia.id, noticia.titulo)"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition">
              <Trash2 :size="18" />
              Eliminar
            </button>
          </div>
        </article>
      </div>
    </section>

    <div v-if="mostrarFormulario" class="fixed inset-0 z-50 bg-black/50 px-4 py-8 overflow-y-auto">
      <div class="min-h-full flex items-center justify-center">
        <div class="w-full max-w-3xl bg-white rounded-2xl shadow-xl">
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div>
              <h2 class="text-2xl font-bold text-[#1a365d]">
                Nueva noticia
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Completa los datos para publicar una noticia.
              </p>
            </div>
            <button type="button" @click="cerrarFormulario"
              class="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
              <X :size="22" />
            </button>
          </div>

          <form @submit.prevent="crearNoticia" class="p-6 space-y-5">
            <div>
              <label for="titulo" class="block text-sm font-semibold text-slate-700 mb-2">
                Título
              </label>
              <input id="titulo" v-model="formulario.titulo" type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
                placeholder="Título de la noticia" />
              <p v-if="errores.titulo" class="mt-1 text-sm text-red-500">
                {{ errores.titulo }}
              </p>
            </div>

            <div>
              <label for="descripcion" class="block text-sm font-semibold text-slate-700 mb-2">
                Descripción
              </label>
              <textarea id="descripcion" v-model="formulario.descripcion" rows="3"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
                placeholder="Breve descripción de la noticia"></textarea>

              <p v-if="errores.descripcion" class="mt-1 text-sm text-red-500">
                {{ errores.descripcion }}
              </p>
            </div>
            <div>
              <label for="imagen" class="block text-sm font-semibold text-slate-700 mb-2">
                URL de la imagen
              </label>
              <input id="imagen" v-model="formulario.imagen" type="url"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
                placeholder="https://..." />
              <p v-if="errores.imagen" class="mt-1 text-sm text-red-500">
                {{ errores.imagen }}
              </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label for="categoria" class="block text-sm font-semibold text-slate-700 mb-2">
                  Categoría
                </label>
                <select id="categoria" v-model="formulario.categoria"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100">
                  <option v-for="categoria in noticiasStore.categorias" :key="categoria" :value="categoria">
                    {{ categoria }}
                  </option>
                </select>
              </div>
              <div>
                <label for="fecha" class="block text-sm font-semibold text-slate-700 mb-2">
                  Fecha
                </label>
                <input id="fecha" v-model="formulario.fecha" type="date"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100" />
                <p v-if="errores.fecha" class="mt-1 text-sm text-red-500">
                  {{ errores.fecha }}
                </p>
              </div>
            </div>
            <div>
              <label for="autor" class="block text-sm font-semibold text-slate-700 mb-2">
                Autor
              </label>
              <input id="autor" v-model="formulario.autor" type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
                placeholder="Nombre del autor" />
              <p v-if="errores.autor" class="mt-1 text-sm text-red-500">
                {{ errores.autor }}
              </p>
            </div>
            <div>
              <label for="contenido" class="block text-sm font-semibold text-slate-700 mb-2">
                Contenido
              </label>
              <textarea id="contenido" v-model="formulario.contenido" rows="7"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none resize-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
                placeholder="Contenido completo de la noticia"></textarea>
              <p v-if="errores.contenido" class="mt-1 text-sm text-red-500">
                {{ errores.contenido }}
              </p>
            </div>
            <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
              <button type="button" @click="cerrarFormulario"
                class="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition">
                Cancelar
              </button>
              <button type="submit"
                class="px-5 py-3 rounded-xl bg-[#1a365d] text-white font-semibold hover:bg-[#2b6cb0] transition">
                Crear noticia
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>