import React, { useState } from 'react'

import IconButton from 'components/buttons/IconButton'

import { PageNumber, StyledMenuItem, StyledMenu } from './styles'

const PageSelector = ({ page, totalPages, onGoToPage }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = !!anchorEl

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToPage = selectedPage => {
    onGoToPage(selectedPage)
    handleClose()
  }

  return (
    <>
      <PageNumber open={open}>
        <span>{`${page || 0}`}</span>
        <IconButton
          icon='arrow'
          rotateRight
          onClick={handleClick}
          transparent
        />
      </PageNumber>
      <span>{`of ${totalPages} pages`}</span>

      <StyledMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -1,
          horizontal: 'right',
        }}
      >
        {[...Array(totalPages)].map((e, index) => (
          <StyledMenuItem onClick={() => goToPage(index + 1)} value={index + 1} key={index + 1}>
            {index + 1}
          </StyledMenuItem>

        ))}
      </StyledMenu>
    </>
  )
}

export default PageSelector
