import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  onClickClose: () => void
  alert: string
}

// ===============================
// @Component
// ===============================

const View: React.FC<Props> = ({ className, onClickClose, alert }) => {
  return (
    <div className={className}>
      <div className="wrapper">
        <div className="conts">
          <p>{alert}</p>
          <button onClick={onClickClose}>閉じる</button>
        </div>
      </div>
    </div>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired
}

// ===============================
// @Styled
// ===============================

export default styled(View)`
  padding: 3em;
  text-align: center;
  .wrapper {
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s ease;
  }
  .conts {
    position: relative;
    z-index: 101;
    background: #fff;
    max-width: 500px;
    position: relative;
    margin: 0 auto;
    padding: 5em 2em;
    border-radius: 10px;
    @media screen and (max-width: ${({ theme }) => theme.responsive.large}) {
      max-width: 760px;
    }
    @media screen and (max-width: ${({ theme }) => theme.responsive.small}) {
      padding: 2.5em ${({ theme }) => theme.sideSpace.small};
    }
  }
  p {
    font-size: 1.2rem;
  }
  button {
    background: #008c92;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 6px;
    padding: 0.5rem;
    width: 100%;
    margin: 2em auto 0;
    display: block;
    font-size: 1rem;
  }
`
