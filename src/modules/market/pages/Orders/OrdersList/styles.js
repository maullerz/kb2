import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: 20px;

  tbody tr td {
    max-width: 200px;
    padding: 2px 6px;
  }

  tbody tr:hover {
    background: #333;
  }
`
