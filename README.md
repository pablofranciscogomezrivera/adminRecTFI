# Sistema de Gestión Personal (TFI)

Este proyecto es el Trabajo Final Integrador (TFI) para la materia **Administración de Recursos**. Es una solución integral para la gestión de empleados, estructura organizacional y análisis de métricas de RRHH.

El sistema permite administrar el ciclo de vida de los empleados, gestionar la jerarquía corporativa (supervisores), controlar la seguridad mediante roles y generar reportes ejecutivos con exportación a PDF.

---

## 🚀 Tecnologías Utilizadas

### Backend (API REST)
* **Framework:** .NET 8 (ASP.NET Core Web API)
* **Base de Datos:** SQL Server (LocalDB / Production)
* **ORM:** Entity Framework Core (Code-First)
* **Seguridad:** JWT (JSON Web Tokens) + BCrypt (Hashing)
* **Reportes:** QuestPDF (Generación de documentos PDF)
* **Documentación:** Swagger / OpenAPI

### Frontend (SPA)
* **Framework:** React (Vite) / Node.js
* **Estilos:** CSS Modules / Tailwind 
* **Consumo API:** Fetch / Axios

---

## 📋 Funcionalidades del Sistema

El sistema está dividido en 4 módulos principales, cubriendo las Historias de Usuario (HU) definidas:

### 1. Módulo de Configuración (Administrador)
* **Gestión de Sectores:** ABM de departamentos (ej. Contabilidad, Sistemas).
* **Gestión de Roles:** Definición de puestos y descripciones.
* *Nota:* Implementación de baja lógica (Soft Delete) para preservar histórico.

### 2. Módulo de Empleados (RRHH)
* **Alta de Empleados:** Registro completo con validaciones de negocio (DNI único, Sueldo positivo).
* **Gestión Jerárquica:** Asignación de Supervisores/Gerentes con validación de roles.
* **Búsqueda Avanzada:** Filtrado por nombre, sector y paginación desde el servidor.
* **Desvinculación:** Baja lógica con registro de fecha de egreso (no se borran datos).

### 3. Módulo de Seguridad (Transversal)
* **Autenticación:** Login seguro con email y contraseña.
* **Autorización (RBAC):** Control de acceso basado en roles.
    * *Admin/RRHH:* Permisos de escritura (Crear/Editar).
    * *Gerencia/Supervisores:* Permisos de lectura y reportes.
* **Protección:** Encriptación de contraseñas y validación de Tokens JWT en cada petición.

### 4. Módulo de Reportes (Gerencia)
* **Dashboard de Dotación:** KPIs en tiempo real (Masa Salarial, Sueldo Promedio, Antigüedad).
* **Gráficos:** Datos estadísticos para visualización de distribución por Sector y Nivel de Estudio.
* **Exportación PDF:** Generación automática de reporte ejecutivo descargable con tablas de métricas.

---

## 🛠️ Configuración e Instalación

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos
* .NET SDK 8.0
* SQL Server (o LocalDB instalada con Visual Studio)
* Node.js (v18 o superior)

### 1. Configuración del Backend

1.  Navega a la carpeta del backend:
    ```bash
    cd backend/RecursosTFI
    ```
2.  Configura la conexión a base de datos en `appsettings.json`:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=RecursosTFIDB;Trusted_Connection=True;MultipleActiveResultSets=true"
    },
    "Jwt": {
      "Key": "TuClaveSuperSecretaDebeSerLarga123!",
      "Issuer": "http://localhost:7224",
      "Audience": "http://localhost:7224"
    }
    ```
3.  Ejecuta las migraciones para crear la base de datos:
    ```bash
    dotnet ef database update
    ```
4.  Inicia la API:
    ```bash
    dotnet run
    ```
    *La API estará disponible en `https://localhost:7224` (o el puerto configurado).*

### 2. Configuración del Frontend

1.  Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz del frontend para conectar con la API:
    ```properties
    VITE_API_URL=https://localhost:7224
    ```
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

---

## 📚 Documentación de API

Una vez iniciado el backend, puedes acceder a la documentación interactiva (Swagger) en:

`https://localhost:7224/swagger`

Desde allí podrás probar los endpoints. Recuerda usar el botón **Authorize** con el prefijo `Bearer ` + tu token para probar endpoints protegidos.

---

## 👥 Autores

**Equipo de Desarrollo:**


* **Jimenez, Corina** - *Frontend Developer*
* **Palacios, Victor** - *Frontend Developer*
* **Marquetti, Gaspar** - *Backend Developer & Base de Datos*
* **Gómez Rivera, Pablo** - *Backend Developer & Base de Datos*

---
*Trabajo Final Integrador - Ingeniería en Sistemas - 2025*
