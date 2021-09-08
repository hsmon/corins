import React from 'react'
import styled from 'styled-components'
import { PinProps } from '~/redux/pins/reducer'
import { useDispatch } from 'react-redux'
import { addUrlImage } from '~/redux/urls/actions'
import { addPinStateValue } from '~/redux/pins/actions'
import { usePreventWindowUnload } from '~/hooks/usePreventWindowUnload'
import Retry from '~/components/organisms/Retry'
import Dialog from '~/components/organisms/Dialog'
import texts from '~/assets/text'
import { useRouter } from 'next/router'
import monitorSize, { MonitorSizeKey } from '~/assets/monitorSize'

const { PC, TB, SP } = monitorSize

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  screenshot: string
  screenshotWidth: number
  screenshotHeight: number
  monitorSize: MonitorSizeKey
  pins?: PinProps[]
}

// ===============================
// @Component
// ===============================
const View: React.FC<Props> = ({
  className,
  screenshot,
  screenshotWidth,
  screenshotHeight,
  pins,
  monitorSize
}) => {
  const [pinState, setPinState] = React.useState<PinProps>(null)
  const [pinArray, setPinArray] = React.useState<PinProps[]>(pins ?? [])
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const onClickOpen: () => void | React.Dispatch<
    React.SetStateAction<boolean>
  > = () => setIsDialogOpen(true)
  const onClickClose: () => void | React.Dispatch<
    React.SetStateAction<boolean>
  > = () => setIsDialogOpen(false)

  const router = useRouter()
  const dispatch = useDispatch()

  // ブラウザの閉じるor再読み込み時に確認
  usePreventWindowUnload(pinArray.length as unknown as boolean)

  /**
   * Pinの追加
   */
  const addPin: () => void = React.useCallback(() => {
    setPinArray([...pinArray, { ...pinState, text: '' }] as typeof pinArray)
  }, [pinState])

  /**
   * Pinの削除
   */
  const removePin = React.useCallback(
    (index) => {
      setPinArray(pinArray.filter((_, itemIndex) => itemIndex !== index))
    },
    [pinArray]
  )

  /**
   * Pinのテキスト編集
   */
  const addPinText: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    item: PinProps,
    index: number
  ) => void = React.useCallback(
    (e, item, index) => {
      setPinArray(
        [...pinArray].map((pin, itemIndex) => {
          if (itemIndex !== index) return pin
          return {
            x: item?.x ?? 0,
            y: item?.y ?? 0,
            text: e?.target.value ?? ''
          }
        })
      )
    },
    [pinArray]
  )
  /**
   * ピンのXY軸の判定
   */
  const movePosition = React.useCallback((x: number, y: number) => {
    setPinState({ x, y })
  }, [])

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

  /**
   * テキストが入力されているか確認
   */
  const checkText = React.useCallback((text) => {
    if (text.length) return false
    return true
  }, [])

  /**
   * Pinすべてがテキストが入力されているか確認
   */
  const checkAllText: () => boolean = React.useCallback(() => {
    if (!pinArray.length) return false

    const results: boolean[] = pinArray.map((item) => {
      const [text] = [item?.text ?? '']
      if (text.length) return true
      return false
    })

    if (results.includes(false)) return false
    return true
  }, [pinArray])

  /**
   * Pin情報送信時の処理
   */
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault()
    if (checkAllText()) {
      dispatch(addPinStateValue(pinArray))
      dispatch(
        addUrlImage({
          imagePath: screenshot,
          imageWidth: screenshotWidth,
          imageHeight: screenshotHeight
        })
      )
      router.push({ pathname: '/confirm' })
    } else {
      onClickOpen()
    }
  }

  const handleMonitorSize: (monitorSize: MonitorSizeKey) => number = (
    monitorSize = 'PC'
  ) => {
    switch (monitorSize) {
      case 'PC':
        return PC.width
      case 'TB':
        return TB.width
      case 'SP':
        return SP.width
      default:
        return PC.width
    }
  }

  return (
    <form className={className} method="post" onSubmit={handleSubmit}>
      <div
        id="edit"
        style={{
          maxWidth: handleMonitorSize(monitorSize),
          margin: '0 auto'
        }}
      >
        {screenshot ? (
          <div
            className="images"
            style={{
              background: `url(data:image/png;base64,${screenshot})`,
              backgroundSize: 'cover',
              width: '100%',
              height: 0,
              paddingTop: `${(screenshotHeight / screenshotWidth) * 100}%`,
              cursor: 'crosshair'
            }}
            onMouseMove={({ nativeEvent: { offsetX, offsetY } }) =>
              movePosition(offsetX, offsetY)
            }
            onClick={() => addPin()}
          >
            <ol className="pins">
              {pinArray.length
                ? pinArray.map((item: PinProps, index: number) => {
                    const [x, y, text] = [
                      item?.x ?? 0,
                      item?.y ?? 0,
                      item?.text ?? ''
                    ]

                    return (
                      <li
                        key={x * y}
                        id={`${index}_${x}_${y}`}
                        style={{
                          top: y - 20,
                          left: x - 15
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="pins__close"
                          onClick={() => removePin(index)}
                          tabIndex={-1}
                        />
                        <textarea
                          value={text}
                          className={
                            checkText(text)
                              ? 'pins__textarea _blank'
                              : 'pins__textarea'
                          }
                          placeholder={texts.alert}
                          onChange={(e) => addPinText(e, item, index)}
                          onBlur={(e) => addPinText(e, item, index)}
                          autoFocus={true}
                        />
                      </li>
                    )
                  })
                : null}
            </ol>
          </div>
        ) : (
          <Retry />
        )}
      </div>

      {pinArray.length ? (
        <div
          className={
            isOpen
              ? 'pins__text-list__wrapper isOpen'
              : 'pins__text-list__wrapper'
          }
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={1}
          />
          <ol className="pins__text-list">
            {pinArray.map((item: PinProps, index: number) => {
              const [x, y, text] = [
                item?.x ?? 0,
                item?.y ?? 0,
                item?.text ?? ''
              ]

              return (
                <li key={x * y}>
                  <a
                    href={`#${index}_${x}_${y}`}
                    className="pins__text-list__number"
                    onClick={(e) => scrollPosition(e, y)}
                    tabIndex={-1}
                  />
                  <button onClick={() => removePin(index)} tabIndex={-1} />
                  <textarea
                    value={text}
                    placeholder={texts.alert}
                    onChange={(e) => addPinText(e, item, index)}
                    onBlur={(e) => addPinText(e, item, index)}
                    className={checkText(text) ? '_blank' : undefined}
                  />
                </li>
              )
            })}
          </ol>
        </div>
      ) : null}
      <input type="submit" value="これで指示を出す" />

      {/* テキスト未入力の場合はダイアログを表示 */}
      {!!isDialogOpen && (
        <Dialog onClickClose={onClickClose} alert={texts.alert} />
      )}
    </form>
  )
}

// ===============================
// @Styled
// ===============================
export default styled(View)`
  .images {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      z-index: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #000;
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover {
      &::before {
        opacity: 0.1;
      }
    }
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
      &::after {
        content: '';
        display: block;
        width: 100px;
        height: 100px;
        position: absolute;
        top: -35px;
        left: -35px;
        cursor: default;
      }
      &:hover {
        > .pins__textarea {
          opacity: 1;
          visibility: visible;
          transition: 0.3s ease;
        }
        .pins__close {
          opacity: 1;
        }
      }
    }

    &__close {
      position: absolute;
      top: 0;
      right: -30px;
      z-index: 2;
      cursor: pointer;
      opacity: 0;
      transition: 0.3s opacity;
      width: 20px;
      height: 20px;
      &::before,
      &::after {
        content: '';
        width: 2px;
        height: 15px;
        display: block;
        background: ${({ theme }) => theme.colors.black};
        position: absolute;
        top: 0;
        bottom: 0;
      }
      &::before {
        transform: rotate(135deg);
      }
      &::after {
        transform: rotate(-135deg);
      }
    }

    &__textarea {
      position: absolute;
      left: -60px;
      right: 0;
      top: -50px;
      z-index: 2;
      margin: auto;
      opacity: 0;
      transition: 0.5s ease;
      resize: none;
      height: 44px;
      font-size: 1rem;
      &:focus {
        opacity: 1;
      }
    }

    &__text-list {
      counter-reset: item;
      list-style-type: none;
      padding: 20px 40px 20px 20px;
      background: ${({ theme }) => theme.colors.whitesmoke};
      border-radius: 15px 0 0 15px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
      &:hover {
        z-index: 0;
      }
      > li {
        /* padding-left: 1em; */
        position: relative;
        padding: 0 2em;
        display: block;
        min-height: 2em;
        white-space: pre;

        + li {
          margin-top: 1em;
        }

        .pins__text-list__number {
          &::before {
            counter-increment: item;
            content: counter(item);
            position: absolute;
            left: -10px;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${({ theme }) => theme.colors.red};
            color: #fff;
            font-weight: bold;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: 0.3s background;
          }
          &:hover {
            &::before {
              background: ${({ theme }) => theme.colors.green};
            }
          }
        }

        textarea {
          width: 100%;
          font-size: 1.2rem;
          min-height: 4em;
        }
        button {
          position: absolute;
          top: 40px;
          left: -2px;
          z-index: 2;
          cursor: pointer;
          transition: 0.3s opacity;
          width: 20px;
          height: 20px;
          opacity: 0.2;
          &:hover {
            opacity: 1;
          }
          &::before,
          &::after {
            content: '';
            width: 2px;
            height: 15px;
            display: block;
            background: ${({ theme }) => theme.colors.black};
            position: absolute;
            top: 0;
            bottom: 0;
          }
          &::before {
            transform: rotate(135deg);
          }
          &::after {
            transform: rotate(-135deg);
          }
        }
      }
      &__wrapper {
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
      }
    }
  }
  input[type='submit'] {
    background: ${({ theme }) => theme.colors.green};
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 6px;
    padding: 0.5rem;
    transition: 0.3s;
    max-width: 700px;
    width: 100%;
    margin: 2em auto 0;
    display: block;
    font-size: 1.4rem;
    &:hover,
    &:focus {
      background: ${({ theme }) => theme.colors.blue4};
    }
  }
  textarea {
    border-radius: 6px;
    border: 2px solid ${({ theme }) => theme.colors.green};
    padding: 0.5em;
    outline: none;
    &._blank {
      border-color: ${({ theme }) => theme.colors.red};
    }
    :focus,
    :active {
      border-color: ${({ theme }) => theme.colors.green};
    }
  }
`
