import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  /*max-width: 600px;*/
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 20px;

  @media (max-width: 767px) { padding: 0; }
`
export const Header = styled.h4`
  cursor: pointer;
  height: 40px;
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
  }
`

export const ItemGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 14px;
    text-align: center;
    margin: 0;
    padding: 18px 0;
    border-bottom: 1px solid #333;
  }
`

export const Digits = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: right;
  font-size: 12px;

  @media (max-width: 767px) {
    .sum {
      min-width: 70px;
    }
  }
`

export const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 70px;
`

export const Sum = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 120px;
`
