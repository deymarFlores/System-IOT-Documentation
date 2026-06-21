import { authLogin, authLogout, sessionRestore, authErrors } from './features/auth.js'
import { usersCrud, usersErrors } from './features/users.js'
import { sensorsCrud, sensorsGroups, sensorsErrors } from './features/sensors.js'
import { actuatorsCrud, actuatorsGroups, actuatorsControl, actuatorsErrors } from './features/actuators.js'
import { notificationsCrud, notificationsErrors } from './features/notifications.js'
import { historyFeature, overviewFeature, websocketRealtime } from './features/misc.js'
import { mqttTelemetry, mqttState, mqttDevice, mqttControl } from './features/mqtt.js'
import { hardwareIot2050, hardwarePlc, hardwareSensores, hardwareActuadores } from './features/hardware.js'

export const features = {
  'auth-login': authLogin,
  'auth-logout': authLogout,
  'auth-session-restore': sessionRestore,
  'auth-errors': authErrors,
  'users-crud': usersCrud,
  'users-errors': usersErrors,
  'sensors-crud': sensorsCrud,
  'sensors-groups': sensorsGroups,
  'sensors-errors': sensorsErrors,
  'actuators-crud': actuatorsCrud,
  'actuators-groups': actuatorsGroups,
  'actuators-control': actuatorsControl,
  'actuators-errors': actuatorsErrors,
  'notifications-crud': notificationsCrud,
  'notifications-errors': notificationsErrors,
  'history-history': historyFeature,
  'overview-overview': overviewFeature,
  'websocket-realtime': websocketRealtime,
  'mqtt-telemetry': mqttTelemetry,
  'mqtt-state': mqttState,
  'mqtt-device': mqttDevice,
  'mqtt-control': mqttControl,
  'hardware-iot2050': hardwareIot2050,
  'hardware-plc': hardwarePlc,
  'hardware-sensores': hardwareSensores,
  'hardware-actuadores': hardwareActuadores,
}
