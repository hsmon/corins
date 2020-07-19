/* eslint-disable @typescript-eslint/camelcase */
import DB from '~/lib/db'
import escape from 'sql-template-strings'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
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
