# unleash-proxy

This is a proxy that lives in front of the [unleash-server](../server/README.md). All frontend applications should communicate with this proxy to make sure that it dosen't overload the server living behind. This proxy will cache the strategies if nothing have changed since last pull. 

## Running the service
To run this service you need to have NodeJS and npm installed. 
Then install dependencies before starting the application. 

1) `npm install`
2) `npm run start`

## Releasing the application
To release the application we use a plugin called `release-it`. You can simply run the command `npm run release` to get the interactive release CLI. After you have selected what kind of release, tagged and pushed to Github, CI/CD will kick in to do the build and deploy of the application. 