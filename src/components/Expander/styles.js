import styled from 'styled-components'

export const Header = styled.h4`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0 10px;
  border-radius: 4px;

  &:hover {
    background: var(--tableHeaderBackground);

    > span {
      border-top: 1px solid #888;
    }
  }

  ${p => p.backgroundColor && `
    background-color: ${p.backgroundColor};
  `}

  ${p => p.marginBottom && `
    margin-bottom: ${p.marginBottom};
  `}
`

export const Line = styled.span`
  display: flex;
  margin: 0 10px;
  width: 6%;
  flex-grow: 1;
  border-top: 1px solid #333;

  ${p => p.lineColor && `
    border-top: 1px solid ${p.lineColor};
  `}
`
