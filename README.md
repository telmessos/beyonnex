# Beyonnex Sample Project

This project is a sample project prepared for Beyonnex home assignment using Page Object Model pattern. It tests some basic features on https://weathershopper.pythonanywhere.com/ as requested on the shared document.

Project uses WebdriverIO, Mocha, Allure Reporting

## Pre-requisites and installation
* Latest version of Allure command line should be installed on your system.
* To make installation check out this GIT repo, open the project with your favorite IDE, open Console in the IDE and type:
* Run specific requirements are mentioned under Local Run and Docker Run titles

## Local Run

* Latest version of NodeJS should be installed on your system

```javascript
npm install
```
* After NodeJS module installation is complete, to run the tests type either

```javascript
npm run test
```
or

```javascript
npm run wdio
```
### Allure report

Open terminal in the project folder after test execution and type

```javascript
allure serve allure-results
```

## Docker Run

* Latest version of Docker should be installed on your system

To build the image with the Dockerfile, type:
```javascript
docker build -t beyonnextest -f Dockerfile .
```
Once the Docker build is completed, to run a container with the built image, type: 
```javascript
docker run --name=beyonnex -it beyonnextest
```
Run command downloads the required version of Chrome and Chromedriver, runs npm install, and runs the tests. 

After the test is completed message displayed in the terminal, copy the Allure Results folder with command pattern of docker run -cp "path of copying folfer" "path of copied host folder":

Example: 
```javascript
docker cp beyonnex:/app/allure-results ./
```
To run view the Allure Reports, type:

```javascript
allure serve allure-results
```