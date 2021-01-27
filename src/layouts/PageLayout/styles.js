import styled from 'styled-components'

const devMode = process.env.NODE_ENV === 'development'

export const PageRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 40px;
  background-color: var(--pageLayoutBackground);
  border-radius: 6px;
  color: var(--pageLayoutTextColor);

  ${() => !devMode && `
    min-width: 1080px;
  `}
`

export const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  min-height: 40px; // height of "Delete Project" button
  font-family: Avenir;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`

export const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: var(--projectTitleColor);
`

export const Header = styled.div`
  margin: 0 0 15px 0;
  padding-bottom: 3px;
  overflow-x: auto;
  overflow-y: hidden;
`

export const Content = styled.div`
  position: relative;
  ${() => !devMode && `
    min-width: 1000px;
  `}
`

export const Footer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
  font-family: Graphik LC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 138.5%;
`
