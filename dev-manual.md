# Developer project manual

# Installation
1. Download the repository.
2. You may need to use npm 5.2.0 since there are issues with npm 5.3.0 on Windows 10.
3. Install npm modules: npm install.
4. Install nested npm modules: npx recursive-install. (this will instll modules from package.json files from upload-module, login-module, etc..)
5. Start up server: npm start (we used nodemon).

If you want to use another port, change it in the configuration file bin/www.js.Change the value of the key field port.

# Software to use
1. Nodejs
2. Express(module Node)
3. MongoDB

For mongodb we used hosting on https://mlab.com/ no need to have mongodb on your computer. 
For mongodb installation follow the link guide https://docs.mongodb.com/manual/installation/ if u need to change db to local.

# Docker
1. For docker installation https://docs.docker.com/install/#desktop
2. Download docker image using "docker pull marijaborisov/csvmodule".
3. Run the downloaded docker image: "docker run -p 3000:3000 -d marijaborisov/csvmodule".

To see images: docker images.
To see containers: docker containers.
In case u need to stop images/containers use docker stop [image/container name or ID].