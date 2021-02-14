import React from 'react'
import styled from 'styled-components'

// ===============================
// @Types
// ===============================
interface Props {
  className?: string
}

// ===============================
// @Component
// ===============================

const View: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <h1>404👽</h1>
      <p>ページが見つかりません</p>
    </div>
  )
}

// ===============================
// @Styled
// ===============================
export default styled(View)`
  h1 {
    font-size: 5rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 5rem;
  }
  p {
    text-align: center;
    font-size: 2rem;
  }
`
