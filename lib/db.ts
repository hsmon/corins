import mysql from 'serverless-mysql'

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
})

type Query = {
  query: string
}

async function query(query) {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}

async function insert(query) {
  try {
    const results = await db.transaction().query(query).commit()
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}

export default { query, insert }
