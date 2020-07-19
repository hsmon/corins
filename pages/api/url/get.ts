import DB from '~/lib/db'
import escape from 'sql-template-strings'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const url = await DB.query(escape`
      SELECT *
      FROM url;
    `)
  res.status(200).json(url)
}
