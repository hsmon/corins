import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { usePreventWindowUnload } from '~/hooks/usePreventWindowUnload'
import { useRouter } from 'next/router'
import Retry from '~/components/organisms/Retry'
import { PinProps } from '~/redux/pins/reducer'
import Link from 'next/link'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
}
type IndexTypes = {
  url: {
    src: string
    imagePath: string
    imageWidth: number
    imageHeight: number
    username: string
    password: string
    monitorSize: string
  }
  pin: {
    pins: PinProps[]
  }
}

// ===============================
// @Component
// ===============================
const urlSelector: ({
  url: {
    src,
    imagePath,
    imageWidth,
    imageHeight,
    username,
    password,
    monitorSize
  },
  pin: { pins }
}: IndexTypes) => {
  src: string
  imagePath: string
  imageWidth: number
  imageHeight: number
  username: string
  password: string
  monitorSize: string
  pins: PinProps[]
} = ({
  url: {
    src,
    imagePath,
    imageWidth,
    imageHeight,
    username,
    password,
    monitorSize
  },
  pin: { pins }
}) => ({
  src,
  imagePath,
  imageWidth,
  imageHeight,
  username,
  password,
  monitorSize,
  pins
})

const View: React.FC<Props> = ({ className }) => {
  const urlStatus = useSelector(urlSelector)
  const {
    src,
    imagePath,
    imageWidth,
    imageHeight,
    username,
    password,
    monitorSize,
    pins
  } = urlStatus
  const router = useRouter()

  const scrollPosition = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, y: number) => {
      e.preventDefault()
      window.scrollTo(0, y)
    },
    []
  )

  const toFix: () => void = async () => {
    // ページ遷移
    await router.push({
      pathname: '/fix',
      query: {
        src,
        imageWidth,
        imageHeight,
        username,
        password,
        monitorSize,
        pins: JSON.stringify(pins)
      }
    })
  }

  usePreventWindowUnload(true)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={className}>
      {pins.length ? (
        <>
          <p className="confirm__text">以下の内容でよろしいでしょうか？</p>
          <div
            className="confirm__check"
            style={{ width: imageWidth * 0.5, margin: '0 auto' }}
          >
            <div
              className="images"
              style={{
                background: `url(data:image/png;base64,${imagePath})`,
                backgroundSize: 'cover',
                width: '100%',
                height: 0,
                paddingTop: `${(imageHeight / imageWidth) * 100}%`,
                margin: '0 auto',
                position: 'relative'
              }}
            >
              <ol>
                {pins.map((item: PinProps, index: number) => {
                  const [x, y, text] = [
                    item?.x ?? 0,
                    item?.y ?? 0,
                    item?.text ?? ''
                  ]
                  return (
                    <li
                      id={`${index}_${x}_${y}`}
                      key={x * y}
                      style={{
                        position: 'absolute',
                        top: y * 0.5 - 15,
                        left: x * 0.5 - 15
                      }}
                    >
                      <p>{text}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
          <div className="confirm__desc">
            <ol>
              {pins.map((item: PinProps, index: number) => {
                const [x, y, text] = [
                  item?.x ?? 0,
                  item?.y ?? 0,
                  item?.text ?? ''
                ]
                return (
                  <li key={x * y}>
                    <a
                      href={`#${index}_${x}_${y}`}
                      onClick={(e) => scrollPosition(e, y * 0.5)}
                    />
                    <p>{text}</p>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="confirm__button-list">
            <form method="post" onSubmit={toFix}>
              <input
                className="confirm__button--confirm"
                type="submit"
                value="修正指示を確定"
              />
            </form>
            <Link href="/redo">
              <a className="confirm__button--redo">やりなおす</a>
            </Link>
          </div>
        </>
      ) : (
        <Retry />
      )}
    </div>
  )
}

// ===============================
// @Styled
// ===============================
export default styled(View)`
  .confirm {
    &__text {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      margin: 2rem 0 5rem;
    }
    &__check {
      background: ${({ theme }) => theme.colors.whitesmoke};
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__desc {
      padding: 4em 2em 5em;
      > ol {
        counter-reset: item;
        list-style-type: none;
        > li {
          display: flex;
          align-items: flex-start;
          font-size: 1.2rem;
          > a {
            display: block;
            &::before {
              counter-increment: item;
              content: counter(item);
              display: flex;
              justify-content: center;
              align-items: center;
              background: ${({ theme }) => theme.colors.red};
              color: #fff;
              font-weight: bold;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 1em;
              transition: 0.3s background;
            }

            &:hover {
              &::before {
                background: ${({ theme }) => theme.colors.green};
              }
            }
          }

          + li {
            margin-top: 1em;
          }
        }
      }
    }
    &__button {
      &-list {
        display: flex;
        max-width: 800px;
        margin: 0 auto;
        form {
          display: block;
          width: 100%;
          + a {
            margin-left: 2em;
          }
        }
        a,
        input {
          display: block;
          width: 100%;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.4rem;
          padding: 10px 0;
          text-align: center;
        }
      }
      &--confirm {
        background: ${({ theme }) => theme.colors.green};
        color: #fff;
        transition: 0.3s;
        &:hover {
          background: ${({ theme }) => theme.colors.blue4};
        }
      }
      &--redo {
        background: ${({ theme }) => theme.colors.whitesmoke};
        transition: 0.3s;
        color: ${({ theme }) => theme.colors.black};
        &:hover {
          background: ${({ theme }) => theme.colors.silver};
        }
      }
    }
  }
  .images {
    position: relative;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
    }
    > ol {
      counter-reset: item;
      list-style-type: none;
      width: inherit;
      margin: inherit;
      > li {
        &:hover {
          > p {
            opacity: 1;
            visibility: visible;
          }
        }
        &::before {
          counter-increment: item;
          content: counter(item);
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${({ theme }) => theme.colors.red};
          color: #fff;
          font-weight: bold;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          transform: scale(0.5);
        }

        > p {
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
          transition-property: opacity, visiblity;
          display: block;
          padding: 10px;
          font-size: 12px;
          background: ${({ theme }) => theme.colors.yellow};
          position: absolute;
          min-width: 150px;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 20px;
        }
      }
    }
  }
`
