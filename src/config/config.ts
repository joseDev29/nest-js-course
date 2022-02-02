import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  mongoDB: {
    connection: process.env.MONGO_CONNECTION,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    dbName: process.env.MONGO_DB_NAME,
  },
  auth: {
    apiKey: process.env.API_KEY
  }
}))
