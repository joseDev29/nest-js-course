import { registerAs } from '@nestjs/config'

//Permite organizar las variables de entorno obtenidas de los .envs
export default registerAs('config', () => ({
  db: {
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  apiKey: process.env.API_KEY,
}))
