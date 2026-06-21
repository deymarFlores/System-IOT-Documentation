export const sensorsCrud = {
  id: 'sensors-crud',
  title: 'CRUD de Sensores',
  module: 'Sensores',
  description: 'Operaciones de gestion de sensores fisicos en el sistema.',
  steps: [
    {
      num: 1,
      method: 'GET',
      endpoint: '/IotSystem/v1.0.1/sensors',
      description: 'Obtener lista de todos los sensores',
      payload: `Authorization: Bearer {access_token}`,
      response: `HTTP 200
{"success": true, "sensors": [{"_id": "...", "name": "Temperatura PLC", "units": "C", "lifecycleState": "active", "lastValue": 23.5}]}`,
      area: 'FRONTEND',
    },
    {
      num: 2,
      method: 'MQTT',
      endpoint: 'iotsystem/device/SENSOR/',
      description: 'Backend publica configuracion de sensor al IOT2050',
      payload: `{"action": "create", "sensor_id": "64abc...", "name": "Temperatura", "config": {...}}`,
      response: `IOT2050 confirma con publicacion en iotsystem/state`,
      area: 'MQTT',
    },
    {
      num: 3,
      method: 'GET',
      endpoint: '/IotSystem/v1.0.1/sensor/{id}',
      description: 'Obtener datos de un sensor especifico',
      payload: `Authorization: Bearer {access_token}`,
      response: `HTTP 200
{"sensor": {"_id": "...", "name": "Temperatura PLC", "units": "C", "lastValue": 23.5}}`,
      area: 'FRONTEND',
    },
    {
      num: 4,
      method: 'POST',
      endpoint: '/IotSystem/v1.0.1/sensor',
      description: 'Crear nuevo sensor (lifecycleState: pending hasta confirmacion hardware)',
      payload: `{"name": "Temperatura PLC", "units": "C", "config": {"signalMin": 4, "signalMax": 20, "resolMin": 0, "resolMax": 27648, "rangeMin": -20, "rangeMax": 80}}`,
      response: `HTTP 201
{"success": true, "sensor": {"_id": "...", "lifecycleState": "pending"}}`,
      area: 'FRONTEND',
    },
    {
      num: 5,
      method: 'PUT',
      endpoint: '/IotSystem/v1.0.1/sensor/{id}',
      description: 'Actualizar configuracion de un sensor',
      payload: `{"name": "Temperatura Updated", "config": {"rangeMin": -10, "rangeMax": 100}}`,
      response: `HTTP 200
{"success": true}`,
      area: 'FRONTEND',
    },
    {
      num: 6,
      method: 'PATCH',
      endpoint: '/IotSystem/v1.0.1/sensor/{id}/assign-group',
      description: 'Asignar sensor a un grupo',
      payload: `{"group_id": "64def..."}`,
      response: `HTTP 200
{"success": true}`,
      area: 'FRONTEND',
    },
    {
      num: 7,
      method: 'DELETE',
      endpoint: '/IotSystem/v1.0.1/sensor/{id}',
      description: 'Eliminar sensor del sistema',
      payload: `Authorization: Bearer {access_token}`,
      response: `HTTP 200
{"success": true, "message": "Sensor eliminado"}`,
      area: 'FRONTEND',
    },
  ],
  errors: null,
  notes: [
    'Un sensor recien creado tiene lifecycleState: pending hasta confirmacion via MQTT',
    'La calibracion ADC usa interpolacion lineal entre resolMin/resolMax y rangeMin/rangeMax',
  ],
  diagram: null,
}

export const sensorsGroups = {
  id: 'sensors-groups',
  title: 'Grupos de Sensores',
  module: 'Sensores',
  description: 'Gestion de grupos para organizar sensores visualmente en el frontend.',
  steps: [
    {
      num: 1,
      method: 'GET',
      endpoint: '/IotSystem/v1.0.1/sensor-groups',
      description: 'Obtener todos los grupos de sensores',
      payload: `Authorization: Bearer {access_token}`,
      response: `HTTP 200
{"groups": [{"_id": "...", "name": "Zona Norte", "color": "#3b82f6"}]}`,
      area: 'FRONTEND',
    },
    {
      num: 2,
      method: 'GET',
      endpoint: '/IotSystem/v1.0.1/sensor-group/{id}',
      description: 'Obtener grupo especifico con sus sensores',
      payload: `Authorization: Bearer {access_token}`,
      response: `HTTP 200
{"group": {"_id": "...", "name": "Zona Norte", "sensors": [...]}}`,
      area: 'FRONTEND',
    },
    {
      num: 3,
      method: 'POST',
      endpoint: '/IotSystem/v1.0.1/sensor-group',
      description: 'Crear nuevo grupo de sensores',
      payload: `{"name": "Zona Norte", "color": "#3b82f6"}`,
      response: `HTTP 201
{"success": true, "group": {"_id": "...", "name": "Zona Norte"}}`,
      area: 'FRONTEND',
    },
    {
      num: 4,
      method: 'PUT',
      endpoint: '/IotSystem/v1.0.1/sensor-group/{id}',
      description: 'Actualizar nombre o color del grupo',
      payload: `{"name": "Zona Norte Updated", "color": "#ef4444"}`,
      response: `HTTP 200
{"success": true}`,
      area: 'FRONTEND',
    },
    {
      num: 5,
      method: 'PATCH',
      endpoint: '/IotSystem/v1.0.1/sensor-group/{id}/add-sensor',
      description: 'Agregar sensor al grupo',
      payload: `{"sensor_id": "64abc..."}`,
      response: `HTTP 200
{"success": true}`,
      area: 'FRONTEND',
    },
    {
      num: 6,
      method: 'PATCH',
      endpoint: '/IotSystem/v1.0.1/sensor-group/{id}/remove-sensor',
      description: 'Remover sensor del grupo',
      payload: `{"sensor_id": "64abc..."}`,
      response: `HTTP 200
{"success": true}`,
      area: 'FRONTEND',
    },
    {
      num: 7,
      method: 'PATCH',
      endpoint: '/IotSystem/v1.0.1/sensor-group/{id}/reorder',
      description: 'Reordenar sensores en el grupo',
      payload: `{"sensor_ids": ["id1", "id2", "id3"]}`,
      response: `HTTP 200
{"success": true}`,
      area: 'FRONTEND',
    },
    {
      num: 8,
      method: 'DELETE',
      endpoint: '/IotSystem/v1.0.1/sensor-group/{id}',
      description: 'Eliminar grupo (los sensores no se eliminan)',
      payload: `Authorization: Bearer {access_token}`,
      response: `HTTP 200
{"success": true, "message": "Grupo eliminado"}`,
      area: 'FRONTEND',
    },
  ],
  errors: null,
  notes: [
    'Al eliminar un grupo, los sensores quedan con group_id: null',
    'El color debe ser un valor HEX valido',
  ],
  diagram: null,
}

export const sensorsErrors = {
  id: 'sensors-errors',
  title: 'Errores de Sensores',
  module: 'Sensores',
  description: 'Catalogo de errores del modulo de sensores.',
  steps: [

  ],
  errors: [
    { code: 400, endpoint: 'POST /sensor', cause: 'Configuracion de calibracion invalida (min >= max)', response: `{"detail": "Invalid calibration config"}`, frontend: 'Toast: Configuracion invalida' },
    { code: 404, endpoint: 'GET /sensor/{id}', cause: 'Sensor no encontrado', response: `{"detail": "Sensor not found"}`, frontend: 'Toast: Sensor no encontrado' },
    { code: 404, endpoint: 'GET /sensor-group/{id}', cause: 'Grupo no encontrado', response: `{"detail": "Group not found"}`, frontend: 'Toast: Grupo no encontrado' },
    { code: 409, endpoint: 'PATCH /sensor-group/{id}/add-sensor', cause: 'Sensor ya pertenece a otro grupo', response: `{"detail": "Sensor already in a group"}`, frontend: 'Toast: Sensor ya asignado' },
    { code: 422, endpoint: 'POST /sensor', cause: 'Campos requeridos faltantes', response: `{"detail": [{"msg": "field required"}]}`, frontend: 'Validacion de formulario' },
  ],
  notes: [

  ],
  diagram: null,
}

