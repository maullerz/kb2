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
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  align-items: center;
  padding-left: ${p => (p.checkable ? '11px' : '24px')};
  font-family: Graphik LC;
  font-style: normal;
  font-weight: 600;
  line-height: 138.5%;
  color: var(--tableHeadColor);

  ${p => (p.isSubtable ? `
    height: 36px;
    font-size: 11px;
    border-bottom: 1px solid rgba(239, 242, 247, 0.38);
  ` : `
    height: 48px;
    font-size: 13px;
    background: var(--tableHeaderBackground);
    border-radius: 4px;
  `)};
`

export const HeadCell = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ highlighted }) => highlighted && `
    height: 100%;
    background-color: rgba(115, 119, 140, 0.2);
  `}

  > div > svg {
    margin-left: 5px;
  }
`

export const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  ${p => (p.isSubtable ? `
    > div:not(:last-child) {
      border-bottom: 1px solid var(--tableBorder);
    }
  ` : `
    margin-bottom: 16px;
    > div {
      border-bottom: 1px solid var(--tableBorder);
    }
  `)};
`

export const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 24px;
  padding-left: ${p => (p.checkable ? '10px' : '24px')};
  cursor: pointer;
  font-family: Graphik LC;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 138.5%;
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
  padding-right: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ highlighted }) => highlighted && `
    display: flex;
    align-items: center;
    height: 100%;
    background-color: rgba(115, 119, 140, 0.2);
  `}
`

export const CheckableHeadCell = styled(HeadCell)`
  min-width: 36px;
  padding: 0;
  margin-right: 20px;
`

export const CheckableCell = styled(Cell)`
  min-width: 36px;
  padding: 0;
  margin-right: 20px;
`
