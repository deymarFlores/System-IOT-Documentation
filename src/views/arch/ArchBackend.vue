<script setup>
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";
import FlowNode from "../../components/FlowNode.vue";

const nodeTypes = { box: FlowNode };

const nodes = ref([
  {
    id: 'nginx',
    type: 'box',
    position: { x: 0, y: 120 },
    data: {
      klass: 'Infra',
      label: 'Nginx',
      sub: 'SSL Proxy :443',
      color: '#334155',
      colorDark: '#1e293b'
    }
  },

  {
    id: 'jwt',
    type: 'box',
    position: { x: 240, y: 120 },
    data: {
      klass: 'Middleware',
      label: 'JWT Auth',
      sub: 'Middleware / Bearer',
      color: '#1e40af',
      colorDark: '#1e3a8a'
    }
  },

  {
    id: 'router',
    type: 'box',
    position: { x: 480, y: 120 },
    data: {
      klass: 'Enrutamiento',
      label: 'API Router',
      sub: 'Rutas FastAPI',
      color: '#7c3aed',
      colorDark: '#5b21b6'
    }
  },

  {
    id: 'services',
    type: 'box',
    position: { x: 760, y: 120 },
    data: {
      klass: 'Capa',
      label: 'Servicios',
      sub: 'Lógica de negocio',
      color: '#0f766e',
      colorDark: '#115e59'
    }
  },

  {
    id: 'mongodb',
    type: 'box',
    position: { x: 760, y: 340 },
    data: {
      klass: 'Base de Datos',
      label: 'MongoDB',
      sub: 'Motor async',
      color: '#b45309',
      colorDark: '#78350f'
    }
  },

  {
    id: 'mqtt',
    type: 'box',
    position: { x: 480, y: 340 },
    data: {
      klass: 'Mensajería',
      label: 'Cliente MQTT',
      sub: 'paho-mqtt',
      color: '#0891b2',
      colorDark: '#0e7490'
    }
  },

  {
    id: 'ws',
    type: 'box',
    position: { x: 240, y: 340 },
    data: {
      klass: 'Tiempo Real',
      label: 'WebSocket',
      sub: 'Manejador /ws',
      color: '#6d28d9',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'emqx',
    type: 'box',
    position: { x: 480, y: 560 },
    data: {
      klass: 'Broker',
      label: 'EMQX',
      sub: 'v4.2.3 · :1883',
      color: '#0e7490',
      colorDark: '#083344'
    }
  }
])

const edges = ref([
  {
    id: 'e1',
    source: 'nginx',
    sourceHandle: 'right-source',
    target: 'jwt',
    targetHandle: 'left-target',
    animated: true,
    label: 'Petición HTTPS',
    type: 'smoothstep',

    style: {
      stroke: '#475569',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#94a3b8',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e2',
    source: 'jwt',
    sourceHandle: 'right-source',
    target: 'router',
    targetHandle: 'left-target',
    animated: true,
    label: 'Bearer validado',
    type: 'smoothstep',

    style: {
      stroke: '#3b82f6',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#93c5fd',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e3',
    source: 'router',
    sourceHandle: 'right-source',
    target: 'services',
    targetHandle: 'left-target',

    label: 'Despachar ruta',
    type: 'smoothstep',

    style: {
      stroke: '#8b5cf6',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#c4b5fd',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e4',
    source: 'services',
    sourceHandle: 'bottom-source',
    target: 'mongodb',
    targetHandle: 'top-target',

    label: 'Motor CRUD',
    type: 'smoothstep',

    style: {
      stroke: '#d97706',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#fcd34d',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e5',
    source: 'router',
    sourceHandle: 'bottom-source',
    target: 'mqtt',
    targetHandle: 'top-target',

    label: 'MQTT publicar/suscribir',
    type: 'smoothstep',

    style: {
      stroke: '#0891b2',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#67e8f9',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e6',
    source: 'router',
    sourceHandle: 'left-source',
    target: 'ws',
    targetHandle: 'right-target',

    label: 'difusión WS',
    animated: true,
    type: 'smoothstep',

    style: {
      stroke: '#9333ea',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#d8b4fe',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e7',
    source: 'mqtt',
    sourceHandle: 'bottom-source',
    target: 'emqx',
    targetHandle: 'top-target',

    label: 'protocolo MQTT',
    type: 'smoothstep',

    style: {
      stroke: '#0891b2',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#67e8f9',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },
  {
    id: 'e8',
    source: 'ws',
    sourceHandle: 'left-source',
    target: 'nginx',
    targetHandle: 'right-target',

    label: 'difusión WS',
    animated: true,
    type: 'smoothstep',

    style: {
      stroke: '#9333ea',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#d8b4fe',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [4, 5],
    labelBgBorderRadius: 3
  },
])

</script>

<template>
  <div class="arch-view">
    <div class="view-header">
      <h1>Arquitectura Backend</h1>
      <p class="description">
        Estructura interna del servidor FastAPI — middleware, rutas, servicios y
        conexiones de datos
      </p>
    </div>

    <div class="flow-wrap">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        fit-view-on-init
        class="dark-flow"
        :min-zoom="0.3"
        :max-zoom="2.5"
        :default-viewport="{ zoom: 0.85 }"
      />
    </div>

    <div class="arch-info-grid">
      <div class="arch-info-card">
        <div class="aic-title">JWT Auth</div>
        <div class="aic-body">
          Bearer token en header <code>Authorization</code>. Middleware valida
          firma, expiracion y extrae rol del usuario antes de despachar la ruta.
        </div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">Motor async</div>
        <div class="aic-body">
          Driver MongoDB asincronico para Python. Todas las queries son
          <code>await</code> — el event loop de FastAPI no se bloquea durante
          operaciones de base de datos.
        </div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">MQTT Client</div>
        <div class="aic-body">
          El backend se suscribe a topicos de telemetria y estado hardware.
          Publica comandos de control y configuracion hacia los dispositivos via
          EMQX.
        </div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">WebSocket /ws</div>
        <div class="aic-body">
          Conexion persistente con el frontend. Cuando llega telemetria MQTT, el
          backend la rebroadcastea por WS hacia todos los clientes conectados en
          tiempo real.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-wrap {
  height: 500px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
.dark-flow {
  background: #0d1117;
}
</style>
