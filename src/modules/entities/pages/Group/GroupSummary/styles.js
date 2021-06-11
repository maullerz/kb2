import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #333;

  > div {
    color: #888;
  }

  > div:last-child {
    width: 100%;
  }
`

export const Label = styled.div`
  font-weight: bold;
  min-width: 70px;

  @media (max-width: 400px) {
    min-width: 60px;
  }
`

export const ItemCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  // padding: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  font-size: 12px;
  text-align: center;

  ${p => p.isDesktop && `
    width: 100px;
    max-width: 100px;
    height: 80px;
    max-height: 80px;
    overflow: hidden;
  `}
`
