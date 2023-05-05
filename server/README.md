# unleash-server

The [unleash-server](https://github.com/Unleash/unleash) configured with AzureAD authenticaiton

## Running the service
To run this service you need to have NodeJS and npm installed. 
Then install dependencies before starting the application. 

1) Run `docker-compose up` to spin up database needed for server.
2) Run `npm install` to intstall server dependencies.
3) Run `npm run start` to start the server.

## Local development setup

To run this locally you would need both a postgres instance and and AzureAD client app
To get the postgres database up and running you can run the command `docker-compose up`.
This will start a postgres database and store the data in a `.data` folder in your local repo.
This folder will be ignored by Git, but will give you the posibility to boot the application up with the same data every time.
If you want to start from scratch you can run the command `docker-compose down` and delete the `.data` folder. 

To get AzureAD auth to work you would need an valid client app in our AzureAD. 
Unless you need to develop or fix anything with auth we don't usually want to create these apps as they have a wide read scope.
You can therefore remove the `authentiaction:` block from the index.ts file and start Unleash with basic auth.
The username will then be `admin` and the password will be `unleash4all`. 

### Database setup

By default the application will go ahead and bootstrap a DB for you if it's empty, 
as long as the default variables from the code and docker-compose file matches. 
If you have a custom DB cluster that you want to use for this you can go ahead and do the following:

```
$ psql

> CREATE USER unleash PASSWORD '...';
> CREATE DATABASE unleash;
> GRANT ALL ON SCHEMA public TO unleash;
> GRANT ALL ON ALL TABLES IN SCHEMA public TO unleash;
```


## Releasing the application
To release the application we use a plugin called `release-it`. You can simply run the command `npm run release` to get the interactive release CLI. After you have selected what kind of release, tagged and pushed to Github, CI/CD will kick in to do the build and deploy of the application. 