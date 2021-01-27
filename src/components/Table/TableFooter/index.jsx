import React from 'react'

import IconButton from 'components/buttons/IconButton'
import PageSelector from './PageSelector'

import { Root, Controls } from './styles'

const TableFooter = ({
  isLoading,
  pageSize = 10,
  pagination,
  onPrevPage, onNextPage, onGoToPage,
}) => {
  const { page, totalPages, itemsCount, totalCount } = pagination || {}
  if (!itemsCount) {
    return null
  }

  const firstItemIndex = (page - 1) * pageSize + 1
  const itemsStr = `${firstItemIndex}-${firstItemIndex + itemsCount - 1}`

  return (
    <Root>
      {totalPages > 1 ? (
        <Controls>
          <PageSelector
            page={page}
            totalPages={totalPages}
            onGoToPage={onGoToPage}
          />
          <span>
            <IconButton
              disabled={isLoading || page === 1}
              icon='arrow'
              label='Previous page'
              transparent
              onClick={onPrevPage}
              flipHorizontal
            />
            <IconButton
              disabled={isLoading || page === totalPages}
              icon='arrow'
              label='Previous page'
              transparent
              onClick={onNextPage}
            />
          </span>
        </Controls>
      ) : <div />}

      <div>
        {`${itemsStr} of ${totalCount} items`}
      </div>
    </Root>
  )
}

export default TableFooter
