import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  // height: 1100px;
  // height: 100%;
  // overflow: hidden;

  // background-color: var(--mainLayoutWorkspaceBackground);

  @media (min-width: 728px) {
    // background-image: url(/img/background.jpg);
    background-image: url(/img/bg.jpg);
    background-size: cover;
    background-attachment: fixed;
  }

  .makeStyles-root-1, .makeStyles-root-2 {
    right: 32px;
    bottom: 32px;
  }

  @media (max-width: 727px) {
    .MuiTypography-h6 {
      font-size: 1rem;
    }
  }
`

export const Wrapper = styled.div`
  position: relative;
  // overflow: hidden;
  flex: 1 0;
  display: flex;
`

export const Workspace = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--mainLayoutWorkspaceBackground);
  // overflow-x: hidden;
  // overflow-y: auto;
`

export const Content = styled.div`
  position: relative;
  flex: 1 0;
  min-height: 0;

  @media (min-width: 728px) {
    padding: 36px 0;
  }
`

export const FlexContainer = styled.div`
  display: flex;
`
