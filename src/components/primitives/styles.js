import styled from 'styled-components'

export const CharName = styled.div`
  color: gold;

  a {
    color: gold;
  }
`

export const CorpName = styled.div`
  color: grey;

  a {
    color: grey;
  }
`

export const AllyName = styled.div`
  color: white;

  a {
    color: white;
  }
`

export const ShipName = styled.div`
  color: #888;

  a {
    color: #888;
  }
`

export const CharShipName = styled.span`
  color: #555;
`

export const ImgRect = styled.div`
  width: 102px;
  height: 102px;
  border: 1px solid #333;
  background-color: #222;

  @media (max-width: 600px) {
    width: 62px;
    height: 62px;

    > img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 474px) {
    display: none;
  }
`
