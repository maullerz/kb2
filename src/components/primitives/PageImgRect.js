import React from 'react'

import { ImgRect } from './styles'

const PageImgRect = ({ src, alt }) => {
  return (
    <ImgRect>
      {src && <img width='100' height='100' src={src} alt={alt} />}
    </ImgRect>
  )
}

export default PageImgRect
