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
  min-width: 110px;

  @media (max-width: 400px) {
    min-width: 100px;
  }
`
