import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1180px;
  min-height: 600px;
  margin: auto;
  padding-bottom: 400px;
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
`

export const Center = styled.div`
  display: flex;
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
  margin: auto;
`

export const Items = styled.div`
  /*min-width: 365px;*/
  /*min-height: 500px;*/
  display: flex;

  @media (max-width: 768px) {

  }
`

export const Attackers = styled.div`
  min-height: 500px;
  flex: 1 1;
  display: flex;
  background: #000;
`
