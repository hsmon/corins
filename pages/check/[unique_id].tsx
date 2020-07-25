/* eslint-disable @typescript-eslint/camelcase */
import styled from 'styled-components'
import { GetStaticProps, GetStaticPaths } from 'next'
import fetch from 'node-fetch'
import { PinProps } from '~/redux/pins/reducer'
import React from 'react'
import Toggle from '~/components/molecules/Toggle'
import Board from '~/components/molecules/Board'
import PropTypes from 'prop-types'
import { Url } from '~/types/mysql'
import Retry from '~/components/organisms/Retry'

// ===============================
// @Types
// ===============================
type UrlTypes = {
  unique_id: number
  image_height: number
  image_width: number
  src: string
}
interface Props {
  className?: string
  url: UrlTypes[]
  error?: unknown
}

// ===============================
// @Component
// ===============================
const View: React.FC<Props> = ({ className, url, error }) => {
  if (error) {
    return <Retry />
  }
  const { unique_id, image_height, image_width, src } = url[0]
  const [uniqueId, imageHeight, imageWidth, pins] = [
    unique_id,
    image_height,
    image_width,
    JSON.parse(JSON.parse(src))
  ]
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  /**
   * スクロール移動
   */
  const scrollPosition = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, y: number) => {
      e.preventDefault()
      window.scrollTo(0, y)
    },
    []
  )
  return (
    <div className={className}>
      <p className="title">修正内容を確認しましょう 🤟</p>
      <div
        className="images__wrap"
        style={{ width: imageWidth, margin: '0 auto' }}
      >
        <div
          className="images"
          style={{
            background: `url("https://corins.s3-ap-northeast-1.amazonaws.com/images/${uniqueId}.png")`,
            backgroundSize: 'cover',
            width: '100%',
            height: 0,
            paddingTop: `${(imageHeight / imageWidth) * 100}%`,
            margin: '0 auto',
            position: 'relative'
          }}
        >
          <ol className="pins">
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
                    top: y,
                    left: x
                  }}
                >
                  <Board text={text} open={true} />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      <div className="pins__text-list">
        <ol>
          {pins.map((item: PinProps, index: number) => {
            const [x, y, text] = [item?.x ?? 0, item?.y ?? 0, item?.text ?? '']

            return (
              <li key={x * y}>
                <a
                  href={`#${index}_${x}_${y}`}
                  className="pins__text-list__number"
                  onClick={(e) => scrollPosition(e, y)}
                  tabIndex={-1}
                />
                <p>{text}</p>
              </li>
            )
          })}
        </ol>
      </div>
      <div
        className={
          isOpen ? 'pins__text-list--fixed isOpen' : 'pins__text-list--fixed'
        }
      >
        <button type="button" onClick={() => setIsOpen(!isOpen)} tabIndex={1} />
        <ol>
          {pins.map((item: PinProps, index: number) => {
            const [x, y, text] = [item?.x ?? 0, item?.y ?? 0, item?.text ?? '']

            return (
              <li key={x * y}>
                <a
                  href={`#${index}_${x}_${y}`}
                  className="pins__text-list--fixed__number"
                  onClick={(e) => scrollPosition(e, y)}
                  tabIndex={-1}
                />
                <Toggle text={text} open={index === 0} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

const dev = process.env.NODE_ENV !== 'production'

export const getStaticPaths: GetStaticPaths = async () => {
  const pageRequest = dev
    ? 'http://localhost:3000/api/url/get'
    : `https://${process.env.VERCEL_URL}/api/url/get`
  const res = await fetch(pageRequest)
  const urls: Url[] = await res.json()
  const paths = urls.map((url) => `/check/${url.unique_id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const pageRequest = dev
      ? `http://localhost:3000/api/url/${params?.unique_id ?? ''}`
      : `https://${process.env.VERCEL_URL}/api/url/${params?.unique_id ?? ''}`
    const res = await fetch(pageRequest)
    const url = await res.json()
    return {
      props: {
        url
      }
    }
  } catch (error) {
    return {
      props: {
        error
      }
    }
  }
}

View.propTypes = {
  className: PropTypes.string.isRequired,
  url: PropTypes.array.isRequired,
  error: PropTypes.any.isRequired
}

// ===============================
// @Styled
// ===============================

export default styled(View)`
  .title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 5rem;
  }
  .images {
    background: #ddd;
  }
  .pins {
    counter-reset: item;
    list-style-type: none;
    z-index: 1;

    > li {
      position: absolute;
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
      }
    }

    &__text-list {
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
      &--fixed {
        position: fixed;
        top: 50vh;
        bottom: 50vh;
        right: -350px;
        z-index: 2;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.isOpen {
          right: 0;
          > button {
            right: 20px;
            opacity: 0;
            visibility: hidden;
            box-shadow: none;
            &::before,
            &::after {
              height: 15px;
            }
            &::before {
              transform: translate3d(0, 0, 0) rotate(135deg);
            }
            &::after {
              transform: translate3d(0, 0, 0) rotate(-135deg);
            }
          }
          &:hover {
            > button {
              opacity: 1;
              visibility: visible;
            }
          }
        }
        > button {
          position: absolute;
          top: -20px;
          right: 370px;
          z-index: 5;
          border-radius: 50%;
          background: ${({ theme }) => theme.colors.green};
          color: #fff;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: 0.3s;
          transition-property: opacity, visibility, box-shadow;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
          &::before,
          &::after {
            content: '';
            background: #fff;
            height: 10px;
            width: 2px;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            transition: transform 0.3s ease;
          }
          &::before {
            transform: translate3d(0, -3px, 0) rotate(45deg);
          }
          &::after {
            transform: translate3d(0, 3px, 0) rotate(-45deg);
          }
          &:focus {
            opacity: 1;
          }
        }
        ol {
          counter-reset: item;
          list-style-type: none;
          padding: 20px 40px 20px 20px;
          background: #f1f4f7;
          border-radius: 15px 0 0 15px;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
          > li {
            display: flex;
            align-items: center;
            overflow: hidden;
            background: #fff;
            padding: 10px;
            position: relative;
            &:first-child {
              border-radius: 15px 15px 0 0;
            }
            &:last-child {
              border-radius: 0 0 15px 15px;
            }
          }
        }
        &__number {
          display: inline-block;
          position: absolute;
          z-index: 5;
          left: 10px;
          top: 10px;
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
      }
    }
  }
`
