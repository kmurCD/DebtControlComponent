# DebtControlComponent

Componente PCF para gestión y control de deudas en Power Platform.

## Descripción

DebtControlComponent es un PowerApps Component Framework (PCF) que permite visualizar, actualizar y notificar sobre deudas de clientes, integrando funcionalidades de carga de archivos, notificaciones y visualización de historial.

## Características principales
- Visualización de deudas y saldos por cliente
- Filtros y paginación
- Notificación a vendedores y clientes
- Carga de archivos y actualización de datos
- Visualización de historial de procesos
- Indicador de última actualización
- Visualización de versión de la aplicación

## Estructura del proyecto
- `DebtControlComponent/` — Código fuente principal del componente
  - `components/` — Componentes React (tabla, botones, modales, etc.)
  - `contexts/` — Contextos de React (usuario)
  - `hooks/` — Hooks personalizados (deuda, historial, notificaciones, carga de archivos)
  - `service/` — Servicios de acceso a datos (API)
  - `interface/` — Tipos y entidades
  - `css/` — Estilos personalizados
- `package.json` — Dependencias y scripts
- `tsconfig.json` — Configuración de TypeScript
- `pcfconfig.json` — Configuración PCF
- `PCF_DebtControlDeuda.pcfproj` — Proyecto PCF

## Instalación y uso

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

```powershell
npm install
```

3. Compila el componente:

```powershell
npm run build
```

4. Para desarrollo en caliente:

```powershell
npm run start:watch
```

5. Empaqueta y publica el componente en tu entorno Power Platform:

```powershell
pac pcf push --publisher-prefix <tu-prefijo>
```

## Personalización
- Cambia la versión en `MainDebtControl.tsx` (constante `VERSION`).
- Modifica estilos en `css/antd-custom.css` o `css/theme.less`.
- Ajusta servicios en `service/` para conectar a tus APIs.

## Requisitos
- Node.js >= 14
- Power Platform CLI (`pac`)
- PowerApps y permisos de administrador para publicar componentes

## Créditos
Desarrollado por Josue Centella.


