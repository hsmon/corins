import React from 'react'
import styled from 'styled-components'

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
    <div className={isOpen ? className + ' is-open' : className}>
      <button className="board__button" onClick={handleToggle} />
      <p className="board__text">{text}</p>
    </div>
  )
}

// ===============================
// @Styled
// ===============================
export default styled(View)`
  width: 100%;
  position: relative;

  .board {
    &__button {
      display: inline-block;
      width: 30px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      top: -30px;
      right: -30px;
      &::before,
      &::after {
        content: '';
        display: inline-block;
        width: 10px;
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
        transform: rotate(90deg);
      }
      &::after {
        transform: rotate(0deg);
      }
    }
    &__text {
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
      background: #fff;
      padding: 10px 15px;
      width: 300px;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }

  &.is-open {
    .board__button {
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
    .board__text {
      opacity: 1;
      visibility: visible;
    }
  }
`
