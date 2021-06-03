import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-bottom: 16px;
  padding: 0 10px;

  @media (max-width: 400px) {
    padding: 0 5px;
  }

  > a {
    font-weight: bold;
    margin-right: 16px;
  }
`
