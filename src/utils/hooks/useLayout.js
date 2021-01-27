import { Children } from 'react'

export default function useLayout(children) {
  const blocks = { unnamed: [] }

  Children.forEach(children, child => {
    if (!child) return

    if (child.key) {
      // blocks for placeholders
      blocks[child.key] = child
    } else {
      // all those not wrapped in <Fragment key={{blockname}}>
      // similar to children
      blocks.unnamed.push(child)
    }
  })

  return blocks
}
