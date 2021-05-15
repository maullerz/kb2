import styled from 'styled-components'

export const Root = styled.div`
  flex: 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  background-color: #001600;

  padding: 3px 10px;
  // condensed
  // padding: 0 10px;

  @media (max-width: 767px) {
    padding: 3px 5px;
    // condensed
    // padding: 0 5px;
  }

  ${p => p.destroyed && `
    color: var(--colorRed);
    background-color: rgba(255, 0, 0, 0.1);
    background-color: #060606;
  `}

  ${p => p.subItem && `
    // padding-left: 20px;
    // condensed
    padding-left: 10px;

    span {
      margin-right: 10px;
    }
  `}
`

export const Name = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // padding-left: 16px;
  // condensed
  padding-left: 8px;
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
  min-width: 80px;

  @media (max-width: 767px) {
    min-width: 40px;
  }
`

export const Sum = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 150px;

  @media (max-width: 767px) {
    min-width: 60px;
  }
`
