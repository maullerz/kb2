import styled from 'styled-components'

export const Time = styled.span`
  color: #888;
`

export const CharName = styled.span`
  color: gold;

  a {
    color: gold;
  }

  a:hover, a:active {
    text-decoration: underline;
  }
`

export const ShipName = styled.span`
  color: #888;
`

export const Sum = styled.div`
  color: #42aff0;
`

export const EntityName = styled.div`
  color: white;

  ${p => p.nowrap && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

export const MultilineCell = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  ${p => p.alignRight && `
    align-items: flex-end;
  `}

  @media (min-width: 728px) {
    padding: 3px 0;
  }
`

export const SystemName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-size: 12px;
  }
`
