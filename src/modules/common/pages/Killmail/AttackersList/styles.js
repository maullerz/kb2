import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
`

export const ListItem = styled.div`
  width: 100%;
  display: flex;
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

export const TopChar = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0 0;
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

export const TopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 5px;
  padding: 5px 0;
  background-color: #222;
`

export const TopPilotRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;

  > div:first-child {
    margin-bottom: 6px;
  }

  > div:last-child {
    margin-top: 6px;
  }
`

export const ExpandBtn = styled.div`
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
