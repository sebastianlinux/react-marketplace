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

##  Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Tecnologías & pre-requisitos](#2-pre-requisitos)
3. [Instalación](#3-instalación)
4. [Configuración](#4-configuración)
5. [Comandos](#5-comandos)
6. [Estructura del Proyecto](#6-estructura-del-proyecto)
7. [Componentes Principales](#7-componentes-principales)
8. [Flujo de la Aplicación](#8-flujo-de-la-aplicación)
9. [Integración con el Backend](#9-integración-con-el-backend)
10. [Consideraciones de Diseño](#10-consideraciones-de-diseño)
11. [Pruebas](#11-pruebas)
12. [Despliegue](#12-despliegue)
13. [Consejos Adicionales](#13-consejos-adicionales)
14. [Licencia](#14-licencia)

##  1. Introducción <a name="1-introducción"></a>

<p align="justify">
  Este marketplace permite a los usuarios vender y comprar productos de forma sencilla e intuitiva. La plataforma ofrece funcionalidades como registro de usuarios, listado de productos, detalles de productos, creación de productos y búsqueda de productos. El frontend está desarrollado con ReactJS, utilizando Material UI para una interfaz de usuario moderna y responsive. El backend se comunica a través de una API RESTful.
</p>

## ⚙️ 2. Pre-requisitos y Tecnologías <a name="2-pre-requisitos"></a>

Asegúrate de tener instalado lo siguiente en tu máquina:

*   **Node.js:** (versión recomendada: v16 o superior) - [https://nodejs.org/](https://nodejs.org/)
*   **npm o yarn:** (gestor de paquetes) - [https://www.npmjs.com/](https://www.npmjs.com/) o [https://yarnpkg.com/](https://yarnpkg.com/)
*   **Git:** (opcional, para clonar el repositorio) - [https://git-scm.com/](https://git-scm.com/)
 
### Tecnologías
 
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

## ️ 3. Instalación <a name="3-instalación"></a>

### Frontend

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/sebastianlinux/react-marketplace
    ```

2.  Navega a la carpeta react-marketplace:

    ```bash
    cd react-marketplace
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    # o
    yarn install
    ```


##  4. Configuración <a name="4-configuración"></a>

### Frontend

1.  Crea un archivo `.env` en la raíz del proyecto y copia el contenido del archivo `.env.example`.

2.  Configura las variables de entorno en el archivo `.env`:

    *   `REACT_APP_API_URL`: URL base de la API del backend.
    *   Otras variables de entorno que tu proyecto requiera.


##  5. Comandos <a name="5-comandos"></a>


*   Iniciar el servidor de desarrollo:

    ```bash
    npm start
    # o
    yarn start
    ```

*   Ejecutar pruebas unitarias:

    ```bash
    npm test
    # o
    yarn test
    ```

*   Construir la aplicación para producción:

    ```bash
    npm run build
    # o
    yarn build
    ```
 

##  6. Estructura del Proyecto <a name="6-estructura-del-proyecto"></a>

```markdown
.
├── App.css
├── App.tsx
├── Layouts
│   └── MainLayout.tsx
├── Middleware
│   └── ProtectedRouteRole.tsx
├── components
│   ├── Cart.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoginDialog.tsx
│   ├── Navbar.tsx
│   ├── Notify.tsx
│   ├── Pagination.tsx
│   ├── Product
│   │   ├── AddProduct.tsx
│   │   ├── ProductDetail.tsx
│   │   └── ProductList.tsx
│   ├── RegisterDialog.tsx
│   ├── StarDisplay.tsx
│   └── Users
│       └── UsersList.tsx
├── hooks.ts
├── index.css
├── index.tsx
├── logo.svg
├── pages
│   ├── Admin
│   │   ├── UserProduct.tsx
│   │   └── UsersPage.tsx
│   ├── LandingPage.tsx
│   ├── OrderResumePage.tsx
│   ├── ProfilePage.tsx
│   ├── UnauthorizedPage.tsx
│   └── UserProductsPage.tsx
├── redux
│   ├── authSlice.ts
│   └── cartSlice.ts
├── services
│   └── Api.tsx
├── setupTests.ts
├── store.ts
├── theme.ts
└── types.tsx

```

## ⚛️ 7. Componentes Principales <a name="7-componentes-principales"></a>

*   **`ProductCard`**: Muestra la información de un producto en forma de tarjeta.
*   **`Navbar`**: Barra de navegación con enlaces a las diferentes secciones del marketplace.
*   **`Home`**: Página principal con la lista de productos.
*   **`ProductDetails`**: Página con los detalles de un producto específico.
*   **`Profile`**: Página de perfil del usuario.
*   [Añade aquí otros componentes importantes]

##  8. Flujo de la Aplicación <a name="8-flujo-de-la-aplicación"></a>

1.  El usuario se registra o inicia sesión en la plataforma.
2.  El usuario navega por el catálogo de productos.
3.  El usuario puede ver los detalles de un producto específico.
4.  El usuario puede añadir productos al carrito y realizar compras.
5.  El vendedor puede iniciar sesión para añadir sus productos.
6.  El vendedor gestiona sus productos (crear, editar, eliminar).

##  9. Integración con el Backend <a name="9-integración-con-el-backend"></a>

Las peticiones al backend se realizan con `axios`.

```javascript
// Ejemplo de petición GET para obtener productos
import axios from 'axios';

const getProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
```


### 10. Consideraciones de Diseño <a name="10-consideraciones-de-diseño"></a>
Diseño Responsivo: Se utilizó CSS y Material UI para garantizar una experiencia de usuario óptima en diferentes dispositivos.
Accesibilidad: Se tuvieron en cuenta aspectos de accesibilidad para que la aplicación sea usable por personas con discapacidades.
Experiencia de Usuario (UX): Se priorizó la simplicidad y la facilidad de uso para crear una experiencia intuitiva.

### 11. Pruebas <a name="11-pruebas"></a>
Se realizaron pruebas unitarias para garantizar la calidad y el correcto funcionamiento de los componentes y funcionalidades principales.

### 12. Despliegue <a name="12-despliegue"></a>
La aplicación puede ser desplegada utilizando el build generado con npm run build o yarn build en cualquier servidor estático como Nginx, Amazon S3, Render, Netlify, Vercel, etc.

### 13. Consejos Adicionales <a name="13-consejos-adicionales"></a>
Mantener al día las dependencias del proyecto.


