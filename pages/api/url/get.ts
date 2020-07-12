import DB from '~/lib/db'
import escape from 'sql-template-strings'

export default async (req, res) => {
  const url = await DB.query(escape`
      SELECT *
      FROM url;
    `)
  res.status(200).json(url)
}
