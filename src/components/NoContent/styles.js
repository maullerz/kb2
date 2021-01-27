import styled from 'styled-components'

import Icon from 'components/Icon'

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 330px;
  margin-top: 24px;
  margin-bottom: 40px;
`

export const Title = styled.div`
  margin-top: 18px;
  margin-bottom: 11px;
  font-family: Graphik LC;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.16px;
  color: rgba(255, 255, 255, 0.87);
`

export const Descr = styled.div`
  font-family: Graphik LC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.16px;
  color: rgba(255, 255, 255, 0.6);
`

export const StyledIcon = styled(Icon)`
  margin-bottom: 8px;

  ${p => !p.custom && `
    transform: scale(1.95);

    svg > path {
      fill: rgba(255, 255, 255, 0.4);
    }
  `};
`
