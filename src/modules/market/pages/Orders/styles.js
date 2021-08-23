import styled from 'styled-components'

const miniSize = '28px'
const mobileMaxWidth = '767px'
const miniSizeMobile = '30px'

export const Root = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  margin: auto;

  @media (max-width: 375px) {
    min-width: 300px;
    min-height: 300px;
  }

  ${p => p.mini && `
    width: ${miniSize};
    height: ${miniSize};

    @media (max-width: ${mobileMaxWidth}) {
      width: ${miniSizeMobile};
      height: ${miniSizeMobile};
    }
  `}
`

export const ZkbLinkCont = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`
