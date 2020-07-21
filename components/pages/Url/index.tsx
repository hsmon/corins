import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addUrlStateValue } from '~/redux/urls/actions'
import { AddUrlProps } from '~/redux/urls/reducer'

interface Props {
  className?: string
}

const View: React.FC<Props> = (props) => {
  const [src, setUrl] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [monitorSize, setMonitorSize] = React.useState('PC')
  const dispatch = useDispatch()

  const handleChange: ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback(
    ({ target }) => {
      switch (target.name) {
        case 'url':
          setUrl(target.value)
          break
        case 'username':
          setUsername(target.value)
          break
        case 'password':
          setPassword(target.value)
          break
        case 'monitor':
          setMonitorSize(target.value)
          break
      }
    },
    []
  )

  const handleCheck: () => void = () => setChecked(!checked)

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault()
    const urlStatus: AddUrlProps = checked
      ? { src, monitorSize, username, password }
      : { src, monitorSize }
    dispatch(addUrlStateValue(urlStatus))
  }

  return (
    <form className={props.className} method="post" onSubmit={handleSubmit}>
      <input
        type="url"
        name="url"
        value={src}
        onChange={handleChange}
        autoFocus={true}
      />
      <p className="radio">
        <span>サイズを選択してください</span>
        <input
          type="radio"
          name="monitor"
          value="PC"
          id="radio_1"
          onChange={handleChange}
        />
        <label htmlFor="radio_1">PC（パソコン）</label>
        <input
          type="radio"
          name="monitor"
          value="TB"
          id="radio_2"
          onChange={handleChange}
        />
        <label htmlFor="radio_2">TB（タブレット）</label>
        <input
          type="radio"
          name="monitor"
          value="SP"
          id="radio_3"
          onChange={handleChange}
        />
        <label htmlFor="radio_3">SP（スマートフォン）</label>
      </p>
      <p className="checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          id="check"
        />
        <label htmlFor="check">
          Basic認証が必要な場合はチェックをいれてください
        </label>
        {checked && (
          <>
            <p className="checkbox__element">
              <span>ユーザー名</span>
              <input
                type="text"
                className="sub"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </p>
            <p className="checkbox__element">
              <span>パスワード</span>
              <input
                type="password"
                className="sub"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </p>
          </>
        )}
      </p>
      <input type="submit" value="このURLで指示する" />
    </form>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(View)`
  input:not([type='checkbox']):not([type='radio']) {
    width: 70%;
    display: block;
    margin: 0 auto 1rem;
    border-width: 4px;
    font-size: 1.4rem;
    padding: 0.75em;
    &[type='submit'] {
      background: ${({ theme }) => theme.colors.green};
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      border-radius: 6px;
      padding: 0.5rem;
      transition: 0.5s;
      &:hover,
      &:focus {
        background: ${({ theme }) => theme.colors.blue4};
      }
    }
  }
  input {
    &[type='url'] {
      border: solid ${({ theme }) => theme.colors.green};
      border-radius: 6px;
      transition: border 0.2s;
      &:focus {
        border: 4px solid ${({ theme }) => theme.colors.blue2};
      }
    }
    &[type='radio'] {
      appearance: radio;
      cursor: pointer;
    }
    &[type='checkbox'] {
      appearance: checkbox;
      cursor: pointer;
    }
  }
  .radio {
    display: block;
    margin: 2em 0 4em;
    text-align: center;
    span {
      display: block;
      font-weight: bold;
      margin: 0 0 1em;
    }
    label {
      cursor: pointer;
    }
  }
  .checkbox {
    display: block;
    text-align: center;

    &__element {
      display: block;

      & + & {
        margin-top: 1em;
      }
    }

    .sub {
      margin: 0 auto;
      font-size: 16px;
      border: solid #d6d6d6;
      border-radius: 6px;
    }
    label {
      cursor: pointer;

      + p {
        margin-top: 1em;
      }
    }

    + input[type='submit'] {
      margin-top: 2em;
    }
  }
`
