import { ObjectId } from 'mongodb'

export interface TokenPayload {
  role: string
  id: ObjectId
}
