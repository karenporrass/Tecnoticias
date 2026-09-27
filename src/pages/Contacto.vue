<script setup lang="ts">

import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const asunto = ref('')
const mensaje = ref('')
const enviado = ref(false)

const enviarFormulario = () => {
  if (
    !nombre.value ||
    !correo.value ||
    !asunto.value ||
    !mensaje.value
  ) {
    alert('Por favor, completa todos los campos.')
    return
  }

  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!formatoCorreo.test(correo.value)) {
    alert('Por favor, ingresa un correo electrónico válido.')
    return
  }

  console.log('Nombre:', nombre.value)
  console.log('Correo:', correo.value)
  console.log('Asunto:', asunto.value)
  console.log('Mensaje:', mensaje.value)

  enviado.value = true

  nombre.value = ''
  correo.value = ''
  asunto.value = ''
  mensaje.value = ''
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    
    <div class="mx-auto max-w-2xl text-center">
      <span class="text-sm font-semibold uppercase tracking-wider text-[#ed8936]">
        Estamos para escucharte
      </span>

      <h1 class="mt-2 text-3xl font-bold text-[#1a365d] sm:text-4xl">
        Contáctanos
      </h1>

      <p class="mt-4 text-slate-600">
        ¿Tienes una pregunta, sugerencia o comentario?
        Escríbenos y estaremos atentos a tu mensaje.
      </p>
    </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-2">

      <!-- Información de contacto -->
      <div class="rounded-2xl bg-[#1a365d] p-8 text-white shadow-sm">
        <span class="text-sm font-semibold uppercase tracking-wider text-orange-300">
          Hablemos
        </span>

        <h2 class="mt-2 text-2xl font-bold">
          Queremos conocer tu opinión
        </h2>

        <p class="mt-4 leading-7 text-blue-100">
          Si tienes una pregunta, sugerencia o quieres compartir
          una noticia, puedes escribirnos. Tu opinión nos ayuda
          a seguir mejorando nuestra plataforma.
        </p>

        <div class="mt-8 space-y-5">

          <div>
            <p class="text-sm text-blue-200">
              Correo electrónico
            </p>
            <p class="mt-1 font-medium">
              contacto@tecnoticias.com
            </p>
          </div>

          <div>
            <p class="text-sm text-blue-200">
              Categorías
            </p>
            <p class="mt-1 font-medium">
              Educación · Tecnología · Turismo · Comercio
            </p>
          </div>

        </div>
      </div>


      <!-- Formulario -->
      <div class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

        <h2 class="text-2xl font-bold text-[#1a365d]">
          Envíanos un mensaje
        </h2>

        <p class="mt-2 text-sm text-slate-600">
          Completa los siguientes campos.
        </p>

        <form
          class="mt-8 space-y-5"
          @submit.prevent="enviarFormulario"
        >

          <!-- Nombre -->
          <div>
            <label class="block text-sm font-semibold text-[#1a365d]">
              Nombre
            </label>

            <input
              v-model="nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              @input="enviado = false"
              class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
            />
          </div>


          <!-- Correo -->
          <div>
            <label class="block text-sm font-semibold text-[#1a365d]">
              Correo electrónico
            </label>


            <input
              v-model="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              @input="enviado = false"
              class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
            />
          </div>


          <!-- Asunto -->
          <div>
            <label class="block text-sm font-semibold text-[#1a365d]">
              Asunto
            </label>

            <input
              v-model="asunto"
              type="text"
              placeholder="¿Sobre qué quieres escribirnos?"
              @input="enviado = false"
              class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
            />
          </div>


          <!-- Mensaje -->
          <div>
            <label class="block text-sm font-semibold text-[#1a365d]">
              Mensaje
            </label>

            <textarea
              v-model="mensaje"
              rows="5"
              placeholder="Escribe tu mensaje..."
              @input="enviado = false"
              class="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#2b6cb0] focus:ring-2 focus:ring-blue-100"
            ></textarea>
          </div>


          <!-- Botón -->
          <button
            type="submit"
            class="w-full rounded-xl bg-[#ed8936] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#dd7728]"
          >
            Enviar mensaje
          </button>

          <div
            v-if="enviado"
            class="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700"
          >
            ¡Mensaje enviado correctamente! Gracias por contactarnos.
          </div>
        </form>

      </div>

    </div>

  </section>
</template>