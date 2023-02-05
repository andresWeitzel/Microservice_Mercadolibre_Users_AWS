# ApiRest_Mercadolibre_Serverless
Api Rest para la gestión de usuarios, servicios, productos replicando y modificando parte de la arquitectura de desarrollo de ML.


<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1) Descripción, Tecnologías y Dependencias 

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configurar un proyecto serverless desde cero](#12-configurar-un-proyecto-serverless-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)

<br>

</details>



<br>

## Sección 1) Descripción, Tecnologías y Dependencias 


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 
 <br>

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
* Levantamos el proyecto
```git
sls offline start

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
* Inicializamos un proyecto npm
```git
npm init -y
```
* Instalamos Serverless Framework de forma global
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Inicializamos un template de serverles
```git
serverless create \
  --template-url https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs \
  --path myService
```
* Instalamos serverless offline 
```git
npm i serverless-offline --save-dev
```
* Instalamos serverless ssm 
```git
npm i serverless-offline-ssm --save-dev
```



<br>

</details>


### 1.2) Configurar un proyecto serverless desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>


<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>


<br>

</details>
