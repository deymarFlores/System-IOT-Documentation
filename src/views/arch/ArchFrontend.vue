<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import FlowNode from '../../components/FlowNode.vue'

const nodeTypes = { box: FlowNode }

const nodes = ref([
  {
    id: 'browser',
    type: 'box',
    position: { x: 0, y: 220 },
    data: {
      klass: 'Cliente',
      label: 'Browser / SPA',
      sub: 'Vue 3 · Vite build',
      color: '#1e40af',
      colorDark: '#1e3a8a'
    }
  },

  {
    id: 'router',
    type: 'box',
    position: { x: 280, y: 220 },
    data: {
      klass: 'Enrutamiento',
      label: 'Vue Router 4',
      sub: 'hash history · beforeEach · meta.requiredRoles',
      color: '#7c3aed',
      colorDark: '#5b21b6'
    }
  },

  {
    id: 'views',
    type: 'box',
    position: { x: 580, y: 60 },
    data: {
      klass: 'Vistas',
      label: 'Páginas / Vistas',
      sub: 'Login · Overview · Sensores · Actuadores · Notif.',
      color: '#0f766e',
      colorDark: '#115e59'
    }
  },

  {
    id: 'stores',
    type: 'box',
    position: { x: 580, y: 380 },
    data: {
      klass: 'Estado Global',
      label: 'Pinia Stores',
      sub: 'auth · telemetry · notifications · app',
      color: '#7c3aed',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'http',
    type: 'box',
    position: { x: 880, y: 220 },
    data: {
      klass: 'HTTP Client',
      label: 'Axios + Servicios',
      sub: 'JWT Bearer · auto-refresh :401 · withCredentials',
      color: '#1d4ed8',
      colorDark: '#1e3a8a'
    }
  },

  {
    id: 'ws',
    type: 'box',
    position: { x: 880, y: 460 },
    data: {
      klass: 'Tiempo Real',
      label: 'WS Client',
      sub: 'heartbeat 30s · reconexion x5 · backoff exp.',
      color: '#6d28d9',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'backend',
    type: 'box',
    position: { x: 1180, y: 300 },
    data: {
      klass: 'API',
      label: 'FastAPI',
      sub: 'REST :8000 · WS /IotSystem/v1.0.1/ws',
      color: '#334155',
      colorDark: '#1e293b'
    }
  }
])

const edges = ref([
  {
    id: 'e1',
    source: 'browser',
    sourceHandle: 'right-source',
    target: 'router',
    targetHandle: 'left-target',
    label: 'Cambio de ruta hash',
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    labelStyle: { fill: '#93c5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e2',
    source: 'router',
    sourceHandle: 'top-source',
    target: 'views',
    targetHandle: 'left-target',
    label: 'Ruta coincide · renderiza',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    labelStyle: { fill: '#c4b5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e3',
    source: 'router',
    sourceHandle: 'bottom-source',
    target: 'stores',
    targetHandle: 'left-target',
    label: 'Guard: isAuthenticated · rol',
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 1.5, strokeDasharray: '5,3' },
    labelStyle: { fill: '#c4b5fd', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e4',
    source: 'views',
    sourceHandle: 'bottom-source',
    target: 'stores',
    targetHandle: 'top-target',
    label: 'useStore() · acciones · estado reactivo',
    type: 'smoothstep',
    style: { stroke: '#0f766e', strokeWidth: 2 },
    labelStyle: { fill: '#5eead4', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e5',
    source: 'stores',
    sourceHandle: 'right-source',
    target: 'http',
    targetHandle: 'left-target',
    label: 'Llama servicio HTTP',
    type: 'smoothstep',
    style: { stroke: '#2563eb', strokeWidth: 2 },
    labelStyle: { fill: '#93c5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e6',
    source: 'stores',
    sourceHandle: 'bottom-source',
    target: 'ws',
    targetHandle: 'left-target',
    label: 'conecta WS al autenticar',
    type: 'smoothstep',
    style: { stroke: '#7c3aed', strokeWidth: 1.5, strokeDasharray: '5,3' },
    labelStyle: { fill: '#c4b5fd', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e7',
    source: 'http',
    sourceHandle: 'right-source',
    target: 'backend',
    targetHandle: 'left-target',
    label: 'HTTPS · JWT Bearer · cookie HttpOnly',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    labelStyle: { fill: '#93c5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e8',
    source: 'backend',
    sourceHandle: 'bottom-source',
    target: 'ws',
    targetHandle: 'right-target',
    label: 'WS push: telemetría · estado · notif.',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#9333ea', strokeWidth: 2 },
    labelStyle: { fill: '#d8b4fe', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  {
    id: 'e9',
    source: 'ws',
    sourceHandle: 'top-source',
    target: 'stores',
    targetHandle: 'right-target',
    label: 'actualiza telemetría · notificaciones',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    labelStyle: { fill: '#86efac', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  }
])
</script>

<template>
  <div class="arch-view">
    <div class="view-header">
      <h1>Arquitectura Frontend</h1>
      <p class="description">SPA Vue 3 — enrutamiento con guards, stores Pinia, cliente HTTP con JWT, WebSocket en tiempo real</p>
    </div>

    <div class="flow-wrap">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        fit-view-on-init
        :fit-view-options="{ padding: 0.2 }"
        class="dark-flow"
        :min-zoom="0.25"
        :max-zoom="2.5"
        :default-viewport="{ zoom: 0.75 }"
      />
    </div>

    <div class="section-title" style="margin-top:1.75rem">Pinia Stores</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Store</th><th>Estado principal</th><th>Proposito</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="cell-code">auth</code></td>
            <td><code class="cell-code">user · isAuthenticated · isLoadingSession</code></td>
            <td>Sesion del usuario — login, logout, restaurar sesion desde cookie HttpOnly</td>
          </tr>
          <tr>
            <td><code class="cell-code">telemetry</code></td>
            <td><code class="cell-code">telemetryData (Map) · actuatorStates (Map) · isConnected</code></td>
            <td>Datos en tiempo real de sensores y actuadores — actualizados por WebSocket</td>
          </tr>
          <tr>
            <td><code class="cell-code">notifications</code></td>
            <td><code class="cell-code">notifications[] · unreadCount · isLoading</code></td>
            <td>Alertas del sistema — recibidas por WS y sincronizadas entre pestanas</td>
          </tr>
          <tr>
            <td><code class="cell-code">app</code></td>
            <td><code class="cell-code">isRestoringSession</code></td>
            <td>Estado global de UI — bloquea la interfaz durante restauracion de sesion</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-title" style="margin-top:1.5rem">Rutas principales</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Ruta</th><th>Vista</th><th>Auth</th><th>Rol</th></tr>
        </thead>
        <tbody>
          <tr><td><code class="cell-code">/login</code></td><td>LoginView</td><td>No</td><td>—</td></tr>
          <tr><td><code class="cell-code">/home/overview</code></td><td>OverviewDashboardView</td><td>Si</td><td>Cualquiera</td></tr>
          <tr><td><code class="cell-code">/home/sensors</code></td><td>SensorDashboardView</td><td>Si</td><td>Cualquiera</td></tr>
          <tr><td><code class="cell-code">/home/sensors/:sensorId</code></td><td>SensorDetailPanel</td><td>Si</td><td>Cualquiera</td></tr>
          <tr><td><code class="cell-code">/home/sensors/:sensorId/history</code></td><td>SensorHistoryView</td><td>Si</td><td>Cualquiera</td></tr>
          <tr><td><code class="cell-code">/home/actuators</code></td><td>ActuatorsDashboardView</td><td>Si</td><td>Cualquiera</td></tr>
          <tr><td><code class="cell-code">/home/notifications</code></td><td>NotificationsDashboardView</td><td>Si</td><td>Cualquiera</td></tr>
          <tr><td><code class="cell-code">/home/sensormanagement</code></td><td>SensorsManagementView</td><td>Si</td><td>Admin</td></tr>
          <tr><td><code class="cell-code">/home/actuatormanagement</code></td><td>ActuatorsManagementView</td><td>Si</td><td>Admin</td></tr>
          <tr><td><code class="cell-code">/home/userscrud</code></td><td>UsersCrudDashboardView</td><td>Si</td><td>Admin</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-title" style="margin-top:1.5rem">WebSocket — Tipos de mensaje entrante</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>type</th><th>Campos clave</th><th>Handler en store</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="cell-code">telemetry</code></td>
            <td><code class="cell-code">sensorId · engValue · updateAt</code></td>
            <td><code class="cell-code">telemetryStore.updateTelemetry()</code></td>
          </tr>
          <tr>
            <td><code class="cell-code">state</code></td>
            <td><code class="cell-code">actuatorId · state · updateAt</code></td>
            <td><code class="cell-code">telemetryStore.updateActuatorState()</code></td>
          </tr>
          <tr>
            <td><code class="cell-code">notification</code></td>
            <td>objeto notificacion completo</td>
            <td><code class="cell-code">notificationsStore.handleWebSocketNotification()</code></td>
          </tr>
          <tr>
            <td><code class="cell-code">notification_deleted</code></td>
            <td><code class="cell-code">ids[]</code></td>
            <td><code class="cell-code">notificationsStore.handleNotificationDeleted()</code></td>
          </tr>
          <tr>
            <td><code class="cell-code">notification_read</code></td>
            <td><code class="cell-code">ids[]</code></td>
            <td><code class="cell-code">notificationsStore.handleNotificationRead()</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-title" style="margin-top:1.5rem">Autenticacion HTTP — Flujo JWT</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Aspecto</th><th>Detalle</th></tr>
        </thead>
        <tbody>
          <tr><td>Access token</td><td>Almacenado en <strong>memoria</strong> (no localStorage). Se pierde al recargar.</td></tr>
          <tr><td>Refresh token</td><td>Cookie <code class="cell-code">HttpOnly</code> — el navegador la envia automaticamente, JS no puede leerla.</td></tr>
          <tr><td>Interceptor request</td><td>Agrega <code class="cell-code">Authorization: Bearer &lt;token&gt;</code> si existe access token.</td></tr>
          <tr><td>Interceptor :401</td><td>Llama <code class="cell-code">POST /user/refresh-token</code>, obtiene nuevo access token, reintenta peticion original.</td></tr>
          <tr><td>Restauracion de sesion</td><td>Al arrancar la app, intenta <code class="cell-code">GET /auth/me</code>; si falla 401, hace refresh desde cookie; si falla, va a /login.</td></tr>
          <tr><td>WS autenticacion</td><td>Al conectar WS envia mensaje <code class="cell-code">&#123; type: 'auth', token: &lt;access_token&gt; &#125;</code></td></tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>
.flow-wrap {
  height: 580px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
}
.dark-flow { background: #0d1117; }
</style>
