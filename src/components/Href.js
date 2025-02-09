import React from 'react'

const noWrapStyle = { whiteSpace: 'nowrap' }

const Href = ({ link, children, noWrap, openHere }) => {
  if (openHere) {
    return (
      <a href={link} style={noWrap && noWrapStyle}>
        {children}
      </a>
    )
  }

  return (
    <a href={link} target='_blank' rel='noopener' style={noWrap && noWrapStyle}>
      {children}
    </a>
  )
}

export default Href
