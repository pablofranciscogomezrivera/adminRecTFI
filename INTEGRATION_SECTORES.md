# Integración Frontend-Backend: Gestión de Sectores

## Resumen

Este documento describe la integración completa entre el frontend y backend para la funcionalidad de **Gestión de Sectores** (HU 1).

## Cambios Realizados

### 1. Creación del Servicio API (`/frontend/src/services/api.js`)

Se creó un servicio centralizado para manejar todas las peticiones HTTP al backend:

- **Base URL**: `http://localhost:5187/api`
- **Autenticación**: Soporte para JWT Bearer token (almacenado en localStorage)
- **Manejo de errores**: Respuestas 401, 403, y otros códigos de error

#### API de Sectores (`sectoresApi`)

```javascript
sectoresApi.getAll()      // GET /api/sectores
sectoresApi.create(data)  // POST /api/sectores
sectoresApi.update(id, data) // PUT /api/sectores/{id}
sectoresApi.delete(id)    // DELETE /api/sectores/{id}
```

### 2. Actualización de `Sectores.jsx`

Cambios principales:
- Reemplazó datos mock con llamadas reales a la API
- Agregó estado de carga (`cargando`) con spinner
- Implementó manejo de errores con SweetAlert2
- Eliminó la columna "Descripción" (no existe en el modelo backend)
- Agregó mensaje cuando no hay sectores disponibles

#### Flujo de datos:
1. **Cargar sectores**: Al montar el componente, llama a `cargarSectores()` que obtiene datos de `GET /api/sectores`
2. **Crear sector**: Llama a `POST /api/sectores` y recarga la lista
3. **Editar sector**: Llama a `PUT /api/sectores/{id}` y recarga la lista
4. **Desactivar sector**: Muestra confirmación, llama a `DELETE /api/sectores/{id}` (soft delete) y recarga la lista

### 3. Actualización de `FormularioSector.jsx`

Cambios principales:
- Eliminó el campo "Descripción" del formulario (no existe en el backend)
- Cambió `onSubmit` a función asíncrona
- Agregó manejo de errores con try/catch
- Muestra errores de la API mediante SweetAlert2

#### Validaciones del formulario:
- **Nombre**: Requerido, 3-100 caracteres (coincide con backend: max 100)

## Modelo de Datos

### Backend (C# - Sector.cs)
```csharp
public class Sector
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public bool EstaActivo { get; set; }
}
```

### Frontend (JavaScript)
```javascript
{
  id: number,
  nombre: string,
  estaActivo: boolean
}
```

## Endpoints del Backend

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/api/sectores` | Obtiene todos los sectores | Array de sectores |
| POST | `/api/sectores` | Crea un nuevo sector | Sector creado (201) |
| PUT | `/api/sectores/{id}` | Actualiza un sector | 204 No Content |
| DELETE | `/api/sectores/{id}` | Desactiva un sector (soft delete) | 204 No Content |

## Requisitos

### Backend
- ASP.NET Core ejecutándose en `http://localhost:5187`
- Base de datos SQL Server configurada
- CORS habilitado para cualquier origen

### Frontend
- Node.js y npm instalados
- Dependencias instaladas: `npm install`
- React + React Bootstrap + SweetAlert2

## Cómo Probar la Integración

### 1. Iniciar el Backend
```bash
cd backend/RecursosTFI/BackAdminRec
dotnet run
```

### 2. Iniciar el Frontend
```bash
cd frontend
npm run dev
```

### 3. Navegar a Sectores
1. Abrir el navegador en `http://localhost:5173` (o el puerto que indique Vite)
2. Ir a "Configuración -> Sectores"

### 4. Probar Funcionalidades

#### Listar Sectores
- La tabla debería cargar automáticamente los sectores desde la base de datos

#### Crear Sector
1. Click en "Crear Sector"
2. Ingresar nombre (ej: "Ventas")
3. Click en "Guardar"
4. Verificar que aparece en la tabla

#### Editar Sector
1. Click en "Editar" en una fila
2. Modificar el nombre
3. Click en "Guardar"
4. Verificar que el cambio se reflejó

#### Desactivar Sector
1. Click en "Desactivar" en una fila activa
2. Confirmar en el modal
3. Verificar que el estado cambió a "Inactivo"
4. El botón "Desactivar" debería quedar deshabilitado

## Manejo de Errores

### Errores de Red
Si el backend no está disponible, se mostrará:
```
Error: No se pudieron cargar los sectores.
```

### Error de Autenticación (401)
Si no hay token JWT o expiró:
```
Error: No autorizado. Por favor, inicie sesión.
```

### Error de Permisos (403)
Si el usuario no tiene rol "Administrador":
```
Error: No tiene permisos para realizar esta acción.
```

### Nombre Duplicado
Si se intenta crear un sector con nombre existente:
```
Error: El nombre del sector ya existe.
```

## Notas Importantes

1. **Autenticación**: El backend requiere JWT con rol "Administrador". Actualmente el frontend intenta usar un token de localStorage, pero si no existe, las peticiones fallarán con 401.

2. **CORS**: El backend tiene CORS configurado para permitir cualquier origen en desarrollo.

3. **Soft Delete**: La operación DELETE no elimina físicamente el registro, solo cambia `EstaActivo = false`.

4. **Validación**: Tanto frontend como backend validan que el nombre no esté duplicado al crear.

## Próximos Pasos

Para completar la integración del sistema:
1. Implementar sistema de autenticación (login) en el frontend
2. Guardar JWT token en localStorage al iniciar sesión
3. Implementar funcionalidad para reactivar sectores desactivados
4. Agregar paginación si la lista de sectores crece mucho
