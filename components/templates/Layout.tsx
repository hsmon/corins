import Header from '~/components/organisms/Header'
import styled from 'styled-components'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  )
}

const Wrapper = styled.div`
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

export default Layout
