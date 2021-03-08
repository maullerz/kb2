import React from 'react'

const Href = ({ link, children }) => (
  <a href={link} target='_blank' rel='noopener'>
    {children}
  </a>
)

export default Href
