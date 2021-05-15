import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  width: 100%;
  // max-width: 400px;
  // max-height: 400px;
  // min-width: 400px;
  // min-height: 400px;
  max-width: 320px;
  max-height: 320px;
  min-width: 320px;
  min-height: 320px;
  display: flex;
  margin: auto;

  @media (max-width: 375px) {
    max-width: 320px;
    max-height: 320px;
    min-width: 320px;
    min-height: 320px;
  }

  > svg {
    width: 100%;
    height: 100%;

    image {
      z-index: 10;
    }
  }
`

export const ZkbLinkCont = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
`
