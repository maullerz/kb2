import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  line-height: 20px;
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
  min-width: 120px;

  @media (max-width: 480px) {
    min-width: 100px;
  }
`
