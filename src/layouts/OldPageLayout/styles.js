import styled from 'styled-components'

export const PageRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--pageLayoutBackground);
  border-radius: 6px;
  color: var(--pageLayoutTextColor);

  padding: 14px 0;

  @media (min-width: 728px) {
    padding: 28px;
  }

  @media (min-width: 1024px) {
    padding: 28px 40px;
  }
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
