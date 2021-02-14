import Header from '~/components/organisms/Header'
import styled from 'styled-components'

interface Props {
  className?: string
}

const View: React.FC<Props> = ({ className, children }) => {
  return (
    <>
      <Header />
      <div className={className}>{children}</div>
    </>
  )
}

export default styled(View)`
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  position: relative;
  margin: 0 auto;
  min-width: 1200px;
  padding: 5em 0;
  @media screen and (max-width: ${({ theme }) => theme.responsive.large}) {
    max-width: 760px;
  }
  @media screen and (max-width: ${({ theme }) => theme.responsive.small}) {
    padding: 2.5em ${({ theme }) => theme.sideSpace.small};
  }
`
