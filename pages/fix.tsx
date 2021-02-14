import styled from 'styled-components'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import getScreenshot, { ScreenshotReturnType } from '~/pages/api/screenshot'
import postStatus from '~/pages/api/url/post'
import Retry from '~/components/organisms/Retry'
import { MonitorSizeKey } from '~/assets/monitorSize'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  uniqueId: string
}

// ===============================
// @Component
// ===============================
const View: React.FC<Props> = ({ className, uniqueId }) => {
  if (!uniqueId) {
    return <Retry />
  }

  const handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void = (
    event
  ) => event.target.select()

  return (
    <div className={className}>
      <p className="fix__title">
        登録が完了しました！
        <span>
          ※有効期限は登録時から7日間となります。それ以降は再び登録する必要があります。
        </span>
      </p>
      <p className="fix__text">共有リンクはこちら</p>
      <input
        className="fix__input"
        type="text"
        value={`${window.location.origin}/check/${uniqueId}`}
        onFocus={handleFocus}
      />
      <p style={{ textAlign: 'center' }}>
        <Link href="check/[unique_id]" as={`check/${uniqueId}`}>
          <a className="fix__button">フィードバックを確認する</a>
        </Link>
      </p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query
}) => {
  const [
    src,
    imageWidth,
    imageHeight,
    username,
    password,
    monitorSize,
    pins
  ] = [
    query.src as string,
    (query.imageWidth as unknown) as number,
    (query.imageHeight as unknown) as number,
    query.username as string,
    query.password as string,
    query.monitorSize as MonitorSizeKey,
    query.pins as string
  ]
  const { screenshot } = (await getScreenshot(
    src,
    username,
    password,
    monitorSize
  )) as ScreenshotReturnType

  const result = await postStatus({
    imagePath: screenshot as string,
    imageWidth,
    imageHeight,
    pins
  })
  const { uniqueId } = result as { uniqueId: string }

  return {
    props: {
      uniqueId
    }
  }
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
