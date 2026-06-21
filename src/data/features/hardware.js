export const hardwareIot2050 = {
  id: 'hardware-iot2050',
  title: 'IOT2050',
  module: 'Hardware',
  description: 'Documentacion tecnica del dispositivo IOT2050 — configuracion, conexion y programacion. Proximamente.',
  steps: [],
  errors: null,
  notes: [
    'Documentacion en desarrollo.',
    'Temas a cubrir: configuracion inicial Linux, instalacion de dependencias Python, configuracion del cliente MQTT Paho, lectura de modulos de E/S, comunicacion S7-COMM con PLC S7-1200.',
  ],
  diagram: null,
}

export const hardwarePlc = {
  id: 'hardware-plc',
  title: 'PLC S7-1200',
  module: 'Hardware',
  description: 'Documentacion del PLC Siemens S7-1200 — programacion TIA Portal, configuracion PROFINET y comunicacion S7-COMM. Proximamente.',
  steps: [],
  errors: null,
  notes: [
    'Documentacion en desarrollo.',
    'Temas a cubrir: configuracion TIA Portal, estructura del programa ladder, direcciones de variables (DB), configuracion PROFINET/Ethernet, integracion con IOT2050 via S7-COMM.',
  ],
  diagram: null,
}

export const hardwareSensores = {
  id: 'hardware-sensores',
  title: 'Sensores',
  module: 'Hardware',
  description: 'Documentacion de los sensores fisicos del sistema — tipos, calibracion y conexion al PLC/IOT2050. Proximamente.',
  steps: [],
  errors: null,
  notes: [
    'Documentacion en desarrollo.',
    'Temas a cubrir: tipos de sensores (PT100, NTC, 4-20mA), modulos de entrada analoga del PLC, calibracion y escalado de valores, configuracion de alarmas.',
  ],
  diagram: null,
}

export const hardwareActuadores = {
  id: 'hardware-actuadores',
  title: 'Actuadores',
  module: 'Hardware',
  description: 'Documentacion de los actuadores fisicos — reles, valvulas y compresores controlados por el PLC. Proximamente.',
  steps: [],
  errors: null,
  notes: [
    'Documentacion en desarrollo.',
    'Temas a cubrir: tipos de actuadores (reles, valvulas solenoide, compresores), modulos de salida digital/analoga del PLC, logica de control y seguridades.',
  ],
  diagram: null,
}
