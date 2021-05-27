import styled from 'styled-components'

// const normalSize = '32px'
const normalSize = '40px'
const normalSizeOrg = '38px'
const miniSize = '30px'
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

  ${p => p.org && `
    width: ${normalSizeOrg};
    height: ${normalSizeOrg};

    ${({ mini }) => mini && `
      width: ${miniSizeOrg};
      height: ${miniSizeOrg};
    `}
  `}
`

// @media (max-width: ${mobileMaxWidth}) {
//   width: ${miniSizeMobile};
//   height: ${miniSizeMobile};
// }
export const ItemIconContainer = styled.div`
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

  ${p => p.corpBorder && `
    border: 1px solid #333;
  `}
`
