<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineEmits(['toggle-sidebar'])

const route = useRoute()

const activeSection = computed(() => {
  if (route.path.startsWith('/protocols')) return 'protocols'
  if (route.path.startsWith('/database')) return 'database'
  if (route.path.startsWith('/vps')) return 'vps'
  return 'docs'
})
</script>

<template>
  <header class="navbar">
    <div class="navbar-left">
      <button class="hamburger" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">&#9776;</button>
      <router-link to="/" class="navbar-logo">System<span>IOT</span> DOCS</router-link>
    </div>
    <nav class="navbar-nav">
      <router-link to="/docs/arch/general" :class="{ active: activeSection === 'docs' }">Documentacion</router-link>
      <router-link to="/database" :class="{ active: activeSection === 'database' }">Base de Datos</router-link>
      <router-link to="/vps" :class="{ active: activeSection === 'vps' }">VPS</router-link>
      <router-link
        to="/protocols/auth/login"
        class="protocols-btn"
        :class="{ active: activeSection === 'protocols' }"
      >Protocolos</router-link>
    </nav>
  </header>
</template>
