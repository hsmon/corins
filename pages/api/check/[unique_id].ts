/* eslint-disable camelcase */
import { PSDB } from 'planetscale-node'
const conn = new PSDB('main')

export default async ({
  unique_id,
  error
}: {
  unique_id?: string
  error?: string
}): Promise<string> => {
  if (!unique_id || error) return 'error'
  try {
    if (unique_id && !error) {
      const [rows] = await conn.execute(
        `
        SELECT *
          FROM url
          JOIN pin
          ON url.pin_id = pin.id
          WHERE url.unique_id = ?
        ;
      `,
        [unique_id]
      )
      return JSON.stringify(rows)
    } else {
      return 'error'
    }
  } catch (error) {
    console.error(error)
    return 'error'
  }
}
