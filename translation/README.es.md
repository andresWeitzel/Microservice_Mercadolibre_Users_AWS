![Index app](https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/MicroService_Users_ML.drawio.png)

<div align="right">
  <img width="25" height="25" src="../doc/assets/icons/devops/png/aws.png" />
  <img width="25" height="25" src="../doc/assets/icons/aws/png/lambda.png" />
  <img width="27" height="27" src="../doc/assets/icons/devops/png/postman.png" />
  <img width="29" height="27" src="../doc/assets/icons/devops/png/git.png" />
  <img width="28" height="27" src="../doc/assets/icons/aws/png/api-gateway.png" />
  <img width="27" height="25" src="../doc/assets/icons/aws/png/parameter-store.png" />
  <img width="27" height="27" src="../doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
  <img width="27" height="27" src="../doc/assets/icons/backend/javascript-typescript/png/sequelize.png" />
  <img width="25" height="27" src="../doc/assets/icons/aws/png/rds.png" />
  <img width="30" height="30" src="../doc/assets/icons/devops/png/vsc.png" />
  <img width="23" height="23" src="../doc/assets/icons/devops/png/docker.png" />
</div> 

<br>

<br>

<br>

<div align="right">
  <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/translation/README.es.md">
    <img width="65" height="40" src="../doc/assets/translation/arg-flag.jpg" />
  </a> 
  <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/README.md">
    <img width="65" height="40" src="../doc/assets/translation/eeuu-flag.jpg" />
  </a> 
</div>

<br>

<div align="center">

# Microservice Mercadolibre Users AWS ![Status](../doc/assets/icons/badges/status-completed.svg)

</div>  

Microservicio para la gestión de usuarios ejemplificando parte de la arquitectura de desarrollo de ML, implementada con Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, NodeJs, Sequelize, Mysql, Docker, Docker-compose, Unit Test con Jest, entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

*   [Api Doc ML Usuarios](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Playlist prueba de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y" target="_blank"> <img src="../doc/assets/social-networks/yt.png" width="25" /> </a>

<br>

## Índice 📜

<details>
 <summary> Ver </summary>

 <br>

### Sección 1) Descripción, configuración y tecnologías.

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Docker Setup y Migración de Base de Datos](#12-docker-setup-y-migración-de-base-de-datos-)
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

*   `Importante` : Asegúrate de tener Docker instalado en tu sistema (para Windows, usa [Docker Desktop](https://www.docker.com/products/docker-desktop/))

*   Inicia y construye el contenedor de MySQL:

```bash
docker-compose up -d
```

*   Verifica que el contenedor esté corriendo (Opcional) :

```bash
docker ps
```

*   Si necesitas resetear la base de datos (Opcional) :

```bash
docker-compose down -v
docker-compose up -d
```

*   Para ver los logs de la base de datos (Opcional) :

```bash
docker-compose logs mysql
```

*   Para acceder directamente a MySQL (Opcional) :

```bash
docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
```

*   Las variables ssm utilizadas en el proyecto se mantienen para simplificar el proceso de configuración del mismo. Es recomendado agregar el archivo correspondiente (serverless\_ssm.yml) al .gitignore.

*   El script start configurado en el package.json del proyecto, es el encargado de levantar
    *   El plugin de serverless-offline
    *   El plugin remark-lint para archivos .md (se aplica solo el --output para check and autoformat sin terminar el proceso y poder ejecutar el script de serverless)

*   Ejecutamos la app desde terminal.

```git
npm start
```

*   Si se presenta algún mensaje indicando qué el puerto 4000 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app (Opcional) :

```git
npx kill-port 4000
npm start
```

<br>

</details>


### 1.2) Docker Setup y Migración de Base de Datos [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

#### 1.2.1) Configuración de Base de Datos con Docker

1.  **Configuración de Docker Compose**
    La siguiente configuración establece un contenedor MySQL 8.0 con almacenamiento persistente e inicialización automática:
    ```yaml
    version: '3.8'
    services:
      mysql:
        image: mysql:8.0
        container_name: mercadolibre_users_mysql
        environment:
          MYSQL_ROOT_PASSWORD: root          # Contraseña root para MySQL
          MYSQL_DATABASE: microdb_mercadolibre  # Nombre de la base de datos
          MYSQL_USER: mercadolibre_user      # Usuario de la aplicación
          MYSQL_PASSWORD: mercadolibre_pass  # Contraseña del usuario de la aplicación
        ports:
          - "3306:3306"                      # Mapea el puerto del contenedor al puerto del host
        volumes:
          - mysql_data:/var/lib/mysql        # Almacenamiento persistente de datos
          - ./init:/docker-entrypoint-initdb.d  # Scripts de inicialización
        command: --default-authentication-plugin=mysql_native_password  # Método de autenticación
        healthcheck:
          test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]  # Comando de verificación de salud
          interval: 10s                      # Verificar cada 10 segundos
          timeout: 5s                        # Tiempo de espera después de 5 segundos
          retries: 5                         # Reintentar 5 veces antes de marcar como no saludable

    volumes:
      mysql_data:                            # Volumen nombrado para persistencia de datos
    ```

2.  **Comandos Docker Esenciales**
    Estos comandos son esenciales para gestionar tu entorno Docker:
    ```bash
    # Iniciar contenedor en modo detached (ejecuta en segundo plano)
    docker-compose up -d

    # Verificar estado y salud del contenedor
    docker ps

    # Resetear base de datos (elimina todos los datos y recrea el contenedor)
    docker-compose down -v
    docker-compose up -d

    # Ver logs de la base de datos para solución de problemas
    docker-compose logs mysql

    # Acceder a la interfaz de línea de comandos de MySQL
    docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
    ```

3.  **Datos de Ejemplo**
    Aquí hay algunos ejemplos de consultas para poblar tu base de datos:
    ```sql
    -- Inserción de usuario de ejemplo con todos los campos requeridos
    INSERT INTO users (
        nickname, 
        first_name, 
        last_name, 
        email, 
        identification_type, 
        identification_number, 
        country_id
    ) VALUES (
        'USER123',
        'Juan',
        'Pérez',
        'juan@example.com',
        'DNI',
        '12345678',
        'AR'
    );

    -- Inserción de producto de ejemplo
    INSERT INTO products (
        title, 
        price, 
        currency_id, 
        available_quantity, 
        condition
    ) VALUES (
        'iPhone 12',
        999.99,
        'USD',
        10,
        'new'
    );
    ```

#### 1.2.2) Proceso de Migración

1.  **Inicialización de la Base de Datos**
    El proceso de configuración de la base de datos sigue estos pasos:
    *   Cuando el contenedor inicia, automáticamente crea la base de datos especificada en MYSQL_DATABASE
    *   Los scripts de inicialización en el directorio `./init` se ejecutan en orden alfabético
    *   Los datos persisten entre reinicios del contenedor gracias al volumen Docker `mysql_data`
    *   El primer script (01_*) típicamente contiene las definiciones de tablas
    *   El segundo script (02_*) típicamente contiene los datos iniciales

2.  **Estructura de Archivos**
    El proceso de inicialización utiliza esta estructura de archivos:
    ```
    init/
    ├── 01_microdb_mercadolibre_DDL.sql     # Esquema de base de datos y definiciones de tablas
    └── 02_microdb_mercadolibre_DML_INSERTS.sql  # Datos iniciales y registros semilla
    ```

3.  **Consideraciones**
    Puntos importantes a recordar:
    *   El volumen `mysql_data` asegura que tus datos persistan incluso si el contenedor es eliminado
    *   Para resetear completamente la base de datos, necesitas eliminar el volumen usando `docker-compose down -v`
    *   Las credenciales de la base de datos están definidas en el archivo `docker-compose.yml`
    *   El contenedor usa MySQL 8.0 con autenticación de contraseña nativa
    *   La base de datos es accesible en el puerto 3306 de tu máquina host

#### 1.2.3) Comandos Docker Adicionales y Ejemplos

1.  **Gestión de Contenedores**
    Comandos avanzados de gestión de contenedores:
    ```bash
    # Detener todos los contenedores de forma segura
    docker-compose down

    # Eliminar todos los contenedores, redes y volúmenes
    docker-compose down -v

    # Reconstruir contenedores con los últimos cambios
    docker-compose build

    # Ver logs del contenedor en tiempo real (modo seguimiento)
    docker-compose logs -f mysql

    # Ejecutar shell interactivo en el contenedor
    docker exec -it mercadolibre_users_mysql bash
    ```

2.  **Respaldo y Restauración de Base de Datos**
    Comandos para mantenimiento de la base de datos:
    ```bash
    # Crear un respaldo completo de la base de datos
    docker exec mercadolibre_users_mysql mysqldump -u mercadolibre_user -p microdb_mercadolibre > backup.sql

    # Restaurar base de datos desde respaldo
    docker exec -i mercadolibre_users_mysql mysql -u mercadolibre_user -p microdb_mercadolibre < backup.sql
    ```

3.  **Solución de Problemas**
    Comandos comunes para solución de problemas:
    ```bash
    # Verificar estado y detalles del contenedor
    docker ps -a

    # Inspeccionar configuración del contenedor
    docker inspect mercadolibre_users_mysql

    # Ver logs del contenedor
    docker logs mercadolibre_users_mysql

    # Monitorear uso de recursos del contenedor
    docker stats mercadolibre_users_mysql
    ```

4.  **Consultas SQL Adicionales**
    Consultas SQL útiles para operaciones comunes:
    ```sql
    -- Crear nuevo usuario con todos los campos
    INSERT INTO users (
        nickname, 
        first_name, 
        last_name, 
        email, 
        identification_type, 
        identification_number, 
        country_id
    ) VALUES (
        'MARIA123',
        'Maria',
        'Garcia',
        'maria.garcia@example.com',
        'PASAPORTE',
        'AB123456',
        'ES'
    );

    -- Actualizar información de usuario
    UPDATE users 
    SET email = 'nuevo.email@example.com',
        update_date = CURRENT_TIMESTAMP
    WHERE id = 1;

    -- Eliminar usuario
    DELETE FROM users 
    WHERE id = 1;

    -- Buscar usuarios por país con paginación
    SELECT * FROM users 
    WHERE country_id = 'AR' 
    ORDER BY creation_date DESC
    LIMIT 10 OFFSET 0;

    -- Contar usuarios por país
    SELECT country_id, COUNT(*) as cantidad_usuarios 
    FROM users 
    GROUP BY country_id;
    ```

5.  **Problemas Comunes y Soluciones**
    Soluciones para problemas frecuentes:
    *   **Conflicto de Puerto**: Si el puerto 3306 ya está en uso
        ```bash
        # Encontrar proceso usando el puerto
        netstat -ano | findstr :3306
        # Terminar proceso
        taskkill /PID <id_proceso> /F
        ```
    
    *   **Contenedor No Inicia**: Verificar logs para errores
        ```bash
        # Ver logs detallados
        docker-compose logs mysql
        # Verificar estado del contenedor
        docker ps -a
        ```

    *   **Problemas de Conexión a Base de Datos**: Verificar credenciales y red
        ```bash
        # Probar conexión
        docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
        # Verificar red
        docker network ls
        docker network inspect <nombre_red>
        ```

6.  **Optimización de Rendimiento**
    Consejos para optimizar el rendimiento de la base de datos:
    *   Ajustar configuración de MySQL en `my.cnf`:
        ```ini
        [mysqld]
        innodb_buffer_pool_size = 256M    # Tamaño del buffer pool para InnoDB
        max_connections = 100             # Máximo de conexiones concurrentes
        query_cache_size = 32M           # Tamaño de caché de consultas
        ```
    
    *   Monitorear rendimiento:
        ```sql
        -- Verificar consultas lentas
        SHOW VARIABLES LIKE '%slow%';
        
        -- Verificar estado de conexiones
        SHOW STATUS LIKE '%onn%';
        
        -- Verificar estado de tablas
        SHOW TABLE STATUS;
        
        -- Verificar lista de procesos
        SHOW PROCESSLIST;
        ```

<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

| **Tecnologías** | **Versión** | **Finalidad** |
|----------------|-------------|---------------|
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Jest](https://jestjs.io/) | 29.7 | Framework para pruebas unitarias, integración, etc. |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [Sequelize](https://sequelize.org/) | ^6.11.0 | ORM |
| [Mysql](https://www.mysql.com/) | 10.1 | SGDB |
| [XAMPP](https://www.apachefriends.org/es/index.html) | 3.2.2 | Paquete de servidores |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |
| Otros | Otros | Otros |

</br>

| **Plugin** |
|------------|
| [Serverless Plugin](https://www.serverless.com/plugins/) |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |

</br>

| **Extensión** |
|---------------|
| Prettier - Code formatter |
| YAML - Autoformatter .yml |
| Error Lens - Identificador de errores |
| Tabnine - IA Code |
| Otros - Otros |

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

#### 2.1.0) Variables en Postman

| **Variable** | **Valor Inicial** | **Valor Actual** |
|-------------|------------------|------------------|
| base_url | http://localhost:4000/dev/ | http://localhost:4000/dev/ |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>

#### 2.1.1) Operaciones de tipo GET

##### Obtener Lista de Usuarios

###### Request (GET)

```bash
curl --location 'http://localhost:4000/dev/v1/users/list?page=0&limit=2&orderBy=id&orderAt=asc' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

###### Response (200 OK)

```json
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

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, could not get the paginated list of users."
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

<br>

##### Obtener Lista de Usuarios sin Fechas

###### Request (GET)

```bash
curl --location 'http://localhost:4000/dev/v1/users/list-without-dates?page=0&limit=2&orderBy=id&orderAt=asc' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

###### Response (200 OK)

```json
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
            "country_id": "AR"
        },
        {
            "id": 4,
            "nickname": "GABRIELA JIMENEZ",
            "first_name": "Gabriela",
            "last_name": "Jimenez",
            "email": "gabriela.consultas@hotmail.com",
            "identification_type": "DNI",
            "identification_number": "410871223",
            "country_id": "AR"
        }
    ]
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, could not get the paginated list of users."
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

<br>

##### Obtener Usuario por ID

###### Request (GET)

```bash
curl --location 'http://localhost:4000/dev/v1/users/id/4' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j'
```

###### Response (200 OK)

```json
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

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, could not fetch user based on id."
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, the id passed as a parameter is not valid."
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

<br>

##### Obtener Usuarios por País

###### Request (GET)

```bash
curl --location 'http://localhost:4000/dev/v1/users/country-id/AR?page=0&limit=3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

###### Response (200 OK)

```json
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

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, could not get paginated list of users according to country id. Try again."
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, the country id passed as a parameter is not valid."
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
}
```

<br>

#### 2.1.2) Operaciones de tipo POST

##### Agregar un Usuario

###### Request (POST)

```bash
curl --location 'http://localhost:4000/dev/v1/users/add-user/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data-raw '{
    "nickname": "MARTIN-SUAREZ",
    "first_name": "Martin",
    "last_name": "Suarez",
    "email": "martin_electro_todo@gmail.com",
            "identification_type": "DNI",
    "identification_number": "4459388222",
            "country_id": "AR12"
        }'
```

###### Response (200 OK)

```json
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
        "creation_date": "2023-06-28T16:46:31.000Z",
        "update_date": "2023-06-28T16:46:31.000Z"
    }
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check request attributes. Missing or incorrect. CHECK: nickname, first_name and last_name (required|string|minLength:4|maxLength:50), email (required|string|minLength:10|maxLength:100), identification_type and identification_number (required|string|minLength:6|maxLength:20), country_id (required|string|minLength:2|maxLength:5)"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

<br>

#### 2.1.3) Operaciones de tipo PUT

##### Editar un Usuario

###### Request (PUT)

```bash
curl --location --request PUT 'http://localhost:4000/dev/v1/users/update-user/32' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data-raw '{
    "nickname": "MARTIN-SUAREZ2221",
    "first_name": "Martin2221",
    "last_name": "Suarez2221",
    "email": "martin_electro_todo@gmail.com",
            "identification_type": "DNI",
    "identification_number": "445938812313222",
            "country_id": "AR12",
    "creation_date": "2023-10-11 21:18:29",
    "update_date": "2023-10-11 21:18:29"
        }'
```

###### Response (200 OK)

```json
{
    "message": {
        "id": 32,
        "nickname": "MARTIN-SUAREZ2221",
        "first_name": "Martin2221",
        "last_name": "Suarez2221",
        "email": "martin_electro_todo@gmail.com",
        "identification_type": "DNI",
        "identification_number": "445938812313222",
        "country_id": "AR12",
        "creation_date": "2023-10-11 21:18:29",
        "update_date": "2023-10-11 21:18:29"
    }
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check request attributes and object to update"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, could not add user.CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
}
```

<br>

#### 2.1.4) Operaciones de tipo DELETE

##### Eliminar un Usuario

###### Request (DELETE)

```bash
curl --location --request DELETE 'http://localhost:4000/dev/v1/users/delete-user/18' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

###### Response (200 OK)

```json
{
    "message": "User has been deleted successfully."
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, a non-existent user cannot be deleted. Operation not allowed"
}
```

###### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

###### Response (500 Internal Server Error)

```json
{
    "message": "ECONNREFUSED. An error has occurred with the connection or query to the database. CHECK: The first_name next together the last_name should be uniques. The identification_type next together the identification_number should be uniques."
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

![Index app](../doc/assets/playlist.png)

<br>

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

#### Servicios y Herramientas AWS

*   [Documentación de AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
*   [Mejores Prácticas de API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/best-practices.html)
*   [Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
*   [Documentación de Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
*   [AWS CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
*   [Mejores Prácticas de AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

#### Framework Serverless

*   [Documentación del Framework Serverless](https://www.serverless.com/framework/docs)
*   [Plugins del Framework Serverless](https://www.serverless.com/plugins)
*   [Plugin Serverless Offline](https://www.serverless.com/plugins/serverless-offline)
*   [Plugin Serverless SSM](https://www.serverless.com/plugins/serverless-offline-ssm)
*   [Documentación OpenAPI con Serverless](https://www.serverless.com/plugins/serverless-openapi-documentation)
*   [Auto Swagger con Serverless](https://www.npmjs.com/package/serverless-auto-swagger)

#### Base de Datos y ORM

*   [Documentación de Sequelize](https://sequelize.org/docs/v6/)
*   [Documentación de MySQL](https://dev.mysql.com/doc/)
*   [Imagen Docker de MySQL](https://hub.docker.com/_/mysql)
*   [Documentación de Docker Compose](https://docs.docker.com/compose/)
*   [Migraciones con Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)
*   [Asociaciones con Sequelize](https://sequelize.org/docs/v6/core-concepts/assocs/)

#### Testing y Desarrollo

*   [Documentación de Jest](https://jestjs.io/docs/getting-started)
*   [Documentación de Node.js](https://nodejs.org/en/docs/)
*   [Documentación de Postman](https://learning.postman.com/docs/getting-started/introduction/)
*   [Documentación de VS Code](https://code.visualstudio.com/docs)
*   [Documentación de Git](https://git-scm.com/doc)
*   [Documentación de Docker Desktop](https://docs.docker.com/desktop/)

#### Diseño de API y Mejores Prácticas

*   [Mejores Prácticas REST API](https://restfulapi.net/)
*   [Mejores Prácticas de Seguridad API](https://owasp.org/www-project-api-security/)
*   [Especificación OpenAPI](https://swagger.io/specification/)
*   [Mejores Prácticas de Documentación API](https://idratherbewriting.com/learnapidoc/)
*   [Códigos de Estado HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

#### API de Mercadolibre

*   [Documentación de la API de Mercadolibre](https://developers.mercadolibre.com.ar/es_ar/api-docs)
*   [API de Usuarios de Mercadolibre](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [API de Productos de Mercadolibre](https://developers.mercadolibre.com.ar/es_ar/productos)
*   [Autenticación de Mercadolibre](https://developers.mercadolibre.com.ar/es_ar/autenticacion-y-autorizacion)

#### Herramientas y Recursos de Desarrollo

*   [Herramienta de Diseño AWS (draw.io)](https://app.diagrams.net/?splash=0\&libs=aws4)
*   [Ejemplos de Colecciones Postman](https://www.postman.com/collection/)
*   [Extensiones VS Code para AWS](https://aws.amazon.com/visualstudiocode/)
*   [Docker Hub](https://hub.docker.com/)
*   [GitHub Actions](https://docs.github.com/en/actions)
*   [Mejores Prácticas de Node.js](https://github.com/goldbergyoni/nodebestpractices)

#### Comunidad y Recursos de Aprendizaje

*   [AWS Community Builders](https://aws.amazon.com/developer/community/community-builders/)
*   [Foro del Framework Serverless](https://forum.serverless.com/)
*   [Stack Overflow](https://stackoverflow.com/questions/tagged/aws-lambda)
*   [Canal de YouTube de AWS](https://www.youtube.com/user/AmazonWebServices)
*   [YouTube del Framework Serverless](https://www.youtube.com/c/Serverless)
*   [Blog de Desarrolladores de Mercadolibre](https://developers.mercadolibre.com.ar/blog)

<br>

</details>
