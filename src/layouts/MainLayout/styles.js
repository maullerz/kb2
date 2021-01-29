import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 1100px;
  // height: 100%;
  // overflow: hidden;

  background-color: var(--mainLayoutWorkspaceBackground);

  @media (min-width: 728px) {
    // background-image: url(https://c.wallhere.com/photos/16/e7/EVE_Online_Caldari_video_games_space_spaceship_science_fiction-111684.jpg!d);
    background-image: url(https://img.wallpapersafari.com/desktop/1920/1080/85/51/zropc9.jpg);
    background-size: cover;
    background-attachment: fixed;
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
    padding: 36px;
  }
`

export const FlexContainer = styled.div`
  display: flex;
`
