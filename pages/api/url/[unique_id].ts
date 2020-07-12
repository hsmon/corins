/* eslint-disable @typescript-eslint/camelcase */
import DB from '~/lib/db'
import escape from 'sql-template-strings'

export default async (req, res) => {
  const { unique_id } = req.query
  const url = await DB.query(escape`
      SELECT *
        FROM url
        JOIN pin
        ON url.pin_id = pin.id
        WHERE url.unique_id = ${unique_id}
      ;
    `)
  res.status(200).json(url)
}
