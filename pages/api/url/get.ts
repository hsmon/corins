import { PSDB } from 'planetscale-node'
const conn = new PSDB('main')

export default async (): Promise<string> => {
  try {
    const [rows] = await conn.query(
      `
        SELECT *
        FROM url;
      `,
      ''
    )
    return JSON.stringify(rows)
  } catch (error) {
    console.error(error)
    const err = new Error('this is erorr')
    return JSON.stringify(err, Object.getOwnPropertyNames(err))
  }
}
