import styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { urlSelector } from '~/lib/urlselector'
import { useEffect, useState } from 'react'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  uniqueId: string | null
}

// ===============================
// @Component
// ===============================
const View: React.FC<Props> = ({ className }) => {
  const handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void = (
    event
  ) => event.target.select()

  const urlStatus = useSelector(urlSelector)
  const { imagePath, imageWidth, imageHeight, pins } = urlStatus

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const [uniqueId, setUniqueId] = useState('')
  const [loading, setLoad] = useState(true)

  const fetchHandler = async (): Promise<void> => {
    const res = await fetch('/api/url/post', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        imagePath,
        imageWidth,
        imageHeight,
        pins
      })
    })
    const data = await res.json()
    setUniqueId(data.uniqueId)
    setLoad(false)
  }

  useEffect(() => {
    if (loading) {
      fetchHandler()
    }
  }, [loading])

  return (
    <>
      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <p>読込中...</p>
        </div>
      ) : (
        <div className={className}>
          <p className="fix__title">
            登録が完了しました！
            <span>
              ※有効期限は登録時から7日間となります。それ以降は再び登録する必要があります。
            </span>
          </p>
          <p className="fix__text">共有リンクはこちら</p>
          {window && (
            <input
              className="fix__input"
              type="text"
              value={`${window.location.origin}/check/${uniqueId}`}
              onFocus={handleFocus}
            />
          )}
          <p style={{ textAlign: 'center' }}>
            <Link href="check/[unique_id]" as={`check/${uniqueId}`}>
              <a className="fix__button">フィードバックを確認する</a>
            </Link>
          </p>
        </div>
      )}
    </>
  )
}

export default styled(View)`
  .fix {
    &__title {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      margin: 2rem 0 5rem;
      span {
        font-size: 1rem;
        text-align: center;
        display: block;
        font-weight: normal;
        padding-top: 1em;
        color: ${({ theme }) => theme.colors.gray};
      }
    }
    &__text {
      text-align: center;
      font-size: 1.4rem;
      padding-bottom: 1em;
      font-weight: bold;
    }
    &__input {
      display: block;
      width: 800px;
      margin: 0 auto 4em;
      font-size: 1.4rem;
      padding: 0.5em 1em;
      border: solid ${({ theme }) => theme.colors.green};
      border-radius: 6px;
    }
    &__button {
      text-align: center;
      background: ${({ theme }) => theme.colors.green};
      color: #fff;
      transition: 0.3s;
      display: block;
      width: 100%;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1.4rem;
      padding: 10px 0;
      width: 800px;
      margin: 0 auto;
      &:hover {
        background: ${({ theme }) => theme.colors.blue4};
      }
    }
  }
`
