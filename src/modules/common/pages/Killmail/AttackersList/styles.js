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
`

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  // justify-content: space-between;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #181818;

  @media (max-width: 767px) {
    padding: 5px;
  }

  ${p => p.finalBlow && `
    border: 1px solid gold;
  `}
`

export const Char = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0;

  > :first-child {
    @media (max-width: 374px) {
      display: none;
    }
  }
`

export const IconsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: space-between;
  // max-height: 70px;
  margin-left: 2px;
`

export const Names = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 7px;
  font-size: 12px;
  flex-grow: 1;
  flex-basis: 100%;
`

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`

export const ShipName = styled.div`
  color: #555;
  > span {
    white-space: nowrap;
  }
`

export const AllyName = styled.div`
  color: #ccc;
`

export const CorpAllyIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > a:last-child {
    margin-left: 2px;
  }
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
  font-size: 14px;
`

export const DmgPerc = styled.div`
  margin-top: 3px;
  font-size: 12px;
  color: grey;
`

export const Expander = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 48px;
  padding-left: 10px;
  background-color: #333;

  color: #888;
  text-align: left;
  font-size: 14px;
  user-select: none;

  > span {
    margin-right: 6px;
  }

  &:hover {
    background-color: #555;
  }
  &:active, &:focus {
    background-color: #777;
  }
`
