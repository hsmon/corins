import React from 'react'
import { Dialog } from 'smarthr-ui'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
  isOpen: boolean
  onClickClose: () => void
  alert: string
}

// ===============================
// @Component
// ===============================

const View: React.FC<Props> = ({ className, isOpen, onClickClose, alert }) => {
  return (
    <div className={className}>
      <Dialog isOpen={isOpen} onClickOverlay={onClickClose}>
        <p>{alert}</p>
        <button onClick={onClickClose}>閉じる</button>
      </Dialog>
    </div>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClickClose: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired
}

// ===============================
// @Styled
// ===============================

export default styled(View)`
  padding: 3em;
  text-align: center;
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
