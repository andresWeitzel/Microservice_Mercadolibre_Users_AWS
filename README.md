
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

# Microservice Mercadolibre Users AWS ![Status](./doc/assets/icons/badges/status-completed.svg)

</div>  

Microservice for user management exemplifying part of the ML development architecture, implemented with Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, NodeJs, Sequelize, Mysql, Docker, Docker-compose, Amazon RDS, Unit Test with Jest, among others. AWS services are tested locally. The project code and its documentation (less technical doc) have been developed in English.

*   [Api Doc ML Users](https://developers.mercadolibre.com.ar/es_ar/usuarios-y-aplicaciones)
*   [Playlist functionality test](https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurB9JzGtm5e8-yp52IcZDs5y" target="_blank"> <img src="./doc/assets/social-networks/yt.png" width="25" /> </a>

<br>

## Index 📜

<details>
 <summary> View </summary>

 <br>

### Section 1) Description, configuration and technologies.

*   [1.0) Project Description.](#10-project-description-)
*   [1.1) Project Execution.](#11-project-execution-)
*   [1.2) Docker Setup and Database Migration](#12-docker-setup-and-database-migration-)
*   [1.3) Technologies.](#13-technologies-)

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

*   `Important` : Make sure Docker are installed on your system (for Windows, use [Docker Desktop]([https://nodejs.org/en/download]\(https://www.docker.com/products/docker-desktop/\)))

*   Start and build the MySQL database container:

```bash
docker-compose up -d
```

*   Verify the container is running:

```bash
docker ps
```

*   If you need to reset the database (optional) :

```bash
docker-compose down -v
docker-compose up -d
```

*   To view database logs (optional):

```bash
docker-compose logs mysql
```

*   To access MySQL directly  (optional):

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

*   If a message appears indicating that port 4000 is already in use, we can terminate all dependent processes and run the app again  (optional) : 

```git
npx kill-port 4000
npm start
```

<br>

</details>



### 1.2) Docker Setup and Database Migration [🔝](#index-)

<details>
  <summary>See</summary>

<br>

#### 1.2.1) Database Configuration with Docker

1.  **Docker Compose Configuration**
    The following configuration sets up a MySQL 8.0 container with persistent storage and automatic initialization:
    ```yaml
    version: '3.8'
    services:
      mysql:
        image: mysql:8.0
        container_name: mercadolibre_users_mysql
        environment:
          MYSQL_ROOT_PASSWORD: root          # Root password for MySQL
          MYSQL_DATABASE: microdb_mercadolibre  # Database name
          MYSQL_USER: mercadolibre_user      # Application user
          MYSQL_PASSWORD: mercadolibre_pass  # Application user password
        ports:
          - "3306:3306"                      # Maps container port to host port
        volumes:
          - mysql_data:/var/lib/mysql        # Persistent data storage
          - ./init:/docker-entrypoint-initdb.d  # Initialization scripts
        command: --default-authentication-plugin=mysql_native_password  # Authentication method
        healthcheck:
          test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]  # Health check command
          interval: 10s                      # Check every 10 seconds
          timeout: 5s                        # Timeout after 5 seconds
          retries: 5                         # Retry 5 times before marking unhealthy

    volumes:
      mysql_data:                            # Named volume for data persistence
    ```

2.  **Essential Docker Commands**
    These commands are essential for managing your Docker environment:
    ```bash
        # Start container in detached mode (runs in background)
    docker-compose up -d
    
        # Check container status and health
    docker ps
    
        # Reset database (removes all data and recreates container)
    docker-compose down -v
    docker-compose up -d
    
        # View database logs for troubleshooting
    docker-compose logs mysql
    
        # Access MySQL command line interface
    docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
    ```

3.  **Sample Data**
    Here are some example queries to populate your database:
    ```sql
    -- Sample user insertion with all required fields
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
        'John',
        'Doe',
        'john@example.com',
        'DNI',
        '12345678',
        'AR'
    );

    -- Sample product insertion
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

#### 1.2.2) Migration Process

1.  **Database Initialization**
    The database setup process follows these steps:
    *   When the container starts, it automatically creates the database specified in MYSQL_DATABASE
    *   The initialization scripts in the `./init` directory are executed in alphabetical order
    *   Data persists between container restarts thanks to the Docker volume `mysql_data`
    *   The first script (01_*) typically contains table definitions
    *   The second script (02_*) typically contains initial data

2.  **File Structure**
    The initialization process uses this file structure:
    ```
    init/
    ├── 01_microdb_mercadolibre_DDL.sql     # Database schema and table definitions
    └── 02_microdb_mercadolibre_DML_INSERTS.sql  # Initial data and seed records
    ```

3.  **Considerations**
    Important points to remember:
    *   The `mysql_data` volume ensures your data persists even if the container is removed
    *   To completely reset the database, you need to remove the volume using `docker-compose down -v`
    *   Database credentials are defined in the `docker-compose.yml` file
    *   The container uses MySQL 8.0 with native password authentication
    *   The database is accessible on port 3306 of your host machine

#### 1.2.3) Additional Docker Commands and Examples

1.  **Container Management**
    Advanced container management commands:
    ```bash
    # Stop all containers gracefully
    docker-compose down

    # Remove all containers, networks, and volumes
    docker-compose down -v

    # Rebuild containers with latest changes
    docker-compose build

    # View container logs in real-time (follow mode)
    docker-compose logs -f mysql

    # Execute interactive shell in container
    docker exec -it mercadolibre_users_mysql bash
    ```

2.  **Database Backup and Restore**
    Commands for database maintenance:
    ```bash
    # Create a full database backup
    docker exec mercadolibre_users_mysql mysqldump -u mercadolibre_user -p microdb_mercadolibre > backup.sql

    # Restore database from backup
    docker exec -i mercadolibre_users_mysql mysql -u mercadolibre_user -p microdb_mercadolibre < backup.sql
    ```

3.  **Troubleshooting**
    Common troubleshooting commands:
    ```bash
    # Check container status and details
    docker ps -a

    # Inspect container configuration
    docker inspect mercadolibre_users_mysql

    # View container logs
    docker logs mercadolibre_users_mysql

    # Monitor container resource usage
    docker stats mercadolibre_users_mysql
    ```

4.  **Additional Sample Queries**
    Useful SQL queries for common operations:
    ```sql
    -- Create new user with all fields
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
        'PASSPORT',
        'AB123456',
        'ES'
    );

    -- Update user information
    UPDATE users 
    SET email = 'new.email@example.com',
        update_date = CURRENT_TIMESTAMP
    WHERE id = 1;

    -- Delete user
    DELETE FROM users 
    WHERE id = 1;

    -- Search users by country with pagination
    SELECT * FROM users 
    WHERE country_id = 'AR' 
    ORDER BY creation_date DESC
    LIMIT 10 OFFSET 0;

    -- Count users by country
    SELECT country_id, COUNT(*) as user_count 
    FROM users 
    GROUP BY country_id;
    ```

5.  **Common Issues and Solutions**
    Solutions for frequent problems:
    *   **Port Conflict**: If port 3306 is already in use
        ```bash
            # Find process using port
            netstat -ano | findstr :3306
            # Kill process
            taskkill /PID <process_id> /F
        ```
    
    *   **Container Won't Start**: Check logs for errors
        ```bash
        # View detailed logs
        docker-compose logs mysql
        # Check container status
        docker ps -a
        ```
    
    *   **Database Connection Issues**: Verify credentials and network
        ```bash
        # Test connection
        docker exec -it mercadolibre_users_mysql mysql -u mercadolibre_user -p
        # Check network
        docker network ls
        docker network inspect <network_name>
        ```

6.  **Performance Optimization**
    Tips for optimizing database performance:
    *   Adjust MySQL configuration in `my.cnf`:
        ```ini
        [mysqld]
        innodb_buffer_pool_size = 256M    # Buffer pool size for InnoDB
        max_connections = 100             # Maximum concurrent connections
        query_cache_size = 32M           # Query cache size
        ```
    
    *   Monitor performance:
        ```sql
        -- Check slow queries
        SHOW VARIABLES LIKE '%slow%';
        
        -- Check connection status
        SHOW STATUS LIKE '%onn%';
        
        -- Check table status
        SHOW TABLE STATUS;
        
        -- Check process list
        SHOW PROCESSLIST;
        ```

<br>

</details>

### 1.3) Technologies [🔝](#index-)

<details>
  <summary>See</summary>

 <br>

| **Technologies** | **Version** | **Purpose** |
|-----------------|-------------|-------------|
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Automatic Module Injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | AWS Services Core |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Environment Variables Management |
| [Jest](https://jestjs.io/) | 29.7 | Framework for unit testing, integration, etc. |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | API Manager, Authentication, Control and Processing |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | JS Library |
| [Sequelize](https://sequelize.org/) | ^6.11.0 | ORM |
| [Mysql](https://www.mysql.com/) | 10.1 | DBMS |
| [XAMPP](https://www.apachefriends.org/es/index.html) | 3.2.2 | Server Package |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Http Client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Command Line Interface |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Version Control |
| Others | Others | Others |

<br>

| **Plugin** |
|------------|
| [Serverless Plugin](https://www.serverless.com/plugins/) |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |

<br>

| **Extension** |
|---------------|
| Prettier - Code formatter |
| YAML - Autoformatter .yml |
| Error Lens - Error identifier |
| Tabnine - AI Code |
| Others - Others |

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
  <summary>View</summary>
<br>

#### 2.1.0) Postman Variables

| **Variable** | **Initial Value** | **Current Value** |
|-------------|------------------|------------------|
| base_url | http://localhost:4000/dev/ | http://localhost:4000/dev/ |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>

#### 2.1.1) GET Operations

##### Get Users List

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

##### Get Users List Without Dates

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

##### Get User by ID

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

##### Get Users by Country

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

#### 2.1.2) POST Operations

##### Add User

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

#### 2.1.3) PUT Operations

##### Update User

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

#### 2.1.4) DELETE Operations

##### Delete User

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
