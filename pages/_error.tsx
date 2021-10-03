import Link from 'next/link'
import { NextPage, NextPageContext } from 'next'
import styled from 'styled-components'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  statusCode: number
}

// ===============================
// @Component
// ===============================

const Error: NextPage<Props> = ({ className, statusCode }) => {
  return (
    <div className={className}>
      <h1>{statusCode}</h1>
      <p>
        エラーが発生しました。
        <br />
        後でもう一度お試しください。
      </p>
      <Link href="/">
        <a>やりなおす</a>
      </Link>
    </div>
  )
}

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404

  return { statusCode }
}

// ===============================
// @Styled
// ===============================
export default styled(Error)`
  h1 {
    font-size: 5rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 5rem;
  }
  p {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1em;
  }
`
