import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 220px;
  max-width: 220px;
  padding: 5px;
  border-radius: 4px;
  background-color: var(--mainLayoutWorkspaceBackground);

  a, a:hover {
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    min-width: 260px;
    max-width: 260px;
  }
`

export const Header = styled.div`
  margin: 6px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
`

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;

  :hover {
    background-color: var(--tableHeaderBackground);
  }

  ${p => p.isLost && `
    background-color: #480000;
  `}
`

export const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Total = styled.div`
  color: white;
`

export const Name = styled.div`
  margin-left: 6px;
  padding-right: 10px;
  word-break: break-word;
`

export const GreyColor = styled.div`
  color: grey;
`
