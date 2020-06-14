import React from 'react'
import styled from 'styled-components'
import { Input } from 'smarthr-ui'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addUrlStateValue } from '~/redux/urls/actions'
import { AddUrlProps } from '~/redux/urls/reducer'

interface Props {
  className?: string
}

const View: React.FC<Props> = (props) => {
  const [src, setUrl] = React.useState('')
  const dispatch = useDispatch()

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
    const urlStatus: AddUrlProps = { src }
    dispatch(addUrlStateValue(urlStatus))
  }

  return (
    <form className={props.className} method="post" onSubmit={handleSubmit}>
      <Input
        type="url"
        name="url"
        value={src}
        onChange={handleChange}
        autoFocus={true}
      />
      <input type="submit" value="このURLで指示する" />
    </form>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(View)`
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
