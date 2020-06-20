import Link from 'next/link'

const Retry: React.FC = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3em 0'
      }}
    >
      <p
        style={{
          display: 'block',
          marginBottom: '1em'
        }}
      >
        もう一度はじめからやり直してください
      </p>
      <Link href="/">
        <a>やりなおす</a>
      </Link>
    </div>
  )
}

export default Retry
