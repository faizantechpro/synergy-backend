
# Synergy Apis 

This readme file will help with get started 



[Synergy Apis Documentation](https://linktodocumentation)

Follow these steps 

1- install  [nodejs](https://nodejs.org/en/download/) latest version\
2- insatll [docker](https://docs.docker.com/engine/install/) as per your os  
3- make an environemt variable file  like .env.environemt

    e.g  .env.production to run in production environment
         .env.local to run in local environemt 
         .env.docker to run in docker environemt


4- for docker environemt, DB_URI must be following
        
        DB_URI = mongodb://dbsynergy/SynergyApp

rest of env will be same

5- follwing are handful commands  while running in docker environemt
     

        1- make up 
           
           to run docker-compose 


        2- make logs
            to check logs

        3- make down
            to close server


6- for local environemt, create .env.local file and run

        npm run start 




