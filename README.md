
![Index app](https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/MicroService_Users_ML.drawio.png)

<p align="right">
    <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/translation/README.es.md" target="_blank">
      <img src="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
  </a> 
   <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/README.md" target="_blank">
      <img src="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
  </a> 
       <a href="https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/README.md" target="_blank">
      <img src="https://github.com/andresWeitzel/Graphics/blob/master/GithubReadme/redes/youtubeLogo.gif" width="10%" height="10%" />
  </a> 
</p>

<div align="center">
  
# Microservice Mercadolibre Users AWS

</div>  

Microservice for user management exemplifying part of the ML development architecture, implemented with Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, NodeJs, Sequelize, Mysql, Amazon RDS, among others. AWS services are tested locally. The project code and its documentation (less technical doc) have been developed in English.

*   [Database repository](https://github.com/andresWeitzel/Microdb_MercadoLibre_Mysql)
*   [Api Doc ML Users](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Playlist functionality test](https://www.youtube.com/watch?v=oLSrmqMq0Zs\&list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y)

<br>

## Index 📜

<details>
 <summary> See </summary>

 <br>

### Sección 1) Description, configuration and technologies.

*   [1.0) Project description.](#10-description-)
*   [1.1) Project execution.](#11-project-execution-)
*   [1.2) Project setup from scratch](#12-project-setup-from-scratch-)
*   [1.3) Technologies.](#13-technologies-)

### Sección 2) Endpoints and Examples

*   [2.0) Endpoints and resources.](#20-endpoints-and-resources-)
*   [2.1) Examples.](#21-examples-)

### Sección 3) Functionality test and references

*   [3.0) Functionality test.](#30-functionality-test-and-references-)
*   [3.1) References.](#31-references-)

<br>

</details>

<br>

## Sección 1) Description, configuration and technologies.

### 1.0) Description [🔝](#index-)

<details>
  <summary>See</summary>

 <br>

### 1.0.0) General description

* The Microservice is designed under the MVC architecture. This architecture consists of and is divided into the model layer (definition of the user table), the service layer (the connection and transactions to the db with sequelize) and the controller layer (the implemented lambdas).
* Each lambda performs the token authentication check, those that wait for a body type event check these fields and all the logic to be performed is abstracted from it to decouple functionalities together with low coupling.
* Endpoints that allow the return of more than one object according to the applied search logic are handled with pagination if required. Default pagination is applied.

### 1.0.1) Description Architecture and Operation

* The image of the AWS architecture used describes the operating flow of the microservice in a general way. Any request to the microservice starts from a client (Postman, server, etc.).
* `Step 0`: This request is received by the api-gateway and will only be validated if the correct x-api-key is found within the headers of said request.
* `Steps 1A, 1B, etc`: All these steps correspond to an endpoint with its specific resource. For ex. for getAllUsers (1A) it is http://localhost:4000/dev/users/list ....check those endpoints in [endpoints section](#section-2-endpoints-and-examples). Each lambda performs x-api-key and token checking.
* `Steps 2`: The lambdas perform the validations of the corresponding ssm with the System Manager Paramater Store... they validate token, connection values with the db, etc.
* `Steps 3`: The lambdas perform the necessary transactions and operations with the db (Mysql).
* `Clarifications`: This operation is emulated within the same network and in a local environment with the corresponding serverless plugins.

<br>

</details>

### 1.1) Project execution [🔝](#index-)

<details>
  <summary>See</summary>
<br>

* Once a work environment has been created through some IDE, we clone the project

```git
git clone https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS
```

* We position ourselves on the project

```git
cd 'projectName'
```

* We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
* We install the Serverless Framework globally if we have not already done so

```git
npm install -g serverless
```

* We verify the version of Serverless installed

```git
sls -v
```

* We install all the necessary packages

```git
npm i
```

* The ssm variables used in the project are maintained to simplify the project configuration process. It is recommended to add the corresponding file (serverless\_ssm.yml) to the .gitignore.
* The start script configured in the project's package.json is responsible for launching
     * The serverless-offline plugin
     * The remark-lint plugin for .md files (only --output is applied for check and autoformat without terminating the process and being able to execute the serverless script)

```json
   "scripts": {
     "check": "remark . --quiet --frail",
     "format": "remark . --quiet --frail --output",
     "format-md": "remark . --output",
     "serverless-offline": "sls offline start",
     "start": "npm run format-md && npm run serverless-offline"
   },
```

* We run the app from terminal.

```git
npm start
```

* If a message appears indicating that port 4000 is already in use, we can terminate all dependent processes and run the app again

```git
npx kill-port 4000
npm start
```

<br>

</details>
 <br>

### 1.2) Project setup from scratch [🔝](#index-)

<details>
  <summary>Ver</summary>

 <br>

* We create a work environment through some ide, after creating a folder we position ourselves on it

```git
cd 'projectName'
```

* We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
* We install the Serverless Framework globally if we have not already done so

```git
npm install -g serverless
```

* We verify the version of Serverless installed

```git
sls -v
```

* We initialize a serverles template

```git
serverless create --template aws-nodejs
```

* We initialize an npm project

```git
npm init -y
```

* We install serverless offline

```git
npm i serverless-offline --save-dev
```

* We install serverless ssm

```git
npm i serverless-offline-ssm --save-dev
```

```yml
plugins:
   - serverless-offline-ssm
   - serverless-offline

```

* We will configure a standard markdown file format for the project via [remark-lint](https://github.com/remarkjs/remark-lint#example-check-markdown-on-the-api)

```git
npm install remark-cli remark-preset-lint-consistent remark-preset-lint-recommended remark-lint-list-item-indent --save-dev

npm install remark-lint-emphasis-marker remark-lint-strong-marker --save-dev

npm install remark-lint-table-cell-padding --save-dev
```

* Then we add the configuration for the scripts from the package.json

```json
   "scripts": {
     "check": "remark . --quiet --frail",
     "format": "remark . --quiet --frail --output",
   },
```

* In my case, I want an autoformat to be applied for each execution, we execute the scripts together (only the --output is applied for check and autoformat without terminating the process and being able to execute the serverless script)

```json
   "scripts": {
     "check": "remark . --quiet --frail",
     "format": "remark . --quiet --frail --output",
     "format-md": "remark . --output",
     "serverless-offline": "sls offline start",
     "start": "npm run format-md && npm run serverless-offline"
   },
```

* Then we add the remark configs, at the end, in the package.json

```json
  "remarkConfig": {
     "settings": {
       "emphasis": "*",
       "strong": "*"
     },
     "plugins": [
        "remark-preset-lint-consistent",
       "remark-preset-lint-recommended",
       "remark-lint",
       "remark-lint-table-cell-padding",
       [
         "remark-lint-list-item-indent",
         "tab size"
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

* For more information about it, visit the [official page](https://github.com/remarkjs/remark-lint#example-check-markdown-on-the-api)

* The ssm variables used in the project are maintained to simplify the project configuration process. It is recommended to add the corresponding file (serverless\_ssm.yml) to the .gitignore.

* The following script (start), configured in the project's package.json, is responsible for executing
     * The serverless-offline plugin
     * The remark-lint plugin for .md files

```json
   "scripts": {
     "check": "remark . --quiet --frail",
     "format": "remark . --quiet --frail --output",
     "format-md": "remark . --output",
     "serverless-offline": "sls offline start",
     "start": "npm run format-md && npm run serverless-offline"
   },
```

* We run the app from terminal.

```git
npm start
```

* If a message appears indicating that port 4000 is already in use, we can terminate all dependent processes and run the app again

```git
npx kill-port 4000
npm start
```

<br>

</details>

### 1.3) Technologies [🔝](#index-)

<details>
  <summary>See</summary>

 <br>

| **Technologies** | **Version** | **Purpose** |\
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Automatic Module Injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Services AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Management of Environment Variables |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | API Manager, Authentication, Control and Processing |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | js library |
| [Sequelize](https://sequelize.org/) | ^6.11.0 | ORM |
| [Mysql](https://www.mysql.com/) | 10.1 | SGDB |
| [XAMPP](https://www.apachefriends.org/es/index.html) | 3.2.2 | Server package |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | http client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Version control |

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

<br>

</details>

<br>

## Sección 2) Endpoints and Examples.

### 2.0) Endpoints and resources [🔝](#index-)

<details>
  <summary>See</summary>

### GET type operations:

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

### POST type operations:

*   http://localhost:4000/dev/v1/users/add-user/

### PUT type operations:

*   http://localhost:4000/dev/v1/users/update-user/{user-id}

### DELETE type operations:

*   http://localhost:4000/dev/v1/users/delete-user/{user-id}

### Clarifications

* {required-value}
* Default pagination: ?page=0\&limit=5
* Optional pagination: ?page={nro}\&limit={nro}

<br>

</details>

### 2.1) Examples [🔝](#index-)

<details>
  <summary>See</summary>
<br>

### 2.1.0) Variables in Postman

| **Variable** | **Initial value** | **Current value** |\
| ------------- | ------------- | ------------- |
| base_url | http://localhost:4000/dev/ | http://localhost:4000/dev/ |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>

### 2.1.1) GET type operations

### Database connection

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

### Get Paged Users

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

### Get a User based on their id

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

### Get paginated list of Users according to their country-id

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

### 2.1.2) POST type operations

### Add a User

#### Request (POST) | code snippet

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

### 2.1.3) PUT type operations

### Edit a User

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

### 2.1.4) DELETE type operations

### Delete a User

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

## Section 3) Functionality Testing and References.

### 3.0) Functionality test [🔝](#index-)

<details>
  <summary>See</summary>

<br>

#### Types of operations | [See](https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y)

![Index app](https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS/blob/master/doc/assets/playlist.png)

<br>

</details>

### 3.1) References [🔝](#índice-)

<details>
  <summary>See</summary>

 <br>

#### Configuration

* [How to use Sequelize with Node.js and MySQL](https://jasonwatmore.com/post/2022/06/26/nodejs-mysql-connect-to-mysql-database-with-sequelize-mysql2)
* [Recommended Video Tutorial](https://www.youtube.com/watch?v=im7THL67z0c)

#### Tools

* [AWS Design Tool app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)

#### Sequelize

* [Models and Operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

#### Free market

* [Users and applications](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
* [Description of users](https://developers.mercadolibre.com.ar/es_ar/producto-consulta-usuarios)

#### Swagger with Serverless

* [Autoswagger](https://www.npmjs.com/package/serverless-auto-swagger)
* [Documentation serverless api](https://levelup.gitconnected.com/documenting-your-serverless-solutions-509f1928564b)

#### Open Apiv3 with Serverless

* [serverless open api ](https://www.serverless.com/plugins/serverless-openapi-documentation)

#### API Gateway

* [Best Api-Gateway Practices](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
* [Creating Custom Api-keys](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)
* [Gateway Api properties configuration](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml)

#### Serverless frameworks

* [Plugins](https://www.serverless.com/plugins)

#### Libraries/Plugins

* [Field validation](https://www.npmjs.com/package/node-input-validator)
* [serverless-offline-ssm](https://www.serverless.com/plugins/serverless-offline-ssm)
* [serverless open api ](https://www.serverless.com/plugins/serverless-openapi-documentation)

<br>

</details>
