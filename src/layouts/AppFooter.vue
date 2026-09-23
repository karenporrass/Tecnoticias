<template>
  <footer class="bg-[#1a365d] text-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <h2 class="text-xl font-bold">
            Tecnoticias
          </h2>
          <p class="mt-3 max-w-sm text-sm leading-6 text-blue-200">
            Descubre noticias y experiencias sobre educación,
            tecnología, turismo y comercio.
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider">
            Navegación
          </h3>
          <div class="mt-4 flex flex-col gap-2">
            <RouterLink to="/" class="text-sm text-blue-200 transition hover:text-white">
              Inicio
            </RouterLink>
            <RouterLink to="/noticias" class="text-sm text-blue-200 transition hover:text-white">
              Noticias
            </RouterLink>
            <RouterLink to="/favoritos" class="text-sm text-blue-200 transition hover:text-white">
              Favoritos
            </RouterLink>
            <RouterLink to="/gestionar" class="text-sm text-blue-200 transition hover:text-white">
              Gestionar
            </RouterLink>
            <RouterLink to="/contacto" class="text-sm text-blue-200 transition hover:text-white">
              Contacto
            </RouterLink>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider">
            Contacto
          </h3>

          <div class="mt-4 space-y-2 text-sm text-blue-200">
            <p>contacto@tecnoticias.com</p>
            <p>Bucaramanga, Colombia</p>
          </div>
        </div>
      </div>
      <div class="mt-10 border-t border-white/10 pt-6">
        <p class="text-center text-xs text-blue-300">
          © {{ new Date().getFullYear() }} Tecnoticias.
          Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>