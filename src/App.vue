<script setup>
import { ref } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import AppSidebar from './components/AppSidebar.vue'

const sidebarOpen = ref(true)
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="app-layout">
    <AppNavbar @toggle-sidebar="toggleSidebar" />
    <div class="app-body">
      <AppSidebar :open="sidebarOpen" />
      <main class="app-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
