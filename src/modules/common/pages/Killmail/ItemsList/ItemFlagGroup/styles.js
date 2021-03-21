import styled from 'styled-components'

export const ItemGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const ItemGroupTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 10px 8px;
  border-bottom: 1px solid #333;

  @media (max-width: 767px) {
    padding: 24px 5px 8px;
  }

  h4 {
    margin: 0;
  }

  div {
    font-size: 12px;
    color: #888;
  }
`
