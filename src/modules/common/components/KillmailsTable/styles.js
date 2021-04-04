import styled from 'styled-components'

export const Time = styled.div`
  color: #888;
`

export const EntityName = styled.div`
  // color: gold;
  color: #42aff0;
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
