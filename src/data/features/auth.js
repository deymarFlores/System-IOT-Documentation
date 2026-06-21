export const authLogin = {
  id: 'auth-login',
  title: 'Login de Usuarios',
  module: 'Autenticacion',
  description: 'Autenticacion de usuario con credenciales. Devuelve access_token en JSON y refresh_token en cookie HttpOnly.',
  steps: [
    {
      num: 1,
      method: 'POST',
      endpoint: 'https://monitoreohidro.com/IotSystem/v2.0.5/user/login',
      description: 'Frontend envia formulario de login con credenciales',
      payload: 'username=usuario@email.com\n&password=MiPassword123\n&scope=remember_me',
      response: 'HTTP 200\n{"success": true, "user": {"id": "64abc...", "email": "usuario@email.com", "rol": "admin"}, "access_token": "eyJ..."}\nCookie: refresh_token=eyJ...; HttpOnly',
      area: 'FRONTEND',
    },
    {
      num: 2,
      method: 'POST',
      endpoint: 'https://monitoreohidro.com/IotSystem/v2.0.5/user/login',
      description: 'Backend valida credenciales, genera tokens y establece cookie',
      payload: '-- (recibe el form de arriba)',
      response: 'HTTP 200\n{"success": true, "user": {...}, "access_token": "eyJ..."}\nSet-Cookie: refresh_token=eyJ...; HttpOnly; Secure; SameSite=Lax',
      area: 'BACKEND',
    },
  ],
  errors: null,
  notes: [
    'access_token se almacena en memoria (Pinia authStore)',
    'refresh_token en cookie HttpOnly inaccesible desde JS',
    'scope=remember_me activa cookie persistente entre sesiones',
  ],
  diagram: null,
}

export const authLogout = {
  id: 'auth-logout',
  title: 'Logout de Usuarios',
  module: 'Autenticacion',
  description: 'Cierre de sesion: invalida el refresh_token en base de datos y limpia la cookie.',
  steps: [
    {
      num: 1,
      method: 'PATCH',
      endpoint: '/IotSystem/v2.0.5/user/logout',
      description: 'Frontend envia peticion de logout con header Authorization',
      payload: '-- (solo header Authorization: Bearer {access_token})',
      response: 'HTTP 200\n{"success": true, "message": "Sesion cerrada exitosamente"}',
      area: 'FRONTEND',
    },
    {
      num: 2,
      method: 'PATCH',
      endpoint: '/IotSystem/v2.0.5/user/logout',
      description: 'Backend invalida refresh_token en MongoDB y limpia la cookie',
      payload: '-- (recibe header)',
      response: 'HTTP 200\n{"success": true}\nSet-Cookie: refresh_token=; Max-Age=0; HttpOnly',
      area: 'BACKEND',
    },
  ],
  errors: null,
  notes: [
    'El refresh_token se elimina del documento del usuario en MongoDB',
    'La cookie se invalida con Max-Age=0',
  ],
  diagram: null,
}

export const sessionRestore = {
  id: 'auth-session-restore',
  title: 'Restauracion de Sesion',
  module: 'Autenticacion',
  description: 'Al recargar la pagina, se intenta restaurar la sesion usando el refresh_token de la cookie.',
  steps: [
    {
      num: 1,
      method: 'POST',
      endpoint: '/IotSystem/v2.0.5/user/refresh-token',
      description: 'Al montar la app, authStore.checkAuth() envia la cookie de refresh_token',
      payload: '-- (cookie refresh_token enviada automaticamente)',
      response: 'HTTP 200\n{"access_token": "eyJ...nuevo..."}',
      area: 'FRONTEND',
    },
    {
      num: 2,
      method: 'GET',
      endpoint: '/IotSystem/v2.0.5/auth/me',
      description: 'Con el nuevo access_token, se obtiene el perfil del usuario',
      payload: 'Authorization: Bearer {nuevo_access_token}',
      response: 'HTTP 200\n{"user": {"id": "...", "email": "...", "rol": "..."}}',
      area: 'FRONTEND',
    },
    {
      num: 3,
      method: 'POST',
      endpoint: '/IotSystem/v2.0.5/user/refresh-token',
      description: 'Interceptor Axios: al recibir 401, refresca el token y reintenta la peticion original',
      payload: '-- (cookie automatica)',
      response: 'HTTP 200\n{"access_token": "eyJ..."}\n-- reintenta peticion original',
      area: 'FRONTEND',
    },
  ],
  errors: null,
  notes: [
    'authStore.checkAuth() se ejecuta en el onMounted del componente raiz',
    'Si el refresh_token ha expirado, el usuario es redirigido al login',
    'El interceptor evita multiples refrescos simultaneos con una bandera isRefreshing',
  ],
  diagram: null,
}

export const authErrors = {
  id: 'auth-errors',
  title: 'Errores de Autenticacion',
  module: 'Autenticacion',
  description: 'Catalogo de errores del modulo de autenticacion.',
  steps: [],
  errors: [
    { code: 401, endpoint: 'POST /user/login', cause: 'Credenciales invalidas', response: '{"detail": "Invalid credentials or user not found"}', frontend: 'Toast: Credenciales invalidas' },
    { code: 401, endpoint: 'Cualquier endpoint protegido', cause: 'access_token expirado', response: '{"detail": "Token has expired"}', frontend: 'Interceptor refresca token automaticamente' },
    { code: 401, endpoint: 'Cualquier endpoint protegido', cause: 'Sin token en header Authorization', response: '{"detail": "Not authenticated"}', frontend: 'Redireccion a /login' },
    { code: 403, endpoint: 'Endpoints de admin', cause: 'Rol insuficiente', response: '{"detail": "Not enough permissions"}', frontend: 'Toast: No tienes permisos para esta accion' },
    { code: 422, endpoint: 'POST /user/login', cause: 'Campos requeridos faltantes', response: '{"detail": [{"loc": [...], "msg": "field required"}]}', frontend: 'Validacion en formulario antes de enviar' },
  ],
  notes: [],
  diagram: null,
}
