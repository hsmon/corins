import mysql from 'serverless-mysql'
import { SQLStatement } from 'sql-template-strings'

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
})

async function query(
  query: SQLStatement
): Promise<SQLStatement | { error: unknown }> {
  try {
    const results = await db.query<SQLStatement>(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}

async function insert(
  query: SQLStatement
): Promise<SQLStatement[] | { error: unknown }> {
  try {
    const results = await db.transaction().query(query).commit<SQLStatement>()
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}

export default { query, insert }
