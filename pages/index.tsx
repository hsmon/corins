import React from 'react'
import { Input } from 'smarthr-ui'
import styled from 'styled-components'
import PropTypes from 'prop-types'

interface Props {
  className?: string
}

const View: React.FC<Props> = ({ className }) => {
  const [url, setUrl] = React.useState('')

  const handleChange: ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback(
    ({ target }) => {
      switch (target.name) {
        case 'url':
          setUrl(target.value)
          break
      }
    },
    []
  )

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault()
    console.log(url)
    // TODO urlを送信
  }

  // TODO バリデーションチェック

  return (
    <div className={className}>
      <h1>修正指示を出したいページのURLを教えて下さい ✏️</h1>
      <form method="post" onSubmit={handleSubmit}>
        <Input
          type="url"
          name="url"
          value={url}
          onChange={handleChange}
          error={false}
        />
        <input type="submit" value="このURLで指示する" />
      </form>
    </div>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(View)`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 5rem;
  }
  input {
    width: 60%;
    display: block;
    margin: 0 auto 5rem;
    border-width: 4px;
    font-size: 1.4rem;

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
`
