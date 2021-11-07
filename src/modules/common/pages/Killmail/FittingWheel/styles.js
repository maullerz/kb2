import styled from 'styled-components'

// TODO: one additional step for such dimentions
// Wheel and Summary together on row, but Attackers already at bottom
export const Root = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  min-width: 400px;
  min-height: 400px;
  // max-width: 320px;
  // max-height: 320px;
  // min-width: 320px;
  // min-height: 320px;
  display: flex;
  margin: auto;

  @media (min-width: 1024px) and (max-width: 1180px) {
    max-width: 320px;
    max-height: 320px;
    min-width: 320px;
    min-height: 320px;
    padding-top: 30px;
    margin: initial;
  }

  @media (max-width: 399px) {
    max-width: 375px;
    max-height: 375px;
    min-width: 375px;
    min-height: 375px;
  }

  @media (max-width: 374px) {
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
export const Views = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 12px;
  display: flex;

  @media (max-width: 399px) {
    margin-right: 10px;
  }

  > div {
    color: #888;
    margin-right: 5px;
  }
`
