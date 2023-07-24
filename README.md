![Index app](./doc/assets/MicroService_Users_ML.drawio.png)

# Microservice\_Mercadolibre\_Users\_AWS

Microservicio para la gestión de usuarios replicando y modificando parte de la arquitectura de desarrollo de ML  implementada con Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, NodeJs, Sequelize, Mysql, Swagger, entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

*   [Repositorio base de datos](https://github.com/andresWeitzel/Microdb_MercadoLibre_Mysql)
*   [Api Doc ML Usuarios](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Playlist prueba de funcionalidad](https://www.youtube.com/watch?v=oLSrmqMq0Zs\&list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y)

<br>

## Índice 📜

<details>
 <summary> Ver </summary>

 <br>

### Sección 1) Descripción, configuración y tecnologías.

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
*   [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Ejemplos

*   [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
*   [2.1) Ejemplos.](#21-ejemplos-)

### Sección 3) Prueba de funcionalidad y Referencias

*   [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
*   [3.1) Referencias.](#31-referencias-)

<br>

</details>

<br>

## Sección 1) Descripción, configuración y tecnologías.

### 1.0) Descripción [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

### 1.0.0) Descripción General

*   El Microservicio está diseñado bajo la arquitectura MVC. Dicha arquitectura consta y está dividida en la capa de modelo (definición de la tabla user), la capa de servicio (la conexión y transacciones hacia la db con sequelize) y la capa controller (las lambdas implementadas).
*   Cada lambda realiza la comprobación de autenticación de token, las que esperan un evento de tipo body comprueban dichos campos y toda la lógica a realizar se abstrae de la misma para desacoplar funcionalidades junto con bajo acoplamiento.
*   Los endpoints que permiten la devolución de más de un objeto según lógica de búsqueda aplicada se manejan con paginados caso de ser requerido. Se aplica paginación por defecto.

### 1.0.1) Descripción Arquitectura y Funcionamiento

*   La imagen de la arquitectura de aws empleada describe el flujo de funcionamiento del microservicio de forma general. Cualquier petición hacia el microservicio parte desde un cliente (Postman, servidor, etc).
*   `Paso 0` : Dicha solicitud es recibida por el api-gateway y solamente se validará si es que dentro de los encabezados de dicha solicitud se encuentra la x-api-key correcta.
*   `Pasos 1A, 1B, etc` : Todos estos pasos corresponden a un endpoint con su recurso especifico. Por ej. para getAllUsers (1A) es http://localhost:4000/dev/users/list ....revisar dichos endpoints en [sección endpoints](#sección-2-endpoints-y-ejemplos). Cada lambda realiza comprobación de x-api-key y token.
*   `Pasos 2` : Las lambdas realizan las validaciones de las ssm correspondientes con el System Manager Paramater Store.. validan token, valores de conexión con la db etc.
*   `Pasos 3` : Las lambdas realizan las transacciones y operaciones necesarias con la db (Mysql).
*   `Aclaraciones` : Se emula dicho funcionamiento dentro de la misma red y en entorno local con los plugins de serverless correspondientes.

<br>

</details>

### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

*   Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS
```

*   Nos posicionamos sobre el proyecto

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado

```git
npm install -g serverless
```

*   Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Instalamos todos los paquetes necesarios

```git
npm i
```

*   Las variables ssm utilizadas en el proyecto se mantienen para simplificar el proceso de configuración del mismo. Es recomendado agregar el archivo correspondiente (serverless\_ssm.yml) al .gitignore.
*   El script start configurado en el package.json del proyecto, es el encargado de levantar
    *   El plugin de serverless-offline
    *   El plugin remark-lint para archivos .md (se aplica solo el --output para check and autoformat sin terminar el proceso y poder ejecutar el script de serverless)

```json
  "scripts": {
    "check": "remark . --quiet --frail",
    "format": "remark . --quiet --frail --output",
    "format-md": "remark . --output",
    "serverless-offline": "sls offline start",
    "start": "npm run format-md && npm run serverless-offline"
  },
```

*   Ejecutamos la app desde terminal.

```git
npm start
```

*   Si se presenta algún mensaje indicando qué el puerto 4000 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app

```git
npx kill-port 4000
npm start
```

<br>

</details>
 <br>

### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

*   Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado

```git
npm install -g serverless
```

*   Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Inicializamos un template de serverles

```git
serverless create --template aws-nodejs
```

*   Inicializamos un proyecto npm

```git
npm init -y
```

*   Instalamos serverless offline

```git
npm i serverless-offline --save-dev
```

*   Instalamos serverless ssm

```git
npm i serverless-offline-ssm --save-dev
```

*   Instalamos autoswagger

```git
npm i serverless-auto-swagger
```

*   Agregamos los plugins de serverless al .yml

```yml
plugins:
   - serverless-auto-swagger
  - serverless-offline-ssm
  - serverless-offline

```

*   Descargamos el plugin para la ejecución de scripts de forma concurrente ([concurrently](https://www.npmjs.com/package/concurrently))

```git
npm i concurrently
```

*   Configuraremos un formato estándar de archivos markdown para el proyecto a través de [remark-lint](https://github.com/remarkjs/remark-lint#example-check-markdown-on-the-api)

```git
npm install remark-cli remark-preset-lint-consistent remark-preset-lint-recommended remark-lint-list-item-indent --save-dev

npm install remark-lint-emphasis-marker remark-lint-strong-marker --save-dev

npm install remark-lint-table-cell-padding --save-dev
```

*   Luego agregamos la configuración para los scripts desde el package.json

```json
  "scripts": {
    "check": "remark . --quiet --frail",
    "format": "remark . --quiet --frail --output",
  },
```

*   En mi caso, quiero que se aplique un autoformato por cada ejecución, ejecutamos los scripts juntos(se aplica solo el --output para check and autoformat sin terminar el proceso y poder ejecutar el script de serverless)

```json
  "scripts": {
    "check": "remark . --quiet --frail",
    "format": "remark . --quiet --frail --output",
    "format-md": "remark . --output",
    "serverless-offline": "sls offline start",
    "start": "npm run format-md && npm run serverless-offline"
  },
```

*   Luego agregamos los remark configs, al final, en el package.json

```json
 "remarkConfig": {
    "settings": {
      "emphasis": "*",
      "strong": "*"
    },
    "plugins": [
      "remark-preset-lint-consistent",
      "remark-preset-lint-recommended",
      "remark-lint-table-cell-padding",
      [
        "remark-lint-list-item-indent",
        "tab-size"
      ],
      [
        "remark-lint-emphasis-marker",
        "*"
      ],
      [
        "remark-lint-strong-marker",
        "*"
      ]
    ]
  }
```

*   Para más información al respecto, visitar la [página oficial](https://github.com/remarkjs/remark-lint#example-check-markdown-on-the-api)

*   Las variables ssm utilizadas en el proyecto se mantienen para simplificar el proceso de configuración del mismo. Es recomendado agregar el archivo correspondiente (serverless\_ssm.yml) al .gitignore.

*   El siguiente script (start), configurado en el package.json del proyecto, es el encargado de ejecutar
    *   El plugin de serverless-offline
    *   El plugin remark-lint para archivos .md

```json
  "scripts": {
    "check": "remark . --quiet --frail",
    "format": "remark . --quiet --frail --output",
    "format-md": "remark . --output",
    "serverless-offline": "sls offline start",
    "start": "npm run format-md && npm run serverless-offline"
  },
```

*   Ejecutamos la app desde terminal.

```git
npm start
```

*   Si se presenta algún mensaje indicando qué el puerto 4000 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app

```git
npx kill-port 4000
npm start
```

<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

| **Tecnologías** | **Versión** | **Finalidad** |\
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [Sequelize](https://sequelize.org/) | ^6.11.0 | ORM |
| [Mysql](https://www.mysql.com/) | 10.1 | SGDB |
| [XAMPP](https://www.apachefriends.org/es/index.html) | 3.2.2 | Paquete de servidores |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |

</br>

| **Plugin** |
| -------------  |
| [Serverless Plugin](https://www.serverless.com/plugins/) |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |

</br>

| **Extensión** |\
| -------------  |
| Prettier - Code formatter |
| YAML - Autoformatter .yml |
| Error Lens - Identificador de errores |

<br>

</details>

<br>

## Sección 2) Endpoints y Ejemplos.

### 2.0) Endpoints y recursos [🔝](#índice-)

<details>
  <summary>Ver</summary>

### Operaciones de tipo GET:

*   http://localhost:4000/dev/v1/test
*   http://localhost:4000/dev/v1/db-connection
*   http://localhost:4000/dev/v1/users/list
*   http://localhost:4000/dev/v1/users/id/{user-id}
*   http://localhost:4000/dev/v1/users/country-id/{country-id}
*   http://localhost:4000/dev/v1/users/email/{email}
*   http://localhost:4000/dev/v1/users/first-name/{first-name}
*   http://localhost:4000/dev/v1/users/identification-number/{ident-number}
*   http://localhost:4000/dev/v1/users/identification-type/{ident-type}
*   http://localhost:4000/dev/v1/users/last-name/{last-name}
*   http://localhost:4000/dev/v1/users/nickname/{nickname}
*   http://localhost:4000/dev/v1/users/creation-date/{creation-date}
*   http://localhost:4000/dev/v1/users/update-date/{update-date}
*   `Todos los endpoints son paginados opcionales menos el /test, /db-connection y /id/{user-id}`

### Operaciones de tipo POST:

*   http://localhost:4000/dev/v1/users/add-user/

### Operaciones de tipo PUT:

*   http://localhost:4000/dev/v1/users/update-user/{user-id}

### Operaciones de tipo DELETE:

*   http://localhost:4000/dev/v1/users/delete-user/{user-id}

### Aclaraciones

*   {valor-requerido}
*   Paginado por defecto : ?page=0\&limit=5
*   Paginado opcional : ?page={nro}\&limit={nro}

<br>

</details>

### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

### 2.1.0) Variables en Postman

| **Variable** | **Initial value** | **Current value** |\
| ------------- | ------------- | ------------- |
| base\_url | http://localhost:4000/dev/  | http://localhost:4000/dev/ |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer\_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c |

<br>

### 2.1.1) Operaciones de tipo GET

### Conexión base de datos

#### Request (GET) | Code Snippet

```postman
curl --location 'http://localhost:4000/dev/v1/db-connection' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

#### Response (200 OK)

```postman
{
    "message": "Connection has been established successfully."
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, could not get the paginated list of users."
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in connection lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

#### Other responses

<br>

### Obtener Usuarios paginados

#### Request (GET) | Code Snippet

```postman
curl --location 'http://localhost:4000/dev/v1/users/list?page=0&limit=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

#### Response (200 OK)

```postman
{
    "message": [
        {
            "id": 3,
            "nickname": "HECTOR SS G",
            "first_name": "Hector",
            "last_name": "Gomez",
            "email": "hectorGomez78@gmail.com",
            "identification_type": "DNI",
            "identification_number": "2172265827",
            "country_id": "AR",
            "creation_date": "2023-03-20 21:02:33",
            "update_date": "2023-03-20 21:02:33"
        },
        {
            "id": 4,
            "nickname": "GABRIELA JIMENEZ",
            "first_name": "Gabriela",
            "last_name": "Jimenez",
            "email": "gabriela.consultas@hotmail.com",
            "identification_type": "DNI",
            "identification_number": "410871223",
            "country_id": "AR",
            "creation_date": "2023-03-20 21:02:33",
            "update_date": "2023-03-20 21:02:33"
        }
    ]
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, could not get the paginated list of users."
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in getAll lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

#### Other responses

<br>

### Obtener un Usuario según su id

#### Request (GET) | Code Snippet

```postman
curl --location 'http://localhost:4000/dev/v1/users/id/4' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j'
```

#### Response (200 OK)

```postman
{
    "message": {
        "id": 4,
        "nickname": "GABRIELA JIMENEZ",
        "first_name": "Gabriela",
        "last_name": "Jimenez",
        "email": "gabriela.consultas@hotmail.com",
        "identification_type": "DNI",
        "identification_number": "410871223",
        "country_id": "AR",
        "creation_date": "2023-03-20 21:02:33",
        "update_date": "2023-03-20 21:02:33"
    }
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, could not fetch user based on id."
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, the id passed as a parameter is not valid."
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in getById lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

#### Other responses

<br>

### Obtener listado paginado de Usuarios según su country-id

#### Request (GET) | Code Snippet

```postman
curl --location 'http://localhost:4000/dev/v1/users/country-id/AR?page=0&limit=3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

#### Response

```postman
{
    "message": [
        {
            "id": 3,
            "nickname": "HECTOR SS G",
            "first_name": "Hector",
            "last_name": "Gomez",
            "email": "hectorGomez78@gmail.com",
            "identification_type": "DNI",
            "identification_number": "2172265827",
            "country_id": "AR",
            "creation_date": "2023-03-20 21:02:33",
            "update_date": "2023-03-20 21:02:33"
        },
        {
            "id": 4,
            "nickname": "GABRIELA JIMENEZ",
            "first_name": "Gabriela",
            "last_name": "Jimenez",
            "email": "gabriela.consultas@hotmail.com",
            "identification_type": "DNI",
            "identification_number": "410871223",
            "country_id": "AR",
            "creation_date": "2023-03-20 21:02:33",
            "update_date": "2023-03-20 21:02:33"
        },
        {
            "id": 5,
            "nickname": "GUSTA G K",
            "first_name": "Gustavo",
            "last_name": "Gomez",
            "email": "gustavo_andaluz@gmail.com",
            "identification_type": "PASAPORTE",
            "identification_number": "748000221",
            "country_id": "AR",
            "creation_date": "2023-03-20 21:02:33",
            "update_date": "2023-03-20 21:02:33"
        }
    ]
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, could not get paginated list of users according to country id. Try again."
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, the country id passed as a parameter is not valid."
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in getLikeCountryId lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

#### Other responses

<br>

*   OTHER GET OPERATIONS (SEE POSTMAN COLLECTION)

### 2.1.2) Operaciones de tipo POST

### Agregar un Usuario

#### Request (POST) | Code snippet

```postman
curl --location 'http://localhost:4000/dev/v1/users/add-user/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data-raw '   {
            "nickname": "VALE18BNX",
            "first_name": "Valeria",
            "last_name": "Castro",
            "email": "vale_18_nnbs@gmail.com",
            "identification_type": "DNI",
            "identification_number": "3987261233",
            "country_id": "AR12"
        }'
```

#### Response (200 OK)

```postman
{
    "message": {
        "id": null,
        "nickname": "VALE18BNX",
        "first_name": "Valeria",
        "last_name": "Castro",
        "email": "vale_18_nnbs@gmail.com",
        "identification_type": "DNI",
        "identification_number": "3987261233",
        "country_id": "AR12",
        "creation_date": "2023-06-28T16:46:31.000Z",
        "update_date": "2023-06-28T16:46:31.000Z"
    }
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|maxLength:50), email (required|string|minLength:10|maxLength:100), identification_type and identification_number (required|string|minLength:6|maxLength:20), country_id (required|string|minLength:2|maxLength:5)"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in addUser lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

#### Other responses

<br>

### 2.1.3) Operaciones de tipo PUT

### Editar un Usuario

#### Request (PUT) | Code

```postman
curl --location --request PUT 'http://localhost:4000/dev/v1/users/update-user/26' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data-raw '     {
            "nickname": "VALE18BNX EDITED",
            "first_name": "Valeria EDITED",
            "last_name": "Castro",
            "email": "vale_18_nnbs@gmail.com",
            "identification_type": "DNI",
            "identification_number": "3987261233",
            "country_id": "AR12",
            "creation_date": "2023-06-28 16:46:31",
            "update_date": "2023-06-28 16:46:31"
        }'
```

#### Response (200 OK)

```postman
{
    "message": {
        "id": 26,
        "nickname": "VALE18BNX EDITED",
        "first_name": "Valeria EDITED",
        "last_name": "Castro",
        "email": "vale_18_nnbs@gmail.com",
        "identification_type": "DNI",
        "identification_number": "3987261233",
        "country_id": "AR12",
        "creation_date": "2023-06-28 19:46:31",
        "update_date": "2023-06-28 16:53:17"
    }
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check request attributes and object to update"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in updateUser lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

<br>

### 2.1.4) Operaciones de tipo DELETE

### Eliminar un Usuario

#### Request (DELETE) | Code snippet

```postman
curl --location --request DELETE 'http://localhost:4000/dev/v1/users/delete-user/26' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

#### Response (200 OK)

```postman
{
    "message": "User has been deleted successfully."
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (400 Bad Request)

```postman
{
    "message": "Bad request, a non-existent user cannot be deleted. Operation not allowed"
}
```

#### Response (401 Unauthorized)

```postman
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "ERROR. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306."
}
```

#### Response (500 Internal Server Error)

```postman
{
    "message": "Error in deleteUser lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

<br>

</details>

<br>

## Sección 3) Prueba de funcionalidad y Referencias.

### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

#### Tipos de Operaciones | [Ver](https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y)

![Index app](./doc/assets/playlist.png)

<br>

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

#### Configuración

*   [Cómo usar Sequelize con Node.js y MySQL](https://jasonwatmore.com/post/2022/06/26/nodejs-mysql-connect-to-mysql-database-with-sequelize-mysql2)
*   [Videotutorial Recomendado](https://www.youtube.com/watch?v=im7THL67z0c)

#### Herramientas

*   [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)

#### Sequelize

*   [Modelos y Operadores](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

#### Mercadolibre

*   [Usuarios y aplicaciones](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Descripción de usuarios](https://developers.mercadolibre.com.ar/es_ar/producto-consulta-usuarios)

#### Swagger con Serverless

*   [Autoswagger](https://www.npmjs.com/package/serverless-auto-swagger)
*   [Documentation serverless api](https://levelup.gitconnected.com/documenting-your-serverless-solutions-509f1928564b)

#### Open Apiv3 con Serverless

*   [serverless open api ](https://www.serverless.com/plugins/serverless-openapi-documentation)

#### Api Gateway

*   [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
*   [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)
*   [Configuración propiedades Api Gateway](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml)

#### Serverless frameworks

*   [Plugins](https://www.serverless.com/plugins)

#### Librerías/Plugins

*   [Validación de campos](https://www.npmjs.com/package/node-input-validator)
*   [serverless-offline-ssm](https://www.serverless.com/plugins/serverless-offline-ssm)
*   [serverless open api ](https://www.serverless.com/plugins/serverless-openapi-documentation)

<br>

</details>
