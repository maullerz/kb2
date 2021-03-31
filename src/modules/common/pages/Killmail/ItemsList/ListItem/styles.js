import styled from 'styled-components'

export const Root = styled.div`
  flex: 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;

  padding: 5px 10px;
  // condensed
  // padding: 0 10px;

  @media (max-width: 767px) {
    padding: 0 5px;
    // condensed
    // padding: 0 5px;
  }

  ${p => p.destroyed && `
    color: var(--colorRed);
    background-color: rgba(255, 0, 0, 0.1);
    background-color: transparent;
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
  padding-left: 16px;
  text-align: left;
  color: var(--colorBlue);

  @media (max-width: 767px) {
    padding-left: 5px;
    font-size: 12px;
  }
`

export const Digits = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: right;
  font-size: 14px;

  @media (max-width: 767px) {
    font-size: 12px;
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
  min-width: 150px;

  @media (max-width: 767px) {
    min-width: 70px;
  }
`

// .billions, .trillions {
//   font-weight: 900;
// }
