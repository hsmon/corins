import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addUrlStateValue } from '~/redux/urls/actions'
import { AddUrlProps } from '~/redux/urls/reducer'
import { useForm } from 'react-hook-form'

interface Props {
  className?: string
}

const View: React.FC<Props> = (props) => {
  const [checked, setChecked] = React.useState(false)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm<AddUrlProps>({
    shouldFocusError: false
  })
  const handleCheck: () => void = () => setChecked(!checked)
  const onSubmit: (data: AddUrlProps) => void = (data) =>
    dispatch(addUrlStateValue(data))

  return (
    <form
      className={props.className}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="url">
        <input
          type="url"
          name="src"
          aria-invalid={errors.src ? 'true' : 'false'}
          ref={register({
            required: 'URLの入力は必須です'
          })}
          autoFocus={true}
          id="url"
        />
        {!!errors.src && <p role="alert">{errors.src.message}</p>}
      </label>

      <p className="radio">
        <span>サイズを選択してください</span>
        <input
          name="monitorSize"
          type="radio"
          value="PC"
          ref={register}
          id="radio_1"
          defaultChecked={true}
          aria-invalid={errors.monitorSize ? 'true' : 'false'}
        />
        <label htmlFor="radio_1">PC（パソコン）</label>
        <input
          name="monitorSize"
          type="radio"
          value="TB"
          ref={register}
          id="radio_2"
          aria-invalid={errors.monitorSize ? 'true' : 'false'}
        />
        <label htmlFor="radio_2">TB（タブレット）</label>
        <input
          name="monitorSize"
          type="radio"
          value="SP"
          ref={register}
          id="radio_3"
          aria-invalid={errors.monitorSize ? 'true' : 'false'}
        />
        <label htmlFor="radio_3">SP（スマートフォン）</label>
      </p>
      <p className="checkbox">
        <input
          type="checkbox"
          defaultChecked={checked}
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
                placeholder="username"
                name="username"
                ref={register}
                className="sub"
              />
            </p>
            <p className="checkbox__element">
              <span>パスワード</span>
              <input
                type="password"
                placeholder="password"
                name="password"
                ref={register}
                className="sub"
              />
            </p>
          </>
        )}
      </p>
      <input type="submit" value="このURLで指示する" />
    </form>
  )
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
  p[role='alert'] {
    width: 70%;
    display: block;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.red};
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
