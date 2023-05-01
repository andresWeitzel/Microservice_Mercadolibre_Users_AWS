![Index app](./doc/assets/MicroService_Users_ML.drawio.png)

# Microservice_Mercadolibre_Users_AWS
Microservicio para la gestión de usuarios replicando y modificando parte de la arquitectura de desarrollo de ML  implementada con Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, NodeJs, Sequelize, Mysql, entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.
* [Repositorio base de datos](https://github.com/andresWeitzel/Microdb_MercadoLibre_Mysql)
* [Api Doc ML Usuarios](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
* [Playlist prueba de funcionalidad](https://www.youtube.com/watch?v=oLSrmqMq0Zs&list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y)

<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1) Descripción, configuración y tecnologías.

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Ejemplos 
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
 - [2.1) Ejemplos.](#21-ejemplos-)
 
### Sección 3) Prueba de funcionalidad y Referencias
 
 - [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
 - [3.1) Referencias.](#31-referencias-)
	 

<br>

</details>



<br>

## Sección 1) Descripción, configuración y tecnologías. 


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>

 <br>

### 1.0.0) Descripción General

  * El Microservicio está diseñado bajo la arquitectura MVC. Dicha arquitectura consta y está dividida en la capa de modelo (definición de la tabla user), la capa de servicio (la conexión y transacciones hacia la db con sequelize) y la capa controller (las lambdas implementadas). 
  * Cada lambda realiza la comprobación de autenticación de token, las que esperan un evento de tipo body comprueban dichos campos y toda la lógica a realizar se abstrae de la misma para desacoplar funcionalidades junto con bajo acoplamiento.
  * Los endpoints que permiten la devolución de más de un objeto según lógica de búsqueda aplicada se manejan con paginados caso de ser requerido. Se aplica paginación por defecto. 
 
 ### 1.0.1) Descripción Arquitectura y Funcionamiento
 
 * La imagen de la arquitectura de aws empleada describe el flujo de funcionamiento del microservicio de forma general. Cualquier petición hacia el microservicio parte desde un cliente (Postman, servidor, etc). 
 * `Paso 0` : Dicha solicitud es recibida por el api-gateway y solamente se validará si es que dentro de los encabezados de dicha solicitud se encuentra la x-api-key correcta.
 * `Pasos 1A, 1B, etc` : Todos estos pasos corresponden a un endpoint con su recurso especifico. Por ej. para getAllUsers (1A) es http://localhost:4000/dev/users/list ....revisar dichos endpoints en [sección endpoints](#sección-2-endpoints-y-ejemplos). Cada lambda realiza comprobación de x-api-key y token.
 * `Pasos 2` : Las lambdas realizan las validaciones de las ssm correspondientes con el System Manager Paramater Store.. validan token, valores de conexión con la db etc.
 * `Pasos 3` : Las lambdas realizan las transacciones y operaciones necesarias con la db (Mysql).
 * `Aclaraciones` : Se emula dicho funcionamiento dentro de la misma red y en entorno local con los plugins de serverless correspondientes. 


<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>
 
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Instalamos todos los paquetes necesarios
```git
npm i
```
* Creamos un archivo para almacenar las variables ssm utilizadas en el proyecto (Más allá que sea un proyecto con fines no comerciales es una buena práctica utilizar variables de entorno).
  * Click der sobre la raíz del proyecto
  * New file
  * Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
  * Añadimos las ssm necesarias dentro del archivo.
  ```git
    # Keys
    X_API_KEY : 'f98d8cd98h73s204e3456998ecl9427j'

    BEARER_TOKEN : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    
    # Database
    DATABASE_NAME : 'microdb_mercadolibre'
    DATABASE_USER : 'root'
    DATABASE_PASSWORD : ''
    DATABASE_HOST : '127.0.0.1'
    DATABASE_DIALECT : 'mysql'
    DATABASE_POOL_MAX : 5
    DATABASE_POOL_MIN : 0
    DATABASE_POOL_ACQUIRE : 30000
    DATABASE_POOL_IDLE : 10000

  ```    
* Ejecutamos el proyecto
```git
sls offline start
```
 
 
<br>

</details>
 <br>

### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>
 
  
* Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Inicializamos un template de serverles
```git
serverless create --template aws-nodejs
```
* Inicializamos un proyecto npm
```git
npm init -y
```
* Instalamos serverless offline 
```git
npm i serverless-offline --save-dev
```
* Instalamos serverless ssm 
```git
npm i serverless-offline-ssm --save-dev
```
* Ejecutamos el proyecto
```git
sls offline start
```



<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>


 <br>
 

| **Tecnologías** | **Versión** | **Finalidad** |               
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

| **Extensión** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml |

<br>

</details>


<br>

## Sección 2) Endpoints y Ejemplos. 


### 2.0) Endpoints y recursos [🔝](#índice-) 

<details>
  <summary>Ver</summary>

### Operaciones de tipo GET:
* http://localhost:4000/dev/test
* http://localhost:4000/dev/db-connection
* http://localhost:4000/dev/users/list
* http://localhost:4000/dev/users/id/{user-id}
* http://localhost:4000/dev/users/country-id/{country-id}
* http://localhost:4000/dev/users/email/{email}
* http://localhost:4000/dev/users/first-name/{first-name}
* http://localhost:4000/dev/users/identification-number/{ident-number}
* http://localhost:4000/dev/users/identification-type/{ident-type}
* http://localhost:4000/dev/users/last-name/{last-name}
* http://localhost:4000/dev/users/nickname/{nickname}
* http://localhost:4000/dev/users/creation-date/{creation-date}
* http://localhost:4000/dev/users/update-date/{update-date}
* `Todos los endpoints son paginados opcionales menos el /test, /db-connection y /id/{user-id}`

### Operaciones de tipo POST:
* http://localhost:4000/dev/users/add-user/

### Operaciones de tipo PUT:
* http://localhost:4000/dev/users/update-user/{user-id}

### Operaciones de tipo DELETE:
* http://localhost:4000/dev/users/delete-user/{user-id}

### Aclaraciones
* {valor-requerido}
* Paginado por defecto : ?page=0&limit=5
* Paginado opcional : ?page={nro}&limit={nro}


<br>

</details>




### 2.1) Ejemplos [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>

### 2.1.0) Variables en Postman

| **Variable** | **Initial value** | **Current value** |               
| ------------- | ------------- | ------------- |
| base_url | http://localhost:4000  | http://localhost:4000 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>

### 2.1.1) Operaciones de tipo GET

### Conexión base de datos

#### Request
``` postman
- Método : GET

- Url : {{base_url}}/dev/db-connection

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body : null
```

#### Response
``` postman
{
    "message": "Connection has been established successfully."
}
```

<br>

### Obtener Usuarios paginados

#### Request
``` postman
- Método : GET

- Url : {{base_url}}/dev/users/list?page=0&limit=2

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body : null
```

#### Response
``` postman
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

<br>

### Obtener un Usuario según su id

#### Request
``` postman
- Método : GET

- Url : {{base_url}}/dev/users/id/4

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body : null
```

#### Response
``` postman
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
<br>


### Obtener listado paginado de Usuarios según su country-id

#### Request
``` postman
- Método : GET

- Url : {{base_url}}/dev/users/id/4

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body : null
```

#### Response
``` postman
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
<br>
* ETC.


### 2.1.2) Operaciones de tipo POST

### Agregar un Usuario

#### Request
``` postman
- Método : POST

- Url : {{base_url}}/dev/users/add-user/

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body : 

   {
            "nickname": "MARTIN-SUAREZ",
            "first_name": "Martin",
            "last_name": "Suarez",
            "email": "martin_electro_todo@gmail.com",
            "identification_type": "DNI",
            "identification_number": "4459388222",
            "country_id": "AR12"
        }
```

#### Response
``` postman
{
    "message": {
        "id": null,
        "nickname": "MARTIN-SUAREZ",
        "first_name": "Martin",
        "last_name": "Suarez",
        "email": "martin_electro_todo@gmail.com",
        "identification_type": "DNI",
        "identification_number": "4459388222",
        "country_id": "AR12",
        "creation_date": "2023-04-07T14:31:45.000Z",
        "update_date": "2023-04-07T14:31:45.000Z"
    }
}
```

<br>

### 2.1.3) Operaciones de tipo PUT

### Editar un Usuario

#### Request
``` postman
- Método : PUT

- Url : {{base_url}}/dev/users/update-user/{user-id}

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body (optionals fields) : 
   {
            "nickname": "MARTIN-SUAREZ-EDITED",
            "first_name": "Martin EDITED",
            "last_name": "Suarez EDITED",
            "email": "martin_electro_todo_EDITED@gmail.com",
            "identification_type": "DNI",
            "identification_number": "4459388222",
            "country_id": "AR12"
        }
```

#### Response
``` postman
{
    "message": {
        "id": 18,
        "nickname": "MARTIN-SUAREZ-EDITED",
        "first_name": "Martin EDITED",
        "last_name": "Suarez EDITED",
        "email": "martin_electro_todo_EDITED@gmail.com",
        "identification_type": "DNI",
        "identification_number": "4459388222",
        "country_id": "AR12",
        "creation_date": "2023-04-07 17:31:45",
        "update_date": "2023-04-07 14:34:44"
    }
}
```

<br>

### 2.1.4) Operaciones de tipo DELETE

### Eliminar un Usuario

#### Request
``` postman
- Método : DELETE

- Url : {{base_url}}/dev/users/delete-user/{user-id}

- Headers: 
  - Content-Type : application/json
  - Authorization : {{bearer_token}}
  - x-api-key : {{x-api-key}}

- Body  : null
```

#### Response
``` postman
{
    "message": "User has been deleted successfully."
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
 * [Cómo usar Sequelize con Node.js y MySQL](https://jasonwatmore.com/post/2022/06/26/nodejs-mysql-connect-to-mysql-database-with-sequelize-mysql2)
 * [Videotutorial Recomendado](https://www.youtube.com/watch?v=im7THL67z0c)

#### Herramientas 
 * [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0&libs=aws4)

#### Sequelize
 * [Modelos y Operadores](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

#### Api Gateway
 * [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
 * [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)
 * [Configuración propiedades Api Gateway](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml)

 #### Librerías
 * [Validación de campos](https://www.npmjs.com/package/node-input-validator)

<br>

</details>
