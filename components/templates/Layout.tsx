import Header from '~/components/organisms/Header'
import styled from 'styled-components'
import PropTypes from 'prop-types'

interface Props {
  className?: string
}

const View: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <Header />
      <div className={props.className}>{props.children}</div>
    </>
  )
}

View.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(View)`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  position: relative;
  margin: 0 auto;
  padding: 5em ${({ theme }) => theme.sideSpace.large};
  @media screen and (max-width: ${({ theme }) => theme.responsive.large}) {
    max-width: 760px;
  }
  @media screen and (max-width: ${({ theme }) => theme.responsive.small}) {
    padding: 2.5em ${({ theme }) => theme.sideSpace.small};
  }
`
