<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collections } from '../data/database.js'

const route = useRoute()

const active = computed(() => route.params.collection || null)

const current = computed(() =>
  active.value ? collections.find(c => c.name === active.value) : null
)
</script>

<template>
  <div>
    <div class="view-header">
      <h1>Base de Datos <span class="module-badge">MongoDB</span></h1>
      <p class="description">Colecciones del sistema EcoFresh. Motor: MongoDB Atlas / local. ORM: Motor (async Python).</p>
    </div>

    <div v-if="!active">
      <p class="section-title">Colecciones</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Coleccion</th>
              <th>Descripcion</th>
              <th>Campos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="col in collections" :key="col.name">
              <td>
                <router-link :to="`/database/${col.name}`" class="collection-link">
                  <code style="font-family:var(--font-mono); color:var(--accent)">{{ col.name }}</code>
                </router-link>
              </td>
              <td>{{ col.description }}</td>
              <td>{{ col.fields.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else-if="current">
      <router-link to="/database" class="back-link">&larr; Todas las colecciones</router-link>

      <div class="collection-block" style="margin-top:1.25rem">
        <div class="collection-name">{{ current.name }}</div>
        <p class="collection-desc">{{ current.description }}</p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Tipo</th>
                <th>Requerido</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in current.fields" :key="field.name">
                <td><code style="font-family:var(--font-mono); font-size:0.8rem">{{ field.name }}</code></td>
                <td><code style="font-family:var(--font-mono); font-size:0.75rem; color:#7c3aed">{{ field.type }}</code></td>
                <td>
                  <span class="required-yes" v-if="field.required">SI</span>
                  <span class="required-no" v-else>opcional</span>
                </td>
                <td>{{ field.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Coleccion no encontrada</h2>
      <p>{{ active }}</p>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.875rem;
}
.back-link:hover { text-decoration: underline; }
.collection-link { text-decoration: none; }
.collection-link:hover code { text-decoration: underline; }
</style>
