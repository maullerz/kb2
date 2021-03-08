import styled from 'styled-components'

export const Root = styled.div`
  flex: 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #333;
  background-color: rgba(0,255,0,0.1);

  @media (max-width: 767px) {
    padding: 5px;
  }

  a {
    color: white;
  }

  ${p => p.destroyed && `
    /*color: #480000;*/
    background-color: rgba(255, 0, 0, 0.1);
    background-color: transparent;

    .digits {
      /*color: #480000;*/
      color: #888;
    }
  `}

  ${p => p.subItem && `
    padding-left: 20px;

    span {
      margin-right: 20px;
    }
  `}
`

export const Name = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /*flex: 1 1;*/
  padding-left: 10px;
  text-align: left;

  @media (max-width: 767px) { padding-left: 5px; }
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
  }§
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
// .billions, .trillions {
//   font-weight: 900;
// }
