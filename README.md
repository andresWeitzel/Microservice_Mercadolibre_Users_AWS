# ApiRest_Mercadolibre_Serverless
Api Rest para la gestión de usuarios, servicios, productos replicando y modificando parte de la arquitectura de desarrollo de ML.
* [Repositorio base de datos](https://github.com/andresWeitzel/Microdb_MercadoLibre_Mysql)


<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1) Descripción, Tecnologías y Referencias

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configurar un proyecto serverless desde cero](#12-configurar-un-proyecto-serverless-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)
 - [1.4) Referencias.](#14-referencias-)

<br>

</details>



<br>

## Sección 1) Descripción, Tecnologías y Dependencias 


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 
 <br>

<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/ApiRest_Mercadolibre_Serverless
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos todos los paquetes necesarios
```git
npm i
```
* Creamos un archivo para almacenar las variables ssm necesarias
  * Click der sobre la raíz del proyecto
  * New file
  * Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
  * Añadimos las ssm necesarias dentro del archivo. Ej:
  ```git
  HELLO_TEST : 'HELLO_SSM_TEST'
  ```  
* Levantamos el proyecto
```git
sls offline start
```
 
 
<br>

</details>


### 1.2) Configurar un proyecto serverless desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>
 
  
* Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma
```git
cd 'projectName'
```
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
* Una vez instalado git, lo inicializamos en nuestro proyecto
```git
git init
```
* Asiganmos la uri del remoto
```git
git remote add origin https://github.com/andresWeitzel/ApiRest_Mercadolibre_Serverless
```
* Traemos los cambios del remoto
```git
git pull origin master
```
* Agregamos lo local, commitiamos y pusheamos
```git
git add .
git commit -m "Updated x"
git push origin master
```



<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>


<br>

</details>


### 1.4) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>

 * [Cómo usar Sequelize con Node.js y MySQL](https://jasonwatmore.com/post/2022/06/26/nodejs-mysql-connect-to-mysql-database-with-sequelize-mysql2)

<br>

</details>
