import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-bottom: 16px;
  padding: 0 10px;

  @media (max-width: 400px) {
    padding: 0 5px;
  }
`

export const LogosBlock = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 10px;

  > a {
    margin-bottom: 10px;
  }

  @media (max-width: 400px) {
    margin-left: 5px;

    > a {
      margin-bottom: 5px;
    }
  }
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-left: 10px;
  border-top: 1px solid #333;
  font-size: 14px;

  @media (max-width: 400px) {
    margin-left: 5px;
    font-size: 10px;
  }
`
