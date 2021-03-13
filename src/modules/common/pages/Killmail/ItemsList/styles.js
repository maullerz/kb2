import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  /*max-width: 600px;*/
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;

  @media (max-width: 767px) { padding: 10px 0; }
`
export const Header = styled.h4`
  cursor: pointer;
  height: 40px;
  margin-bottom: 0;
  padding: 0 10px;
  display: flex;
  align-items: center;

  &:hover {
    background: #000a;
  }
`

export const SortHeader = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: #000a;
  color: grey;

  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`

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

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50%;
  padding-right: 10px;

  @media (max-width: 767px) {
    padding-left: 30%;
    padding-right: 5px;
  }

  h4 {
    margin: 5px 0;
  }
`
