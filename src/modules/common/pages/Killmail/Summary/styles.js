import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  padding-bottom: 20px;
  /*background-color: grey;*/
`

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  /*justify-content: space-between;*/
  margin-bottom: 10px;
`

export const CharName = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 25px;
  border-top: 1px solid #333;

  span:first-child {
    font-size: 14px;
    font-weight: bold;
    color: gold;
    // text-align: center;
    border-bottom: 1px solid #333;
  }
`

export const HeadIcons = styled.div`
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid #333;
`

export const CorpAllyGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 2px;
  max-width: 300px;
`

export const Label = styled.div`
  font-weight: bold;
  min-width: 111px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #333;

  > div:last-child {
    width: 100%;
    /*text-align: right;*/
  }
`

export const IconRow = styled.div`
  display: flex;
  align-items: center;

  > div:last-child {
    margin-left: 10px;
  }
`
