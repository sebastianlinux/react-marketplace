#  API NestJS Marketplace - MagicLoc

[![Licencia](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://your-website.com/build)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](https://your-website.com/version)
[![Coverage](https://img.shields.io/badge/Coverage-90%-green)](https://your-website.com/coverage)  API RESTful construida con NestJS y Prisma ORM para el marketplace MagicLoc.  Proporciona funcionalidades para la gestión de usuarios, productos y autenticación, permitiendo a los usuarios registrarse, iniciar sesión, publicar anuncios, navegar por productos y mucho más.

##  Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Tecnologías](#2-tecnologías)
3. [Instalación](#3-instalación)
4. [Configuración](#4-configuración)
5. [Comandos](#5-comandos)
6. [Estructura del Proyecto](#6-estructura-del-proyecto)
7. [Documentación de la API](#7-documentación-de-la-api)
8. [Servicios](#8-servicios)
9. [Módulos](#9-módulos)
10. [Rutas](#10-rutas)
11. [Controladores](#11-controladores)
12. [Entidades y DTOs](#12-entidades-y-dtos)
13. [Migraciones de la Base de Datos](#13-migraciones-de-la-base-de-datos)
14. [Pruebas](#14-pruebas)
15. [Despliegue](#15-despliegue)
16. [Contribución](#16-contribución)
17. [Licencia](#17-licencia)

##  1. Introducción <a name="1-introducción"></a>

MagicLoc es un marketplace innovador que conecta a compradores y vendedores de manera eficiente. Esta API proporciona la base para las funcionalidades del marketplace, permitiendo la gestión de usuarios, productos y la autenticación segura.  Construida con NestJS y Prisma, la API ofrece un rendimiento óptimo y una fácil mantenibilidad.

## ️ 2. Tecnologías <a name="2-tecnologías"></a>

*   **NestJS:** Framework de Node.js para construir aplicaciones de servidor escalables y mantenibles.
*   **Prisma ORM:** ORM moderno que simplifica la interacción con la base de datos.
*   **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
*   **TypeScript:** Lenguaje de programación que añade tipado estático a JavaScript.
*   **Express:** Framework web para Node.js (utilizado internamente por NestJS).
*   **[Otras tecnologías utilizadas]:**  (Ej: Bcrypt, JWT, Class-transformer, etc.)

## ⚙️ 3. Instalación <a name="3-instalación"></a>

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/sebastianlinux/nest-marketplace
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

##  4. Configuración <a name="4-configuración"></a>

1.  Crea un archivo `.env` en la raíz del proyecto y copia el contenido del archivo `.env.example` como plantilla.

2.  Configura las variables de entorno en el archivo `.env`:

    ```
    DATABASE_URL="mysql://user:password@IP.amazonaws.com:3306/database"
    JWT_SECRET="[Clave secreta para JWT]"
    # [Otras variables de entorno]
    ```

3.  Configura la base de datos con Prisma:

    ```bash
    npx prisma generate
    ```

##  5. Comandos <a name="5-comandos"></a>

*   **Desarrollo:**

    ```bash
    npm run start:dev
    ```

*   **Producción:**

    ```bash
    npm run start:prod
    ```

*   **Pruebas:**

    ```bash
    npm run test
    ```

*   **Pruebas unitarias:**

    ```bash
    npm run test:unit
    ```

*   **Pruebas de integración (e2e):**

    ```bash
    npm run test:e2e
    ```

*   **Migraciones de la base de datos:**

    ```bash
    npx prisma migrate dev --name [nombre-de-la-migracion]
    ```

*   **Generar el cliente de Prisma:**

    ```bash
    npx prisma generate
    ```

*   **Documentación de la API (Swagger):**

    ```bash
    npm run start:dev # Inicia el servidor de desarrollo
    # Luego, accede a la documentación en http://localhost:3000/api
    ```

##  6. Estructura del Proyecto <a name="6-estructura-del-proyecto"></a>

```markdown
src/
├── app.module.ts        # Módulo principal de la aplicación
├── app.controller.ts    # Controlador principal de la aplicación
├── app.service.ts      # Servicio principal de la aplicación
├── auth/               # Módulo de autenticación
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── auth.middleware.ts
│   └── jwt.strategy.ts
├── users/              # Módulo de usuarios
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── entities/
│   │   └── user.entity.ts
│   └── dto/
│       └── create-user.dto.ts
├── products/           # Módulo de productos
│   ├── products.module.ts
│   ├── products.service.ts
│   ├── products.controller.ts
│   └── ...
├── prisma.service.ts    # Servicio de Prisma
├── main.ts             # Archivo principal de la aplicación
├── ...
test/                 # Pruebas
├── app.e2e-spec.ts
└── app.e2e.ts
.env                   # Archivo de entorno
.env.example           # Plantilla de archivo de entorno
prisma/               # Archivos de Prisma
├── schema.prisma
└── migrations/
package.json
tsconfig.json
README.md
```

##  7. Documentación de la API <a name="7-documentación-de-la-api"></a>

La API está documentada con Swagger. Para acceder a la documentación, ejecuta el servidor de desarrollo (`npm run start:dev`) y navega a `http://localhost:3000/api`.

## ⚙️ 8. Servicios <a name="8-servicios"></a>

*   **`users.service`**: Gestiona las operaciones relacionadas con los usuarios (creación, obtención, actualización, eliminación). Incluye métodos para hashear contraseñas y manejar errores de correo electrónico duplicado. Utiliza Prisma Service para interactuar con la base de datos y `class-transformer` para convertir los resultados a entidades de usuario.

*   **`products.service`**: Gestiona las operaciones relacionadas con los productos (creación, obtención, actualización, eliminación). Valida el precio y maneja errores de SKU duplicado.  Ofrece opciones de filtrado y paginación. Convierte los resultados de Prisma a DTOs usando `class-transformer`. Maneja excepciones como `ConflictException`, `BadRequestException` y `NotFoundException`.

*   **`auth.service`**: Gestiona la lógica de autenticación (inicio de sesión, validación de usuarios, verificación de tokens JWT). Utiliza `UsersService` para interactuar con la base de datos y `JwtService` para la generación y verificación de tokens.  Utiliza `bcrypt` para comparar contraseñas hasheadas.

## ️ 9. Módulos <a name="9-módulos"></a>

*   **`auth.module`**: Encapsula la funcionalidad de autenticación. Importa `UsersModule`, `PassportModule` y `JwtModule`.  Declara `AuthController` y provee `AuthService` y `JwtStrategy`.

*   **`users.module`**: Encapsula la lógica y componentes relacionados con la gestión de usuarios. Declara `UsersController`, provee `UsersService` y `PrismaService`.

*   **`products.module`**: Gestiona la funcionalidad relacionada con los productos. Importa `AuthModule`, `MulterModule` (para uploads) y `UsersModule`. Declara `ProductsController` y provee `ProductsService` y
*   


###  10. Rutas
https://nest-marketplace.onrender.com/users 
https://nest-marketplace.onrender.com/products
https://nest-marketplace.onrender.com/auth 

###  11. Controladores
### AppController: 
Maneja las rutas principales de la aplicación.
#### AuthController: 
Gestiona la autenticación de usuarios (login, registro, etc.).
### UsersController: 
Expone endpoints para la gestión de usuarios (creación, lectura, actualización, eliminación).
### ProductsController: 
Ofrece endpoints para la gestión de productos (creación, lectura, actualización, eliminación, búsqueda, etc.).
### 12. Entidades y DTOs
UserEntity, loginDto,productDto,createUserDto,updateUserDto,createProductDto,updateProductDto

### 13. Migraciones de la Base de Datos
ejectar el comando: npm prisma migrate dev --name init
Esta base de datos almacena información esencial para un marketplace en línea, incluyendo:
Usuarios: Detalles de los usuarios registrados (nombre, correo electrónico, contraseña, etc.).
Productos: Información de los productos ofrecidos (nombre, descripción, precio, imágenes, etc.).
La base de datos está diseñada para ser eficiente y escalable, permitiendo el crecimiento del marketplace y la adición de nuevas funcionalidades en el futuro.

### 14. Pruebas
Pruebas unitarias a realizar: login, registro, crearProduct, listProduct,Paginacion, Busquedas.

### 15. Despliegue

desplegado en render https://nest-marketplace.onrender.com

