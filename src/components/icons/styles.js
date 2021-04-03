import styled from 'styled-components'

const mobileMaxWidth = '767px'

// const normalSize = '32px'
const normalSize = '40px'
const miniSize = '30px'
const miniSizeMobile = '24px'

export const Image = styled.img`
  width: ${() => `${normalSize}`};

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};

    @media (max-width: ${mobileMaxWidth}) {
      width: ${miniSizeMobile};
      height: ${miniSizeMobile};
    }
  `}
`

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

    @media (max-width: ${mobileMaxWidth}) {
      width: ${miniSizeMobile};
      height: ${miniSizeMobile};
    }
  `}
`

export const IconContainer = styled(ItemIconContainer)`
  // box-shadow: inset -2px 10px 74px 0px rgba(0,0,0,0.2);
  // border: 1px solid #333;

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};

    @media (max-width: ${mobileMaxWidth}) {
      width: ${miniSizeMobile};
      height: ${miniSizeMobile};
    }
  `}
`

export const OrgIconContainer = styled(IconContainer)`
  // border: 1px solid transparent;
  // box-shadow: none;
`

export const CharIconContainer = styled(IconContainer)`
  object-fit: contain;
  width: 80px;
  height: 80px;

  ${p => p.corpBorder && `
    border: 1px solid #333;
  `}
`
