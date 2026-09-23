<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
    Menu,
    X,
    Newspaper,
} from 'lucide-vue-next'

const isMenuOpen = ref(false)

const closeMenu = () => {
    isMenuOpen.value = false
}
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-white/10 bg-[#1a365d] shadow-lg">
        <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <RouterLink to="/" class="flex items-center gap-2 text-white transition-opacity hover:opacity-90"
                @click="closeMenu">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ed8936]">
                    <Newspaper :size="22" />
                </div>
                <div>
                    <span class="block text-xl font-bold tracking-tight">
                        Tecnoticias
                    </span>

                    <span class="hidden text-xs text-blue-200 sm:block">
                        Las noticias que importan
                    </span>
                </div>
            </RouterLink>

            <div class="hidden items-center gap-1 md:flex">
                <RouterLink to="/"
                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    active-class="bg-white/15">
                    Inicio
                </RouterLink>
                <RouterLink to="/noticias"
                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    active-class="bg-white/15">
                    Noticias
                </RouterLink>
                <RouterLink to="/favoritos"
                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    active-class="bg-white/15">
                    Favoritos
                </RouterLink>
                <RouterLink to="/gestionar"
                    class="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    active-class="bg-white/15">
                    Gestionar
                </RouterLink>
                <RouterLink to="/contacto"
                    class="ml-2 rounded-lg bg-[#ed8936] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dd7728]"
                    active-class="ring-2 ring-white/50">
                    Contacto
                </RouterLink>
            </div>
            <button type="button" class="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
                :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'" @click="isMenuOpen = !isMenuOpen">
                <X v-if="isMenuOpen" :size="26" />
                <Menu v-else :size="26" />
            </button>
        </nav>

        <div v-if="isMenuOpen" class="border-t border-white/10 bg-[#1a365d] px-4 pb-4 md:hidden">
            <div class="flex flex-col gap-1 pt-3">
                <RouterLink to="/" class="rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                    active-class="bg-white/15" @click="closeMenu">
                    Inicio
                </RouterLink>
                <RouterLink to="/noticias" class="rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                    active-class="bg-white/15" @click="closeMenu">
                    Noticias
                </RouterLink>
                <RouterLink to="/favoritos"
                    class="rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                    active-class="bg-white/15" @click="closeMenu">
                    Favoritos
                </RouterLink>
                <RouterLink to="/gestionar"
                    class="rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
                    active-class="bg-white/15" @click="closeMenu">
                    Gestionar
                </RouterLink>
                <RouterLink to="/contacto"
                    class="rounded-lg bg-[#ed8936] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#dd7728]"
                    active-class="ring-2 ring-white/50" @click="closeMenu">
                    Contacto
                </RouterLink>

            </div>
        </div>
    </header>
</template>