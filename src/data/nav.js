export const navGroupOrder = ['arquitectura', 'funcionalidades', 'tecnologias']
export const navGroupLabels = {
  arquitectura:   'Arquitectura',
  funcionalidades: 'Funcionalidades',
  tecnologias:    'Tecnologias',
}

export const navItems = [
  {
    id: 'arch',
    label: 'Arquitectura',
    group: 'arquitectura',
    archOnly: true,
    items: [
      { label: 'General',      section: 'arch', feature: 'general'  },
      { label: 'Backend',      section: 'arch', feature: 'backend'  },
      { label: 'Frontend',     section: 'arch', feature: 'frontend' },
      { label: 'MQTT & Broker',section: 'arch', feature: 'mqtt'     },
      { label: 'IOT2050',      section: 'arch', feature: 'iot2050'  },
      { label: 'Hardware',     section: 'arch', feature: 'hardware' },
    ]
  },
  {
    id: 'auth',
    label: 'Autenticacion y Sesion',
    group: 'funcionalidades',
    items: [
      { label: 'Login',                section: 'auth', feature: 'login'          },
      { label: 'Logout',               section: 'auth', feature: 'logout'         },
      { label: 'Restauracion de Sesion',section: 'auth', feature: 'session-restore'},
      { label: 'Errores de Auth',      section: 'auth', feature: 'errors'         },
    ]
  },
  {
    id: 'users',
    label: 'Usuarios',
    group: 'funcionalidades',
    items: [
      { label: 'CRUD de Usuarios', section: 'users', feature: 'crud'   },
      { label: 'Errores',          section: 'users', feature: 'errors' },
    ]
  },
  {
    id: 'sensors',
    label: 'Sensores',
    group: 'funcionalidades',
    items: [
      { label: 'CRUD de Sensores',  section: 'sensors', feature: 'crud'   },
      { label: 'Grupos de Sensores',section: 'sensors', feature: 'groups' },
      { label: 'Errores',           section: 'sensors', feature: 'errors' },
    ]
  },
  {
    id: 'actuators',
    label: 'Actuadores',
    group: 'funcionalidades',
    items: [
      { label: 'CRUD de Actuadores',    section: 'actuators', feature: 'crud'    },
      { label: 'Grupos de Actuadores',  section: 'actuators', feature: 'groups'  },
      { label: 'Control de Actuadores', section: 'actuators', feature: 'control' },
      { label: 'Errores',               section: 'actuators', feature: 'errors'  },
    ]
  },
  {
    id: 'notifications',
    label: 'Notificaciones',
    group: 'funcionalidades',
    items: [
      { label: 'CRUD de Notificaciones', section: 'notifications', feature: 'crud'   },
      { label: 'Errores',                section: 'notifications', feature: 'errors' },
    ]
  },
  {
    id: 'history',
    label: 'Historial',
    group: 'funcionalidades',
    items: [
      { label: 'Historial de Sensores', section: 'history', feature: 'history' },
    ]
  },
  {
    id: 'overview',
    label: 'Resumen General',
    group: 'funcionalidades',
    items: [
      { label: 'Overview', section: 'overview', feature: 'overview' },
    ]
  },
  {
    id: 'websocket',
    label: 'WebSocket',
    group: 'funcionalidades',
    items: [
      { label: 'Tiempo Real', section: 'websocket', feature: 'realtime' },
    ]
  },
  {
    id: 'mqtt',
    label: 'MQTT / Hardware',
    group: 'funcionalidades',
    items: [
      { label: 'Telemetria',         section: 'mqtt', feature: 'telemetry' },
      { label: 'Estado Hardware',    section: 'mqtt', feature: 'state'     },
      { label: 'Registro Dispositivo',section: 'mqtt', feature: 'device'   },
      { label: 'Control',            section: 'mqtt', feature: 'control'   },
    ]
  },
  {
    id: 'hardware',
    label: 'Hardware',
    group: 'tecnologias',
    items: [
      { label: 'IOT2050',     section: 'hardware', feature: 'iot2050'    },
      { label: 'PLC S7-1200', section: 'hardware', feature: 'plc'        },
      { label: 'Sensores',    section: 'hardware', feature: 'sensores'   },
      { label: 'Actuadores',  section: 'hardware', feature: 'actuadores' },
    ]
  },
]

export const vpsNavItems = [
  { label: 'Arquitectura', section: 'arquitectura' },
  { label: 'Contenedores', section: 'contenedores' },
  { label: 'Actualizaciones', section: 'actualizaciones' },
  { label: 'MongoDB', section: 'mongodb' },
]
