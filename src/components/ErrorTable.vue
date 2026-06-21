<script setup>
defineProps({
  errors: { type: Array, required: true },
})

function httpClass(code) {
  if (code >= 500) return 'http-5xx'
  if (code >= 400) return 'http-4xx'
  return 'http-2xx'
}
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:80px">Codigo HTTP</th>
          <th style="min-width:180px">Endpoint</th>
          <th style="min-width:160px">Causa</th>
          <th style="min-width:200px">Respuesta del Backend</th>
          <th style="min-width:180px">Comportamiento Frontend</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(err, i) in errors" :key="i">
          <td><span class="badge" :class="httpClass(err.code)">{{ err.code }}</span></td>
          <td><code style="font-size:0.75rem; font-family: var(--font-mono)">{{ err.endpoint }}</code></td>
          <td>{{ err.cause }}</td>
          <td><code class="cell-code" style="font-size:0.72rem">{{ err.response }}</code></td>
          <td>{{ err.frontend }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
