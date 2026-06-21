<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VpsDiagram from './components/VpsDiagram.vue'

const route = useRoute()
const section = computed(() => route.params.section || 'arquitectura')

const containers = [
  { name: 'ecofresh-api', image: 'python:3.11-slim (custom)', port: '8000', description: 'Backend FastAPI. Expone la API REST y el servidor WebSocket.' },
  { name: 'ecofresh-mongodb', image: 'mongo:4.4', port: '27017 (interno)', description: 'Base de datos MongoDB v4.4.30. Solo accesible dentro de la red Docker.' },
  { name: 'ecofresh-emqx', image: 'emqx/emqx:5', port: '1883, 8083, 18083', description: 'Broker MQTT EMQX. 1883=MQTT, 8083=WebSocket MQTT, 18083=Dashboard admin.' },
  { name: 'ecofresh-nginx', image: 'nginx:alpine', port: '80, 443', description: 'Reverse proxy. Termina SSL y enruta /IotSystem/* al backend.' },
]

const envVars = [
  { name: 'SECRET_KEY', desc: 'Clave secreta para firmar JWT' },
  { name: 'ALGORITHM', desc: 'Algoritmo JWT (ej. HS256)' },
  { name: 'ACCESS_TOKEN_EXPIRE_MINUTES', desc: 'Tiempo de vida del access token' },
  { name: 'REFRESH_TOKEN_EXPIRE_DAYS', desc: 'Tiempo de vida del refresh token' },
  { name: 'DATABASE_URL', desc: 'URI de conexion MongoDB' },
  { name: 'DATABASE_NAME', desc: 'Nombre de la base de datos' },
  { name: 'MQTT_HOST', desc: 'Host del broker EMQX' },
  { name: 'MQTT_PORT', desc: 'Puerto MQTT (default: 1883)' },
  { name: 'MQTT_USER', desc: 'Usuario de autenticacion MQTT' },
  { name: 'MQTT_PASSWORD', desc: 'Password de autenticacion MQTT' },
]
</script>

<template>
  <div>

    <!-- ARQUITECTURA -->
    <template v-if="section === 'arquitectura'">
      <div class="view-header">
        <h1>Arquitectura <span class="module-badge">VPS</span></h1>
        <p class="description">Vista general de como esta desplegado el sistema EcoFresh en produccion.</p>
      </div>

      <div class="placeholder-img">[Diagrama: arquitectura VPS — Internet → Nginx → FastAPI + WS | EMQX ← IOT2050/PLC | MongoDB]</div>

      <div class="vps-section">
        <h2>Resumen</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.7">
          El sistema corre sobre un servidor VPS usando <strong>Docker Compose</strong>.
          Todos los servicios estan contenedorizados y se comunican a traves de una red interna Docker.
        </p>
        <div class="table-wrap" style="margin-top:1rem">
          <table>
            <thead><tr><th>Componente</th><th>Tecnologia</th><th>Funcion</th></tr></thead>
            <tbody>
              <tr><td>Reverse Proxy</td><td>Nginx + SSL (Certbot)</td><td>Termina HTTPS y enruta trafico al backend</td></tr>
              <tr><td>Backend</td><td>FastAPI (Python 3.11)</td><td>API REST + servidor WebSocket en /ws</td></tr>
              <tr><td>Base de datos</td><td>MongoDB 4.4.30</td><td>Persistencia de todos los datos del sistema</td></tr>
              <tr><td>Broker MQTT</td><td>EMQX 5</td><td>Comunicacion bidireccional con el hardware IoT</td></tr>
              <tr><td>Hardware</td><td>IOT2050 + PLC S7-1200</td><td>Publican telemetria y reciben comandos via MQTT</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="vps-section">
        <h2>Flujo de comunicacion</h2>
          <VpsDiagram />
      </div>
    </template>

    <!-- CONTENEDORES -->
    <template v-else-if="section === 'contenedores'">
      <div class="view-header">
        <h1>Contenedores <span class="module-badge">Docker</span></h1>
        <p class="description">Servicios gestionados con Docker Compose. Directorio del proyecto: <code style="font-family:var(--font-mono)">/opt/ecofresh</code></p>
      </div>

      <div class="vps-section">
        <h2>Servicios activos</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Contenedor</th><th>Imagen</th><th>Puertos</th><th>Descripcion</th></tr></thead>
            <tbody>
              <tr v-for="c in containers" :key="c.name">
                <td><code style="font-family:var(--font-mono); font-weight:600">{{ c.name }}</code></td>
                <td><code style="font-family:var(--font-mono); font-size:0.78rem">{{ c.image }}</code></td>
                <td><code style="font-family:var(--font-mono); font-size:0.78rem">{{ c.port }}</code></td>
                <td style="font-size:0.8rem">{{ c.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="vps-section">
        <h2>Comandos de gestion</h2>
        <p class="vps-cmd-label">Ver estado de todos los contenedores:</p>
        <div class="code-block">docker-compose ps</div>
        <p class="vps-cmd-label">Reiniciar un servicio especifico:</p>
        <div class="code-block">docker-compose restart ecofresh-api</div>
        <p class="vps-cmd-label">Ver logs en tiempo real:</p>
        <div class="code-block">docker-compose logs -f ecofresh-api
docker-compose logs -f ecofresh-emqx</div>
        <p class="vps-cmd-label">Detener todos los servicios:</p>
        <div class="code-block">docker-compose down</div>
        <p class="vps-cmd-label">Iniciar todos los servicios:</p>
        <div class="code-block">docker-compose up -d</div>
      </div>

      <div class="vps-section">
        <h2>Variables de entorno</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem">
          El archivo <code style="font-family:var(--font-mono)">.env</code> no esta en el repositorio. Debe existir en <code style="font-family:var(--font-mono)">/opt/ecofresh/.env</code>
        </p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Variable</th><th>Descripcion</th></tr></thead>
            <tbody>
              <tr v-for="v in envVars" :key="v.name">
                <td><code style="font-family:var(--font-mono)">{{ v.name }}</code></td>
                <td style="font-size:0.8rem">{{ v.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- ACTUALIZACIONES -->
    <template v-else-if="section === 'actualizaciones'">
      <div class="view-header">
        <h1>Actualizaciones <span class="module-badge">Deploy</span></h1>
        <p class="description">Procedimiento para actualizar cada componente del sistema en produccion.</p>
      </div>

      <div class="vps-section">
        <h2>Backend (FastAPI)</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem">El backend se reconstruye desde el Dockerfile. Cambios en <code style="font-family:var(--font-mono)">requirements.txt</code> requieren <code style="font-family:var(--font-mono)">--no-cache</code>.</p>
        <ol class="steps-list">
          <li>Conectarse al VPS via SSH</li>
          <li>Ir al directorio del proyecto:
            <div class="code-block" style="margin-top:0.4rem">cd /opt/ecofresh</div>
          </li>
          <li>Traer los cambios del repositorio:
            <div class="code-block" style="margin-top:0.4rem">git pull origin main</div>
          </li>
          <li>Reconstruir la imagen del backend:
            <div class="code-block" style="margin-top:0.4rem">docker-compose build --no-cache ecofresh-api</div>
          </li>
          <li>Reiniciar el servicio:
            <div class="code-block" style="margin-top:0.4rem">docker-compose up -d ecofresh-api</div>
          </li>
          <li>Verificar que el servicio este corriendo:
            <div class="code-block" style="margin-top:0.4rem">docker-compose ps ecofresh-api
docker-compose logs --tail=30 ecofresh-api</div>
          </li>
        </ol>
      </div>

      <div class="vps-section">
        <h2>Frontend (Vue build estatico)</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem">El frontend es un build estatico servido por Nginx. Se compila localmente y se despliega al servidor.</p>
        <ol class="steps-list">
          <li>Compilar el frontend en la maquina local:
            <div class="code-block" style="margin-top:0.4rem">npm run build</div>
          </li>
          <li>Copiar el build al servidor (o via CI/CD):
            <div class="code-block" style="margin-top:0.4rem">scp -r dist/* usuario@vps:/opt/ecofresh/frontend/dist/</div>
          </li>
          <li>Recargar Nginx (no es necesario reiniciarlo):
            <div class="code-block" style="margin-top:0.4rem">docker-compose exec ecofresh-nginx nginx -s reload</div>
          </li>
        </ol>
      </div>

      <div class="vps-section">
        <h2>Variables de entorno (.env)</h2>
        <ol class="steps-list">
          <li>Editar el archivo en el servidor:
            <div class="code-block" style="margin-top:0.4rem">nano /opt/ecofresh/.env</div>
          </li>
          <li>Reiniciar el backend para que tome los nuevos valores:
            <div class="code-block" style="margin-top:0.4rem">docker-compose restart ecofresh-api</div>
          </li>
        </ol>
      </div>

      <div class="vps-section">
        <h2>Nginx (configuracion)</h2>
        <ol class="steps-list">
          <li>Editar el archivo de configuracion:
            <div class="code-block" style="margin-top:0.4rem">nano /opt/ecofresh/nginx/nginx.conf</div>
          </li>
          <li>Verificar sintaxis antes de aplicar:
            <div class="code-block" style="margin-top:0.4rem">docker-compose exec ecofresh-nginx nginx -t</div>
          </li>
          <li>Recargar si la sintaxis es correcta:
            <div class="code-block" style="margin-top:0.4rem">docker-compose exec ecofresh-nginx nginx -s reload</div>
          </li>
        </ol>
      </div>

      <div class="vps-section">
        <h2>EMQX (broker MQTT)</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem">EMQX tiene su propio panel de administracion en el puerto 18083. Cambios de configuracion se hacen por ahi o via archivos de config.</p>
        <div class="code-block">docker-compose restart ecofresh-emqx</div>
      </div>

      <div class="vps-section">
        <h2>Rollback</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem">Si la actualizacion genera problemas, revertir al commit anterior:</p>
        <div class="code-block">git log --oneline -10
git checkout &lt;commit-hash&gt;
docker-compose build --no-cache ecofresh-api
docker-compose up -d ecofresh-api</div>
      </div>
    </template>

    <!-- MONGODB -->
    <template v-else-if="section === 'mongodb'">
      <div class="view-header">
        <h1>MongoDB <span class="module-badge">v4.4.30</span></h1>
        <p class="description">Acceso, consultas y consideraciones de seguridad de la base de datos.</p>
      </div>

      <div class="vps-section">
        <h2>Acceso al shell</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem">
          El contenedor MongoDB solo es accesible desde dentro de la red Docker. Para acceder al shell:
        </p>
        <div class="code-block">docker exec -it ecofresh-mongodb mongo -u admin -p 'clave' --authenticationDatabase admin</div>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.5rem">
          Reemplaza <code style="font-family:var(--font-mono)">clave</code> con la contrasena real definida en el <code style="font-family:var(--font-mono)">.env</code>.
        </p>
      </div>

      <div class="vps-section">
        <h2>Comandos utiles</h2>
        <p class="vps-cmd-label">Seleccionar la base de datos del sistema:</p>
        <div class="code-block">use ecofresh_db</div>
        <p class="vps-cmd-label">Listar colecciones:</p>
        <div class="code-block">show collections</div>
        <p class="vps-cmd-label">Contar documentos por coleccion:</p>
        <div class="code-block">db.users.countDocuments()
db.sensors.countDocuments()
db.actuators.countDocuments()
db.notifications.countDocuments()
db.sensor_history.countDocuments()</div>
        <p class="vps-cmd-label">Ver usuarios del sistema:</p>
        <div class="code-block">db.users.find({}, {password: 0}).pretty()</div>
        <p class="vps-cmd-label">Ver ultimas 10 lecturas de un sensor:</p>
        <div class="code-block">db.sensor_history.find({sensor_id: ObjectId("...")}).sort({timestamp: -1}).limit(10)</div>
        <p class="vps-cmd-label">Notificaciones no leidas:</p>
        <div class="code-block">db.notifications.find({read: false}).pretty()</div>
        <p class="vps-cmd-label">Verificar la version de MongoDB:</p>
        <div class="code-block">version()
// → 4.4.30</div>
      </div>

      <div class="vps-section">
        <h2>Seguridad</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Medida</th><th>Descripcion</th></tr></thead>
            <tbody>
              <tr>
                <td>Puerto no expuesto</td>
                <td>El puerto 27017 no esta mapeado al host. Solo es accesible desde dentro de la red Docker.</td>
              </tr>
              <tr>
                <td>Autenticacion habilitada</td>
                <td>MongoDB corre con <code style="font-family:var(--font-mono)">--auth</code>. Se requiere usuario y password para cualquier operacion.</td>
              </tr>
              <tr>
                <td>Base de datos de autenticacion</td>
                <td><code style="font-family:var(--font-mono)">--authenticationDatabase admin</code>. El usuario admin vive en la BD <code style="font-family:var(--font-mono)">admin</code>.</td>
              </tr>
              <tr>
                <td>Passwords hasheados</td>
                <td>Las contrasenas de usuarios del sistema se almacenan con bcrypt. Nunca en texto plano.</td>
              </tr>
              <tr>
                <td>Refresh tokens</td>
                <td>Se invalidan en logout eliminando el campo <code style="font-family:var(--font-mono)">refresh_token</code> del documento de usuario.</td>
              </tr>
              <tr>
                <td>Backups</td>
                <td>Recomendado: <code style="font-family:var(--font-mono)">mongodump</code> periodico. Configurar en cron del host o herramienta de respaldo del VPS.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="vps-section">
        <h2>Backup manual</h2>
        <div class="code-block">docker exec ecofresh-mongodb mongodump \
  --authenticationDatabase admin \
  -u admin -p 'clave' \
  --db ecofresh_db \
  --out /tmp/backup_$(date +%Y%m%d)</div>
        <p class="vps-cmd-label" style="margin-top:0.75rem">Copiar backup al host:</p>
        <div class="code-block">docker cp ecofresh-mongodb:/tmp/backup_20260620 ./backups/</div>
      </div>
    </template>

  </div>
</template>

<style scoped>
.vps-cmd-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
  margin-top: 0.75rem;
}
</style>
