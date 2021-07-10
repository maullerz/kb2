import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 0 auto;

  h4 {
    padding-left: 10px;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  padding-right: 15px;
  border-bottom: 1px solid #333;
`

export const CorpsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  color: #888;
`

export const IconNameWrapper = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 10px;
  }
`
