import DB from '~/lib/db'
import escape from 'sql-template-strings'

export default async (): Promise<string> => {
  try {
    const url = await DB.query(escape`
        SELECT *
        FROM url;
      `)
    return JSON.stringify(url)
  } catch (error) {
    console.error(error)
    return error
  }
}
