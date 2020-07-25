import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  text: string
  open?: boolean
}

// ===============================
// @Component
// ===============================
const View: React.FC<Props> = ({ className, text, open = false }) => {
  const [isOpen, setIsOpen] = React.useState(open)

  const handleToggle: () => void = () => setIsOpen(!isOpen)

  return (
    <dl className={isOpen ? className + ' is-open' : className}>
      <dt onClick={handleToggle} />
      <dd>{text}</dd>
    </dl>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
}

// ===============================
// @Styled
// ===============================
export default styled(View)`
  width: 100%;
  dt {
    cursor: pointer;
    position: relative;
    transition: 0.5s ease;
    transform-origin: background, transform;
    border-radius: 20px;
    height: 30px;
    margin-bottom: 10px;
    &:hover {
      background: #ddd;
    }
    &::before,
    &::after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 2px;
      background: ${({ theme }) => theme.colors.gray};
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      transition: transform 0.3s ease;
    }
    &::before {
      left: -5px;
      transform: rotate(30deg);
    }
    &::after {
      right: -5px;
      transform: rotate(-30deg);
    }
  }
  dd {
    display: none;
  }
  &.is-open {
    dt {
      &::before {
        transform: rotate(-30deg);
      }
      &::after {
        transform: rotate(30deg);
      }
    }
    dd {
      display: block;
    }
  }
`
