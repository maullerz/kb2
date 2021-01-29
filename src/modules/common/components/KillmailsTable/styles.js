import styled from 'styled-components'

export const Time = styled.div`
  color: #888;
`

export const CharName = styled.div`
  color: gold;
`

export const MultilineCell = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 728px) {
    padding: 3px 0;
  }
`
