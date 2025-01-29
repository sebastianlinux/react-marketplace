# ️ Proyecto ReactJS Marketplace

[![Licencia](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://your-website.com/build)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](https://your-website.com/version)

Este proyecto es un marketplace construido con ReactJS en el frontend y [especifica la tecnología del backend: NestJS, Express, etc.] en el backend. Permite a los usuarios [describe las funcionalidades principales del marketplace: navegar por productos, publicar anuncios, realizar compras, etc.].

[![front1.png](https://i.postimg.cc/cHrsXbQW/front1.png)](https://postimg.cc/hzRWGMyZ)

 [![front2.png](https://i.postimg.cc/yx0CG4xM/front2.png)](https://postimg.cc/JH7FyFbx)

 [![Captura-de-pantalla-2025-01-29-a-la-s-3-10-29-p-m.png](https://i.postimg.cc/Kj78Cs8H/Captura-de-pantalla-2025-01-29-a-la-s-3-10-29-p-m.png)](https://postimg.cc/MfTwQ5R7)

 [![Captura-de-pantalla-2025-01-29-a-la-s-3-38-24-p-m.png](https://i.postimg.cc/J7y6jDTv/Captura-de-pantalla-2025-01-29-a-la-s-3-38-24-p-m.png)](https://postimg.cc/MXSmSTJm)

 [![Captura-de-pantalla-2025-01-29-a-la-s-3-13-03-p-m.png](https://i.postimg.cc/0yY0c8vY/Captura-de-pantalla-2025-01-29-a-la-s-3-13-03-p-m.png)](https://postimg.cc/mPr9rWtk)

##  Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Tecnologías](#2-tecnologías)
3. [Pre-requisitos](#3-pre-requisitos)
4. [Instalación](#4-instalación)
5. [Configuración](#5-configuración)
6. [Comandos](#6-comandos)
7. [Estructura del Proyecto](#7-estructura-del-proyecto)
8. [Componentes Principales](#8-componentes-principales)
9. [Flujo de la Aplicación](#9-flujo-de-la-aplicación)
10. [Integración con el Backend](#10-integración-con-el-backend)
11. [Consideraciones de Diseño](#11-consideraciones-de-diseño)
12. [Pruebas](#12-pruebas)
13. [Despliegue](#13-despliegue)
14. [Consejos Adicionales](#14-consejos-adicionales)
15. [Licencia](#15-licencia)

##  1. Introducción <a name="1-introducción"></a>

<p align="justify">
  Este marketplace permite a los usuarios vender y comprar productos de forma sencilla e intuitiva. La plataforma ofrece funcionalidades como registro de usuarios, listado de productos, detalles de productos, creación de productos y búsqueda de productos. El frontend está desarrollado con ReactJS, utilizando Material UI para una interfaz de usuario moderna y responsive. El backend se comunica a través de una API RESTful.
</p>

## 2. Tecnologías <a name="2-tecnologías"></a>

*   **ReactJS:** Librería para construir interfaces de usuario interactivas y dinámicas.
*   **Material UI:** Framework de componentes React que implementa el diseño de Google Material Design.
*   **Redux:** Librería para la gestión del estado global de la aplicación.
*   **Redux Persist:** Librería para la persistencia del estado de Redux en el almacenamiento local.
*   **React Router:** Librería para la navegación en aplicaciones React.
*   **Axios:** Cliente HTTP basado en promesas para realizar peticiones al backend.
*   **Formik:** Librería para la gestión de formularios en React.
*   **Yup:** Librería para la definición de esquemas de validación.
*   **@emotion/react:** Librería para estilado con Emotion.
*   **@emotion/styled:** Librería para estilado con Emotion.
*   **@mui/icons-material:** Librería de iconos de Material Design.
*   **@reduxjs/toolkit:** Conjunto de herramientas oficial para Redux, simplifica la creación de stores y reducers.
*   **decimal.js:** Librería para realizar cálculos decimales precisos.
*   **Moment:** Librería para el manejo de fechas y tiempos.
*   **react-toastify:** Librería para mostrar notificaciones toast en React.
*   **serve:** Servidor estático para servir tu aplicación React en producción.
*   **use-debounce:** Hook para evitar ejecuciones repetidas de funciones.
*   **web-vitals:** Librería para medir las Core Web Vitals.

## Dependencias de desarrollo

*   **@types/react:** Definiciones de tipo para React.
*   **@types/react-dom:** Definiciones de tipo para React DOM.
*   **react-scripts:** Conjunto de scripts y herramientas para el desarrollo de aplicaciones React (create-react-app).
*   **typescript:** Compilador de TypeScript.

## ⚙️ 3. Pre-requisitos <a name="3-pre-requisitos"></a>

Asegúrate de tener instalado lo siguiente en tu máquina:

*   **Node.js:** (versión recomendada: v16 o superior) - [https://nodejs.org/](https://nodejs.org/)
*   **npm o yarn:** (gestor de paquetes) - [https://www.npmjs.com/](https://www.npmjs.com/) o [https://yarnpkg.com/](https://yarnpkg.com/)
*   **Git:** (opcional, para clonar el repositorio) - [https://git-scm.com/](https://git-scm.com/)

## ️ 4. Instalación <a name="4-instalación"></a>

### Frontend

1.  Clona el repositorio:

    ```bash
    git clone [https://github.com/sebastianlinux/react-marketplace](https://github.com/sebastianlinux/react-marketplace)
    ```

2.  Navega a la carpeta react-marketplace:

    ```bash
    cd react-marketplace
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    # o
    yarn install
    ```

##  5. Configuración <a name="5-configuración"></a>

### Frontend

1.  Crea un archivo `.env` en la raíz del proyecto y copia el contenido del archivo `.env.example`.

2.  Configura las variables de entorno en el archivo `.env`:

    *   `REACT_APP_API_URL`: URL base de la API del backend.
    *   Otras variables de entorno que tu proyecto requiera.

##  6. Comandos <a name="6-comandos"></a>

*   Iniciar el servidor de desarrollo:

    ```bash
    npm start
    # o
    yarn start
    ```

*   Ejecutar pruebas unitarias:

    ```bash
    npm test
    # o
    yarn test
    ```

*   Construir la aplicación para producción:

    ```bash
    npm run build
    # o
    yarn build
    ```

##  7. Estructura del Proyecto <a name="7-estructura-del-proyecto"></a>

```markdown
.
├── App.css
├── App.tsx
├── Layouts
│   └── MainLayout.tsx
├── Middleware
│   └── ProtectedRouteRole.tsx
├── components
│   ├── Cart.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoginDialog.tsx
│   ├── Navbar.tsx
│   ├── Notify.tsx
│   ├── Pagination.tsx
│   ├── Product
│   │   ├── AddProduct.tsx
│