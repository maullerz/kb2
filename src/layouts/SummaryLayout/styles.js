import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-bottom: 16px;
  padding: 0 10px;

  @media (max-width: 480px) {
    padding: 0 5px;
  }

  ${p => p.withItems && `
    flex-direction: column;
  `}
`

export const LogosBlock = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 10px;

  > a {
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    margin-left: 5px;

    > a {
      margin-bottom: 5px;
    }
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

export const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin-left: 10px;
  border-top: 1px solid #333;
  font-size: 14px;

  @media (max-width: 480px) {
    margin-left: 5px;
    font-size: 12px;
  }
`

export const LinksBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 0;
  flex-shrink: 1;
  // width: 100%;
  font-size: 14px;

  > a {
    margin-left: 16px;
  }

  @media (max-width: 700px) {
    margin: 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

export const ItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;
  padding: 5px;
  border-bottom: 1px solid #333;

  @media (max-width: 480px) {
    margin-left: 5px;
  }
`
