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

export const HeadBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

export const Center = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

export const Content = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  padding-right: 20px;
`

export const Stats = styled.div`
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
