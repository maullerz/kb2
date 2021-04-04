import styled from 'styled-components'

export const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

export const InvolvedCountText = styled.div`
  // margin: auto;
  // padding: 2px 10px;
  padding: 0 5px;
  font-size: 10px;
  font-weight: 900;
  color: #888;
  border: 1px solid #888;
  border-radius: 4px;

  ${p => p.isSolo && `
    color: rgb(18, 59, 53);
    background-color: rgb(136, 238, 172);
    // background-color: #77b300;
    // color: white;
  `}

  ${p => p.isNPC && `
    color: white;
    background-color: #9933cc;
  `}
`
