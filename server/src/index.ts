import unleash, { IAuthType, LogLevel } from 'unleash-server'
import azureAuthHook from './azure-auth-hook'
import * as dotenv from 'dotenv'

dotenv.config()
const db_user = process.env.DB_USER || 'unleash_user'
const db_password = process.env.DB_PASSWORD || 'passord'
const db_host = process.env.DB_HOST || 'localhost'
const db_port = parseInt(process.env.DB_PORT || '') || 5432
const db_name = process.env.DB_NAME || 'unleash'
const server_port = parseInt(process.env.PORT || '') || 8080

unleash.start({
  db: {
    user: db_user,
    password: db_password,
    host: db_host,
    port: db_port,
    database: db_name,
  },
  authentication: {
    type: IAuthType.CUSTOM,
    createAdminUser: true,
    customAuthHandler: azureAuthHook,
  },
  server: {
    enableRequestLogger: true,
    baseUriPath: '',
    port: server_port,
    serverMetrics: true,
  },
  logLevel: LogLevel.info,
})
