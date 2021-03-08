import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 0 auto;

  h4 {
    padding-left: 10px;
  }

  @media (max-width: 767px) {
    padding: 5px 0;
  }
`

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #181818;

  @media (max-width: 767px) {
    padding: 5px;
  }
`

export const Char = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0;
`

export const IconsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 2px;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    justify-content: space-between;
    max-height: 70px;

    @media (max-width: 374px) {
      display: none;
    }
  }
`

export const Names = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px;
  font-size: 12px;

  @media (max-width: 767px) {
    margin: 0 5px;
  }

  > div {
    color: grey;
  }

  > div:first-child {
    color: gold;
    /*font-size: 14px;*/
  }
`

export const ShipName = styled.div`
  color: #555;
  > span {
    white-space: nowrap;
  }
`

export const CorpAllyIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const DmgCol = styled.div`
  max-width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*justify-content: flex-start;*/
  text-align: right;
`

export const DmgDigits = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`

export const DmgPerc = styled.div`
  font-size: 12px;
  color: grey;
`
