import styled from 'styled-components'

export const PageRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // min-height: 100%;
  background-color: var(--pageLayoutBackground);
  border-radius: 6px;
  color: var(--pageLayoutTextColor);

  padding: 14px 0;

  @media (min-width: 768px) {
    padding: 14px;
  }
`

export const AdsBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

  @media (max-width: 1300px) {
    flex-direction: column-reverse;
  }
`

export const Content = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  padding-right: 20px;

  @media (max-width: 1300px) {
    padding-right: 0;
  }
`

export const Stats = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  > div:not(:last-child) {
    margin-right: 0;
    margin-bottom: 20px;
  }

  @media (max-width: 1300px) {
    padding: 10px;
    overflow-y: auto;
    flex-direction: row;
    margin-bottom: 60px;

    > div:not(:last-child) {
      margin-right: 20px;
      margin-bottom: 0;
    }
  }
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

export const EmptyRow = styled.div`
  margin-bottom: 50px;

  ${p => p.small && `
    margin-bottom: 20px;
  `}
`
