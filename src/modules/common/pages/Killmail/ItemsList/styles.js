import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  /*max-width: 600px;*/
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;

  @media (max-width: 1023px) {
    padding: 0 10px;
  }
`
export const Header = styled.h4`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;

  &:hover {
    background-color: #222a;
  }
`

export const Line = styled.span`
  display: flex;
  margin: 0 14px;
  width: 10%;
  flex-grow: 1;
  border-top: 1px solid #333;
`

export const SortHeader = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #222;
  color: grey;

  // @media (max-width: 767px) { padding: 10px 5px; }

  svg {
    margin-left: 5px;
  }

  &:hover {
    background-color: #222a;
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

export const CountHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 80px;
`

export const SumHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 150px;

  @media (max-width: 767px) {
    min-width: 60px;
  }
`
