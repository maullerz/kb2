import styled from 'styled-components'

export const TableRoot = styled.div`
  position: relative;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Head = styled.div`
  position: relative;
  height: 48px;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  align-items: center;
  padding: 0 5px;

  font-family: Verdana;
  font-size: 12px;
  font-weight: 400;
  @media (min-width: 728px) {
    font-size: 14px;
    font-weight: 600;
  }
  font-style: normal;
  line-height: 120%;
  color: var(--tableHeadColor);
  background: var(--tableHeaderBackground);
  border: 1px solid var(--tableHeaderBackground);
  border-radius: 4px;
`

export const HeadCell = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  // overflow: hidden;

  ${({ highlighted }) => highlighted && `
    height: 100%;
    background-color: rgba(115, 119, 140, 0.2);
  `}

  > div > svg {
    margin-left: 5px;
  }

  &:not(:first-child) {
    padding: 0 0 0 3px;
  }
  @media (min-width: 728px) {
    padding: 0 5px;
  }
`

export const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  > div {
    border-bottom: 1px solid var(--tableBorder);
  }
`

export const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  // height: 48px;
  height: 52px;
  padding: 0 5px;

  font-family: Verdana;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  @media (min-width: 728px) {
    font-size: 14px;
  }
  line-height: 120%;
  color: var(--tableRowTextColor);
  border: 1px solid transparent;

  :hover {
    background: rgba(150, 206, 246, 0.15);
    border: 1px solid #96CEF6;
    border-radius: 4px;
  }
`

export const Cell = styled.div`
  position: relative;
  min-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ highlighted }) => highlighted && `
    display: flex;
    align-items: center;
    height: 100%;
    background-color: rgba(115, 119, 140, 0.2);
  `}

  &:not(:first-child) {
    padding: 0 0 0 5px;
  }
  @media (min-width: 728px) {
    padding: 0 5px;
  }
`
