<script setup>
const systemLayers = [
  { layer: 'Frontend', protocol: 'HTTP REST + JWT', description: 'Peticiones CRUD: usuarios, sensores, actuadores, grupos, notificaciones, historial' },
  { layer: 'Backend â†’ Frontend', protocol: 'WebSocket (/ws)', description: 'Telemetria en tiempo real, estados de actuadores, notificaciones push' },
  { layer: 'Backend â†” Hardware', protocol: 'MQTT (EMQX)', description: 'Comunicacion con IOT2050 (Linux embedded) y PLC S7-1200' },
]

const cards = [
  { title: 'Documentacion', desc: 'Flujos completos de cada feature: Frontend, Backend y MQTT.', to: '/docs/auth/login', icon: '&#128218;' },
  { title: 'Protocolos', desc: 'Verifica cada paso de los flujos con tablas interactivas.', to: '/protocols/auth/login', icon: '&#9745;' },
  { title: 'Base de Datos', desc: 'Colecciones MongoDB: campos, tipos y descripcion.', to: '/database', icon: '&#128451;' },
  { title: 'VPS', desc: 'Despliegue, contenedores, logs y actualizacion de codigo.', to: '/vps', icon: '&#128268;' },
]
</script>

<template>
  <div>
    <div class="home-hero">
      <h1>EcoFresh â€” Documentacion del Sistema</h1>
      <p>Plataforma IoT para monitoreo y control de dispositivos industriales. API v1.0.1 | monitoreohidro.com</p>
    </div>

    <div class="cards-grid">
      <router-link v-for="card in cards" :key="card.title" :to="card.to" class="card">
        <div class="card-title"><span v-html="card.icon" style="margin-right:0.4rem"></span>{{ card.title }}</div>
        <div class="card-desc">{{ card.desc }}</div>
        <div class="card-arrow">Ver &rarr;</div>
      </router-link>
    </div>

    <p class="section-title">Capas de Comunicacion</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Capa</th>
            <th>Protocolo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in systemLayers" :key="row.layer">
            <td><strong>{{ row.layer }}</strong></td>
            <td><code style="font-size:0.8rem; font-family: var(--font-mono)">{{ row.protocol }}</code></td>
            <td>{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="section-title">Roles del Sistema</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Rol</th><th>Descripcion</th><th>Capacidades</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code style="font-family:var(--font-mono)">admin</code></td>
            <td>Administrador total</td>
            <td>CRUD completo: usuarios, sensores, actuadores, grupos, notificaciones</td>
          </tr>
          <tr>
            <td><code style="font-family:var(--font-mono)">avanzado</code></td>
            <td>Administrador avanzado</td>
            <td>CRUD sensores, actuadores, grupos, control. Sin gestion de usuarios</td>
          </tr>
          <tr>
            <td><code style="font-family:var(--font-mono)">basico</code></td>
            <td>Solo lectura</td>
            <td>Lectura de sensores, actuadores, grupos y notificaciones</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

