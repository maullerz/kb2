import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding-bottom: 30px;
  margin-bottom: 60px;

  text-align: center;
  line-height: 20px;
  background-color: var(--mainLayoutWorkspaceBackground);

  div {
    margin-bottom: 10px;
  }

  span {
    margin-right: 5px;
  }
`

export const LegalContainer = styled.div`
  padding: 20px;
`

export const Links = styled.div`
  min-width: 120px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`

export const PartnerLogo = styled.div`
  display: flex;
  width: 320px;
  margin-top: 20px;

  img {
    width: 320px;
  }
`

export const Partners = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  a {
    min-width: 160px;
    height: 50px;
    padding: 0 12px;
  }

  a:hover {
    text-decoration: none;
    background: rgba(150, 206, 246, 0.15);
  }
`

export const UmgImg = styled.img`
  margin-top: 16px;
  height: 18px;
  width: 150px;
`
