import styled from 'styled-components'

const normalSize = '40px'
// const normalSize = '38px'
const normalSizeOrg = '38px'
export const miniSize = '30px'
// const miniSize = '28px'
const miniSizeOrg = '28px'

// const mobileMaxWidth = '767px'
// const miniSizeMobile = '30px'
// @media (max-width: ${mobileMaxWidth}) {
//   width: ${miniSizeMobile};
//   height: ${miniSizeMobile};
// }

export const Image = styled.img`
  width: ${() => `${normalSize}`};
  height: ${() => `${normalSize}`};

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};
  `}

  ${({ org, mini }) => org && `
    width: ${mini ? miniSizeOrg : normalSizeOrg};
    height: ${mini ? miniSizeOrg : normalSizeOrg};
  `}
`

// @media (max-width: ${mobileMaxWidth}) {
//   width: ${miniSizeMobile};
//   height: ${miniSizeMobile};
// }
export const ItemIconContainer = styled.div`
  position: relative;
  width: ${() => `${normalSize}`};
  height: ${() => `${normalSize}`};
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  /*background-color: #222;*/

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};
  `}

  ${p => p.border && `
    border: 1px solid #333;
  `}
`

// @media (max-width: ${mobileMaxWidth}) {
//   width: ${miniSizeMobile};
//   height: ${miniSizeMobile};
// }
export const IconContainer = styled(ItemIconContainer)`
  // box-shadow: inset -2px 10px 74px 0px rgba(0,0,0,0.2);
  // border: 1px solid #333;

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};
  `}
`

export const OrgIconContainer = styled(IconContainer)`
  border: 1px solid #333;
  background-color: #222;
  // box-shadow: none;
  // box-shadow: inset -2px 10px 74px 0px rgba(0,0,0,0.2);
`

export const CharIconContainer = styled(IconContainer)`
  object-fit: contain;
  width: 80px;
  height: 80px;
  border: 1px solid #333;

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};
  `}
`

const getMarkColor = type => {
  switch (type) {
    case 't2':
      return '#9E6002'
    case 't3':
      return '#9F3A02'
    case 'frac':
      return '#11470B'
    default:
      return ''
  }
}

export const MarkTriangle = styled.span`
  position: absolute;
  top: -6px;
  left: -6px;
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border-width: 6px;
  border-color: transparent;
  border-bottom-style: solid;
  transform: rotate(-45deg);

  border-bottom-color: ${p => getMarkColor(p.type)};
`

export const MarkCont = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
`

export const MarkLine = styled.div`
  position: absolute;
  left: 0;
  width: 0.5px;
  height: 2.5px;
  background-color: white;
`

export const MarkFrac = styled.div`
  position: absolute;
  left: 1.5px;
  top: 1.5px;
  width: 2px;
  height: 2px;
  border-width: 0.5px;
  border-color: #D1DCD0;
  border-style: solid;
  transform: rotate(-45deg);
`
