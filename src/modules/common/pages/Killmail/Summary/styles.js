import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  max-width: 600px;
  min-width: 340px;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  padding-bottom: 20px;
`

export const Head = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 5px 0 5px 5px;
  background-color: #222;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`

export const HeadIcons = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`

export const CorpAllyGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;

  > div {
    margin-bottom: 2px;
  }
`

export const CharName = styled.div`
  font-weight: bold;
  color: gold;
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
  }
`
