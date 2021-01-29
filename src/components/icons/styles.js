import styled from 'styled-components'

// const normalSize = '32px'
const normalSize = '40px'

export const Image = styled.img`
  width: ${() => `${normalSize}`};

  ${p => p.mini && `
    width: 24px;
    height: 24px;
  `}
`

export const IconContainer = styled.div`
  width: ${() => `${normalSize}`};
  height: ${() => `${normalSize}`};
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  /*background-color: #222;*/
  box-shadow: inset -2px 10px 74px 0px rgba(0,0,0,0.2);
  border: 1px solid #333;
  /*border-radius: 4px;*/

  ${p => p.mini && `
    width: 24px;
    height: 24px;
  `}
`

export const OrgIconContainer = styled(IconContainer)`
  // border: 1px solid transparent;
  // box-shadow: none;
`
