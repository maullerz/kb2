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
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-left: 10px;
  border-top: 1px solid #333;
  font-size: 14px;

  @media (max-width: 400px) {
    margin-left: 5px;
    font-size: 12px;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
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
  min-width: 130px;

  @media (max-width: 400px) {
    min-width: 100px;
  }
`

export const ImgRect = styled.div`
  width: 102px;
  height: 102px;
  border: 1px solid #333;
`
