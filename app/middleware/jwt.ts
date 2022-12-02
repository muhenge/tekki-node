import {sign, verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export const accessToken = (data: object): any => {
  return sign(data, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: 60*60})
}
