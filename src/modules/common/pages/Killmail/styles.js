import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  // max-width: 1180px;
  max-width: 1380px;
  min-height: 600px;
  margin: auto;
  padding-bottom: 100px;
  // background: rgba(0,0,0,0.2);
  // background: #000;
`

export const AdsBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: unset;
  /*justify-content: center;*/
  justify-content: space-between;
  width: 100%;
  color: #eee;

  @media (max-width: 1023px) {
    flex-direction: column;
  }

  @media (max-width: 767px) {
    // padding-top: 36px;
    background: rgba(0,0,0,0.2);
  }
`

// TODO: one additional step for such dimentions
// Wheel and Summary together on row, but Attackers already at bottom
export const Center = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
`

export const Top = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    /*max-width: 600px;*/
    margin: 0;
  }
`

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // margin: auto;
`

export const Items = styled.div`
  display: flex;

  @media (max-width: 1023px) {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
`

export const Attackers = styled.div`
  max-width: 430px;
  min-height: 500px;
  flex: 1 1;
  display: flex;
  background: #000;

  @media (max-width: 1023px) {
    width: 100%;
    max-width: none;
    // max-width: 600px;
    // margin: 0 auto;
    background: rgba(0,0,0,0.2);
  }
`
