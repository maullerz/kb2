import styled from 'styled-components'

export const Title = styled.h1`
  margin: 0;
  font-family: Verdana;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: #FFFFFF;
  white-space: nowrap;
  text-transform: none;
`

export const Content = styled.div`

  @media (max-width: 1023px) {
    padding: 0 16px;
  }

`

export const Subheader = styled.div`
  margin-top: 16px;
  padding-bottom: 6px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #333;
`

export const Paragraph = styled.p`
  font-size: 14px;
`

export const DivParagraph = styled.div`
  font-size: 14px;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  // border-bottom: 1px solid #333;

  > span:first-child {
    color: #888;
  }

  > span:last-child {
    margin-left: 6px;
  }
`

export const CcpStoreWrapper = styled.p`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 420px;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #aaa;
`
