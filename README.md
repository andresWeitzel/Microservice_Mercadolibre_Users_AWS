<div align="right">
  
![Status](./doc/assets/icons/badges/status-completed.svg)

</div> 

![Index app](https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/MicroService_Users_ML.drawio.png)

<div align="right">
  <img width="25" height="25" src="./doc/assets/icons/devops/png/aws.png" />
  <img width="25" height="25" src="./doc/assets/icons/aws/png/lambda.png" />
    <img width="27" height="27" src="./doc/assets/icons/devops/png/postman.png" />
  <img width="29" height="27" src="./doc/assets/icons/devops/png/git.png" />
  <img width="28" height="27" src="./doc/assets/icons/aws/png/api-gateway.png" />
  <img width="27" height="25" src="./doc/assets/icons/aws/png/parameter-store.png" />
  <img width="27" height="27" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
  <img width="27" height="27" src="./doc/assets/icons/backend/javascript-typescript/png/sequelize.png" />
  <img width="25" height="27" src="./doc/assets/icons/aws/png/rds.png" />
  <img width="30" height="30" src="./doc/assets/icons/devops/png/vsc.png" />
   <img width="23" height="23" src="./doc/assets/icons/devops/png/docker.png" />

</div> 

<br>

<br>

<br>

<div align="right">
  <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/translation/README.es.md">
    <img width="65" height="40" src="./doc/assets/translation/arg-flag.jpg" />
  </a> 
  <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/README.md">
    <img width="65" height="40" src="./doc/assets/translation/eeuu-flag.jpg" />
  </a> 
</div>


<br>

<div align="center">

# Microservice Mercadolibre Users AWS 

</div>  

Microservice for user management exemplifying part of the ML development architecture, implemented with Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, NodeJs, Sequelize, Mysql, Docker, Docker-compose, Amazon RDS, Unit Test with Jest, among others. AWS services are tested locally. The project code and its documentation (less technical doc) have been developed in English.

*   [Api Doc ML Users](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Playlist functionality test](https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y" target="_blank"> <img src="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/social-networks/yt.png" width="3%" height="3%" /> </a>

<br>

## Index 📜

<details>
 <summary> View </summary>

 <br>

### Section 1) Description, configuration and technologies.

*   [1.0) Project Description.](#10-project-description-)
*   [1.1) Project Execution.](#11-project-execution-)
*   [1.2) Project Configuration from Scratch](#12-project-configuration-from-scratch-)
*   [1.3) Docker Setup and Database Migration](#13-docker-setup-and-database-migration-)
*   [1.4) Technologies.](#14-technologies-)

### Section 2) Endpoints and Examples

*   [2.0) EndPoints and resources.](#20-endpoints-and-resources-)
*   [2.1) Examples.](#21-examples-)

### Section 3) Functionality Test and References

*   [3.0) Functionality Test.](#30-functionality-test-)
*   [3.1) References.](#31-references-)

<br>

</details>

<br>

## Section 1) Description, configuration and technologies.

### 1.0) Project Description [🔝](#index-)

<details>
  <summary>See</summary>

 <br>

### 1.0.0) General description

*   The Microservice is designed under the MVC architecture. This architecture consists of and is divided into the model layer (definition of the user table), the service layer (the connection and transactions to the db with sequelize) and the controller layer (the implemented lambdas).
*   Each lambda performs the token authentication check, those that wait for a body type event check these fields and all the logic to be performed is abstracted from it to decouple functionalities together with low coupling.
*   Endpoints that allow the return of more than one object according to the applied search logic are handled with pagination if required. Default pagination is applied.

### 1.0.1) Description Architecture and Operation

*   The image of the AWS architecture used describes the operating flow of the microservice in a general way. Any request to the microservice starts from a client (Postman, server, etc.).
*   `Step 0`: This request is received by the api-gateway and will only be validated if the correct x-api-key is found within the headers of said request.
*   `Steps 1A, 1B, etc`: All these steps correspond to an endpoint with its specific resource. For ex. for getAllUsers (1A) it is http://localhost:4000/dev/users/list ....check those endpoints in [endpoints section](#section-2-endpoints-and-examples). Each lambda performs x-api-key and token checking.
*   `Steps 2`: The lambdas perform the validations of the corresponding ssm with the System Manager Paramater Store... they validate token, connection values with the db, etc.
*   `Steps 3`: The lambdas perform the necessary transactions and operations with the db (Mysql).
*   `Clarifications`: This operation is emulated within the same network and in a local environment with the corresponding serverless plugins.

<br>

</details>

### 1.1) Project Execution [🔝](#index-)

<details>
  <summary>See</summary>
<br>

*   Once a work environment has been created through some IDE, we clone the project

```git
git clone https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS
```

*   We position ourselves on the project

```git
cd 'projectName'
```

*   We install the LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
*   We install the Serverless Framework globally if we have not already done so

```git
npm install -g serverless
```

*   We verify the version of Serverless installed

```git
sls -v
```

*   We install all the necessary packages

```git
npm i
```

*   Make sure Docker are installed on your system (for Windows, use [Docker Desktop]([https://nodejs.org/en/download]\(https://www.docker.com/products/docker-desktop/\)))

*   Start and build the MySQL database container:

```bash
docker-compose up -d
```

*   Verify the container is running:

```bash
docker ps
```

*   If you need to reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

*   To view database logs:

```bash
docker-compose logs mysql
```

*   To access MySQL directly:

```bash
docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
```

*   The ssm and env variables used in the project are maintained to simplify the project configuration process. It is recommended to add the corresponding files (serverless\_ssm.yml and .env) to the .gitignore.

*   The start script configured in the project's package.json is responsible for launching

*   The serverless-offline plugin

*   The remark-lint plugin for .md files (only --output is applied for check and autoformat without terminating the process and being able to execute the serverless script)

*   We run the app from terminal.

```git
npm start
```

*   If a message appears indicating that port 4000 is already in use, we can terminate all dependent processes and run the app again

```git
npx kill-port 4000
npm start
```

<br>

</details>

### 1.2) Project Configuration from Scratch [🔝](#index-)

<details>
  <summary>Ver</summary>

 <br>

*   We create a work environment through some ide, after creating a folder we position ourselves on it

```git
cd 'projectName'
```

*   We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
*   We install the Serverless Framework globally if we have not already done so

```git
npm install -g serverless
```

*   We verify the version of Serverless installed

```git
sls -v
```

*   Make sure Docker are installed on your system (for Windows, use [Docker Desktop]([https://nodejs.org/en/download]\(https://www.docker.com/products/docker-desktop/\)))

*   Start and build the MySQL database container:

```bash
docker-compose up -d
```

*   Verify the container is running:

```bash
docker ps
```

*   If you need to reset the database:

```bash
docker-compose down -v
docker-compose up -d
```

*   To view database logs:

```bash
docker-compose logs mysql
```

*   To access MySQL directly:

```bash
docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
```

</details>

### 1.3) Docker Setup and Database Migration [🔝](#index-)

<details>
  <summary>See</summary>

<br>

#### Database Setup with Docker

The project uses Docker to manage the MySQL database. Here's how to set it up:

1.  Make sure you have Docker and Docker Compose installed on your system.

2.  The database configuration is defined in `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: mercadolibre_users_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: microdb_mercadolibre
      MYSQL_USER: mercadolibre_user
      MYSQL_PASSWORD: mercadolibre_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init:/docker-entrypoint-initdb.d
```

3.  Database initialization scripts are located in the `init` directory:
    *   `01_microdb_mercadolibre_DDL.sql`: Creates database and tables
    *   `02_microdb_mercadolibre_DML_INSERTS.sql`: Inserts initial data

#### Docker Commands

Here are the essential Docker commands for managing the database:

```bash
# Start the database container
docker-compose up -d

# Stop the container
docker-compose down

# Stop and remove volumes (to reset database)
docker-compose down -v

# View container logs
docker-compose logs mysql

# Access MySQL container
docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
```

#### Database Reset

If you need to reset the database to its initial state:

1.  Stop the container and remove volumes:

```bash
docker-compose down -v
```

2.  Recreate the container:

```bash
docker-compose up -d
```

This will:

*   Create a fresh database
*   Execute all DDL scripts to create tables
*   Insert initial data from DML scripts

#### Sample Data

The database comes pre-populated with sample data including:

*   Users and user details
*   Addresses and address details
*   Sellers information
*   Products and product details

Example of user data:

```sql
INSERT INTO users (id, nickname, first_name, last_name, email, identification_type, identification_number, country_id, creation_date, update_date) VALUES
(1, 'RAFA-CON', 'Rafael', 'Castro', 'rafael_castro88@gmail.com', 'DNI', '445938822', 'AR', NOW(), NOW()),
(2, 'JAVIER GONZALEZ', 'Javier', 'Gonzalez', 'javiBoquita@gmail.com', 'DNI', '2672268765', 'AR', NOW(), NOW());
```

Example of product data:

```sql
INSERT INTO products (id, site_id, title, subtitle, seller_id, category_id, official_store_id, price, base_price, original_price, initial_quantity, available_quantity, creation_date, update_date) VALUES
(1, 'MLA', 'iPhone 13 Pro Max 256GB', 'Nuevo, sellado, con garantía oficial de Apple', 1, 'MLA1055', NULL, 1200000.00, 1200000.00, 1200000.00, 10, 8, NOW(), NOW()),
(2, 'MLA', 'Samsung Galaxy S21 Ultra', 'Último modelo, libre de fábrica', 2, 'MLA1055', NULL, 950000.00, 950000.00, 950000.00, 15, 12, NOW(), NOW());
```

</details>

### 1.4) Technologies [🔝](#index-)

<details>
  <summary>See</summary>

 <br>

| **Technologies** | **Version** | **Purpose** |\
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Automatic Module Injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Services AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Management of Environment Variables |
| [Jest](https://jestjs.io/) | 29.7 | Framework para pruebas unitarias, integración, etc. |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | API Manager, Authentication, Control and Processing |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | js library |
| [Sequelize](https://sequelize.org/) | ^6.11.0 | ORM |
| [Mysql](https://www.mysql.com/) | 10.1 | SGDB |
| [XAMPP](https://www.apachefriends.org/es/index.html) | 3.2.2 | Server package |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | http client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Version control |
| Otros | Otros |

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
| Error Lens - for errors and indent |
| Tabnine - IA Code |
| Otros - Otros |

<br>

</details>

<br>

## Section 2) Endpoints and Examples.

### 2.0) Endpoints and resources [🔝](#index-)

<details>
  <summary>See</summary>

<br>

#### GET type operations:

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

*   `All endpoints are optional paginated except /test, /db-connection and /id/{user-id}}`

#### POST type operations:

*   http://localhost:4000/dev/v1/users/add-user/

#### PUT type operations:

*   http://localhost:4000/dev/v1/users/update-user/{user-id}

#### DELETE type operations:

*   http://localhost:4000/dev/v1/users/delete-user/{user-id}

#### Clarifications

*   {required-value}
*   Default pagination: ?page=0\&limit=5
*   Optional pagination: ?page={nro}\&limit={nro}

<br>

</details>

### 2.1) Examples [🔝](#index-)

<details>
  <summary>See</summary>
<br>

#### 2.1.0) Variables in Postman

| **Variable** | **Initial value** | **Current value** |
| ------------- | ------------- | ------------- |
| base\_url | http://localhost:4000/dev/ | http://localhost:4000/dev/ |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer\_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c |

<br>

#### 2.1.1) GET type operations

##### Database connection

###### Request (GET) | Code Snippet

```bash
curl --location 'http://localhost:4000/dev/v1/db-connection' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data ''
```

###### Response (200 OK)

```json
{
    "message": "Connection has been established successfully."
}
```

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
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
    "message": "Error in connection lambda. Caused by Error: throw a new error to check for the exception caught by lambda"
}
```

##### Get Paged Users

###### Request (GET) | Code Snippet

```bash
curl --location 'http://localhost:4000/dev/v1/users/list?page=0&limit=2' \
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

#### 2.1.2) POST type operations

##### Add a User

###### Request (POST) | Code Snippet

```bash
curl --location 'http://localhost:4000/dev/v1/users/add-user/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data-raw '{
            "nickname": "VALE18BNX",
            "first_name": "Valeria",
            "last_name": "Castro",
            "email": "vale_18_nnbs@gmail.com",
            "identification_type": "DNI",
            "identification_number": "3987261233",
            "country_id": "AR12"
        }'
```

###### Response (200 OK)

```json
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

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
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

#### 2.1.3) PUT type operations

##### Edit a User

###### Request (PUT) | Code Snippet

```bash
curl --location --request PUT 'http://localhost:4000/dev/v1/users/update-user/26' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--data-raw '{
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

###### Response (200 OK)

```json
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

###### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
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

#### 2.1.4) DELETE type operations

##### Delete a User

###### Request (DELETE) | Code Snippet

```bash
curl --location --request DELETE 'http://localhost:4000/dev/v1/users/delete-user/26' \
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

</details>

<br>

## Section 3) Functionality Testing and References.

### 3.0) Functionality Test [🔝](#index-)

<details>
  <summary>See</summary>

<br>

#### Types of operations | [See](https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y)

![Index app](https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/playlist.png)

<br>

</details>

### 3.1) References [🔝](#index-)

<details>
  <summary>See</summary>

 <br>

#### AWS Services and Tools

*   [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
*   [API Gateway Best Practices](https://docs.aws.amazon.com/apigateway/latest/developerguide/best-practices.html)
*   [Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
*   [Amazon RDS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
*   [AWS CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
*   [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

#### Serverless Framework

*   [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
*   [Serverless Framework Plugins](https://www.serverless.com/plugins)
*   [Serverless Offline Plugin](https://www.serverless.com/plugins/serverless-offline)
*   [Serverless SSM Plugin](https://www.serverless.com/plugins/serverless-offline-ssm)
*   [Serverless OpenAPI Documentation](https://www.serverless.com/plugins/serverless-openapi-documentation)
*   [Serverless Auto Swagger](https://www.npmjs.com/package/serverless-auto-swagger)

#### Database and ORM

*   [Sequelize Documentation](https://sequelize.org/docs/v6/)
*   [MySQL Documentation](https://dev.mysql.com/doc/)
*   [Docker MySQL Image](https://hub.docker.com/_/mysql)
*   [Docker Compose Documentation](https://docs.docker.com/compose/)
*   [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
*   [Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)

#### Testing and Development

*   [Jest Documentation](https://jestjs.io/docs/getting-started)
*   [Node.js Documentation](https://nodejs.org/en/docs/)
*   [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)
*   [VS Code Documentation](https://code.visualstudio.com/docs)
*   [Git Documentation](https://git-scm.com/doc)
*   [Docker Desktop Documentation](https://docs.docker.com/desktop/)

#### API Design and Best Practices

*   [REST API Best Practices](https://restfulapi.net/)
*   [API Security Best Practices](https://owasp.org/www-project-api-security/)
*   [OpenAPI Specification](https://swagger.io/specification/)
*   [API Documentation Best Practices](https://idratherbewriting.com/learnapidoc/)
*   [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

#### Mercadolibre API

*   [Mercadolibre API Documentation](https://developers.mercadolibre.com.ar/es_ar/api-docs)
*   [Mercadolibre Users API](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Mercadolibre Products API](https://developers.mercadolibre.com.ar/es_ar/productos)
*   [Mercadolibre Authentication](https://developers.mercadolibre.com.ar/es_ar/autenticacion-y-autorizacion)

#### Development Tools and Resources

*   [AWS Design Tool (draw.io)](https://app.diagrams.net/?splash=0\&libs=aws4)
*   [Postman Collection Examples](https://www.postman.com/collection/)
*   [VS Code Extensions for AWS](https://aws.amazon.com/visualstudiocode/)
*   [Docker Hub](https://hub.docker.com/)
*   [GitHub Actions](https://docs.github.com/en/actions)
*   [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

#### Community and Learning Resources

*   [AWS Community Builders](https://aws.amazon.com/developer/community/community-builders/)
*   [Serverless Framework Forum](https://forum.serverless.com/)
*   [Stack Overflow](https://stackoverflow.com/questions/tagged/aws-lambda)
*   [AWS YouTube Channel](https://www.youtube.com/user/AmazonWebServices)
*   [Serverless Framework YouTube](https://www.youtube.com/c/Serverless)
*   [Mercadolibre Developers Blog](https://developers.mercadolibre.com.ar/blog)

<br>

</details>
