<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import FlowNode from '../../components/FlowNode.vue'

const nodeTypes = { box: FlowNode }

const nodes = ref([
  {
    id: 'plc',
    type: 'box',
    position: { x: 0, y: 0 },
    data: {
      klass: 'PLC',
      label: 'S7-1200',
      sub: 'Siemens · PROFINET',
      color: '#dc2626',
      colorDark: '#7f1d1d'
    }
  },

  {
    id: 'iot2050',
    type: 'box',
    position: { x: 0, y: 220 },
    data: {
      klass: 'Dispositivo IoT',
      label: 'IOT2050',
      sub: 'iot2050_user · Paho 2.1',
      color: '#16a34a',
      colorDark: '#14532d'
    }
  },

  {
    id: 'emqx',
    type: 'box',
    position: { x: 400, y: 220 },
    data: {
      klass: 'Broker MQTT',
      label: 'EMQX',
      sub: 'v4.2.3 · :1883 / :8883 TLS / :8083 WS',
      color: '#0891b2',
      colorDark: '#0e4c6e'
    }
  },

  {
    id: 'backend',
    type: 'box',
    position: { x: 800, y: 220 },
    data: {
      klass: 'Backend',
      label: 'FastAPI',
      sub: 'backend_user · Paho Python',
      color: '#7c3aed',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'mongodb',
    type: 'box',
    position: { x: 400, y: 480 },
    data: {
      klass: 'Auth · ACL',
      label: 'MongoDB',
      sub: 'iotSystemBD · col. mqtt_user',
      color: '#b45309',
      colorDark: '#78350f'
    }
  },

  {
    id: 'mqtt_init',
    type: 'box',
    position: { x: 800, y: 480 },
    data: {
      klass: 'Inicialización',
      label: 'mqtt-init',
      sub: 'python:3.9-slim · arranque único',
      color: '#334155',
      colorDark: '#1e293b'
    }
  }
])

const edges = ref([
  // PLC → IOT2050
  {
    id: 'e_plc',
    source: 'plc',
    sourceHandle: 'bottom-source',
    target: 'iot2050',
    targetHandle: 'top-target',
    label: 'S7-COMM · TSEND',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },
    labelStyle: { fill: '#fed7aa', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  // IOT2050 → EMQX publish
  {
    id: 'e_iot_pub',
    source: 'iot2050',
    sourceHandle: 'right-source',
    target: 'emqx',
    targetHandle: 'top-target',
    label: 'PUBLICA: telemetría · estado · notif.*',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    labelStyle: { fill: '#86efac', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  // EMQX → IOT2050 deliver
  {
    id: 'e_iot_sub',
    source: 'emqx',
    sourceHandle: 'left-source',
    target: 'iot2050',
    targetHandle: 'right-target',
    label: 'ENTREGA: control · config · dispositivos',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#06b6d4', strokeWidth: 2, strokeDasharray: '6,3' },
    labelStyle: { fill: '#67e8f9', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  // EMQX → Backend deliver
  {
    id: 'e_be_sub',
    source: 'emqx',
    sourceHandle: 'right-source',
    target: 'backend',
    targetHandle: 'top-target',
    label: 'ENTREGA: telemetría · estado · notif.*',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    labelStyle: { fill: '#86efac', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  // Backend → EMQX publish
  {
    id: 'e_be_pub',
    source: 'backend',
    sourceHandle: 'left-source',
    target: 'emqx',
    targetHandle: 'right-target',
    label: 'PUBLICA: control · config · dispositivos',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '6,3' },
    labelStyle: { fill: '#c4b5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  // EMQX → MongoDB (auth + ACL)
  {
    id: 'e_auth',
    source: 'emqx',
    sourceHandle: 'bottom-source',
    target: 'mongodb',
    targetHandle: 'top-target',
    label: 'emqx_auth_mongo · credenciales + ACL',
    type: 'smoothstep',
    style: { stroke: '#d97706', strokeWidth: 1.5, strokeDasharray: '4,3' },
    labelStyle: { fill: '#fcd34d', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  },

  // mqtt-init → MongoDB
  {
    id: 'e_init',
    source: 'mqtt_init',
    sourceHandle: 'left-source',
    target: 'mongodb',
    targetHandle: 'right-target',
    label: 'crea documentos mqtt_user',
    type: 'smoothstep',
    style: { stroke: '#475569', strokeWidth: 1.5 },
    labelStyle: { fill: '#94a3b8', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [3, 6], labelBgBorderRadius: 3
  }
])
</script>

<template>
  <div class="arch-view">
    <div class="view-header">
      <h1>Arquitectura MQTT & Broker</h1>
      <p class="description">Flujo de mensajes MQTT — autenticacion MongoDB, ACL por usuario, topicos y control bidireccional</p>
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

    <div class="section-title" style="margin-top:1.75rem">Topicos MQTT</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Topico</th><th>Direccion</th><th>Publicador</th><th>Suscriptor</th></tr>
        </thead>
        <tbody>
          <tr><td><code class="cell-code">iotsystem/telemetry</code></td><td>Dispositivo → Backend</td><td>iot2050_user</td><td>backend_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/state</code></td><td>Dispositivo → Backend</td><td>iot2050_user</td><td>backend_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/notification/PLC</code></td><td>Dispositivo → Backend</td><td>iot2050_user</td><td>backend_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/notification/ACTUATOR</code></td><td>Dispositivo → Backend</td><td>iot2050_user</td><td>backend_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/notification/SENSOR</code></td><td>Dispositivo → Backend</td><td>iot2050_user</td><td>backend_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/control</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/device/ACTUATOR/CREATE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/device/SENSOR/CREATE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/config/ACTUATOR/UPDATE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/config/ACTUATOR/SCHEDULE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/config/ACTUATOR/SETPOINT</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/config/SENSOR/UPDATE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/config/ACTUATOR/DELETE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
          <tr><td><code class="cell-code">iotsystem/config/SENSOR/DELETE</code></td><td>Backend → Dispositivo</td><td>backend_user</td><td>iot2050_user</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-title" style="margin-top:1.5rem">Autenticacion y ACL</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Aspecto</th><th>Detalle</th></tr>
        </thead>
        <tbody>
          <tr><td>Plugin</td><td><code class="cell-code">emqx_auth_mongo</code> — EMQX consulta MongoDB en cada conexion y publicacion</td></tr>
          <tr><td>Coleccion</td><td><code class="cell-code">iotSystemBD.mqtt_user</code> — un documento por usuario MQTT</td></tr>
          <tr><td>Autenticacion</td><td>Selector <code class="cell-code">username=%u</code>, campo <code class="cell-code">password</code> (plain), comparacion exacta</td></tr>
          <tr><td>ACL publicacion</td><td>Campo <code class="cell-code">publish: [...]</code> — lista de topicos que el usuario puede publicar</td></tr>
          <tr><td>ACL suscripcion</td><td>Campo <code class="cell-code">subscribe: [...]</code> — lista de topicos que el usuario puede suscribir</td></tr>
          <tr><td>Usuario IoT</td><td><code class="cell-code">iot2050_user</code> — publica telemetria/estado/notif, suscribe control/config/device</td></tr>
          <tr><td>Usuario Backend</td><td><code class="cell-code">backend_user</code> — publica control/config/device, suscribe telemetria/estado/notif</td></tr>
          <tr><td>Inicializacion</td><td>Contenedor <code class="cell-code">ecofresh-mqtt-init</code> ejecuta <code class="cell-code">init-mqtt-users.py</code> al arrancar y crea los 2 documentos</td></tr>
          <tr><td>Puertos</td><td>:1883 MQTT · :8883 MQTT TLS · :8083 WebSocket · :8084 WS TLS · :18083 Dashboard</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.flow-wrap {
  height: 620px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
}
.dark-flow { background: #0d1117; }
</style>
