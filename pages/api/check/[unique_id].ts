/* eslint-disable @typescript-eslint/camelcase */
import DB from '~/lib/db'
import escape from 'sql-template-strings'

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
      const url = await DB.query(escape`
        SELECT *
          FROM url
          JOIN pin
          ON url.pin_id = pin.id
          WHERE url.unique_id = ${unique_id}
        ;
      `)
      return JSON.stringify(url)
    } else {
      return 'error'
    }
  } catch (error) {
    console.error(error)
    return 'error'
  }
}
