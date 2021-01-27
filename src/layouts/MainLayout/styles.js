import styled from 'styled-components'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: hidden;
`

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1 0;
  display: flex;
`

export const Workspace = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--mainLayoutWorkspaceBackground);
  overflow-x: hidden;
  overflow-y: auto;
`

export const Content = styled.div`
  position: relative;
  flex: 1 0;
  min-height: 0;
  padding: 0 36px;
`

export const FlexContainer = styled.div`
  display: flex;
`
