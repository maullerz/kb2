import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import debounce from 'lodash/debounce'
import { useLocation } from 'react-router-dom'

import history from 'services/routerHistory'
import KillmailService from 'api/KillmailService'
import OrgIcon from 'components/icons/OrgIcon'
import CharIcon from 'components/icons/CharIcon'
import ItemIcon from 'components/icons/ItemIcon'
import useFocus from 'utils/hooks/useFocus'

import {
  Root, InputWrapper, StyledInput, StyledIconButton,
  Dropdown, Overlay, ItemName, Separator,
} from './styles'

const debouncedFetchAutocomplete = debounce((text, fetchFunc) => {
  if (text && text.length >= 2) {
    fetchFunc(text)
  }
}, 200)

const getIcon = (id, type) => {
  switch (type) {
    case 'ship':
      return <ItemIcon mini id={id} />
    case 'ally':
      return <OrgIcon mini ally={id} />
    case 'corp':
      return <OrgIcon mini corp={id} />
    case 'char':
      return <CharIcon mini id={id} />
    case 'region':
    case 'system':
    default:
      return <OrgIcon mini />
  }
}

const getLink = (type, id) => {
  switch (type) {
    case 'ship':
      return `/ship/${id}`
    case 'ally':
      return `/alliance/${id}`
    case 'corp':
      return `/corporation/${id}`
    case 'char':
      return `/character/${id}`
    case 'region':
      return `/region/${id}`
    case 'system':
      return `/system/${id}`
    default:
      return null
  }
}

const DropdownItem = ({ id, name, type }) => {
  const link = getLink(type, id)

  function handleSelect() {
    if (link) history.push(link)
  }

  return (
    <ItemName onClick={handleSelect}>
      <div>
        {getIcon(id, type)}
        <span>{name}</span>
      </div>
      <span>{type}</span>
    </ItemName>
  )
}

const SearchInput = () => {
  const { pathname } = useLocation()
  const [input, setInput] = useState('')
  const [matchedResults, setMatchedResults] = useState(null)
  const [inputRef, setInputFocus] = useFocus()

  useEffect(() => {
    setMatchedResults(null)
    setInput('')
  }, [pathname])

  async function fetchAutocomplete(text) {
    try {
      console.log('getAutocomplete:', text)
      const { data: result } = await KillmailService.getAutocomplete(text) || {}
      console.log('result:', result)
      setMatchedResults(result)
    } catch (e) {
      console.error('fetchAutocomplete:', e)
    }
  }

  const handleChange = event => {
    // onChange(event)
    const text = event.target.value
    setInput(text)
    if (text) {
      debouncedFetchAutocomplete(event.target.value, fetchAutocomplete)
    } else {
      setMatchedResults(null)
    }
  }

  const handleClearSearch = () => {
    setMatchedResults(null)
    setInput('')
    setInputFocus()
  }

  function processResult(type, arrayResult, nodes) {
    if (arrayResult.length) {
      if (nodes.length) nodes.push(<Separator key={`sep-${type}`} />)
      arrayResult.forEach(([id, name]) => {
        nodes.push(<DropdownItem key={id} id={id} name={name} type={type} />)
      })
    }
  }

  function renderMatched() {
    if (!matchedResults) return null
    const { regions, systems, types, allys, corps, chars } = matchedResults
    const nodes = regions.map(([id, name]) => (
      <DropdownItem key={id} id={id} name={name} type='region' />
    ))
    processResult('system', systems, nodes)
    processResult('ship', types, nodes)
    processResult('ally', allys, nodes)
    processResult('corp', corps, nodes)
    processResult('char', chars, nodes)

    if (nodes.length === 0) return null

    return (
      <Dropdown>
        <Overlay>
          {nodes}
        </Overlay>
      </Dropdown>
    )

    // return (
    //   <Dropdown>
    //     <Overlay>
    //       {regions.map(([id, name]) => (
    //         <DropdownItem
    //           key={id}
    //           id={id}
    //           name={name}
    //           type='region'
    //         />
    //       ))}
    //       {!!regions.length && <Separator />}
    //       {systems.map(([id, name]) => (
    //         <DropdownItem
    //           key={id}
    //           id={id}
    //           name={name}
    //           type='system'
    //         />
    //       ))}
    //       {!!systems.length && <Separator />}

    //       {types.map(([id, name]) => (
    //         <DropdownItem
    //           key={id}
    //           id={id}
    //           name={name}
    //           type='ship'
    //         />
    //       ))}
    //       {!!types.length && <Separator />}
    //       {allys.map(([id, name]) => (
    //         <DropdownItem
    //           key={id}
    //           id={id}
    //           name={name}
    //           type='ally'
    //         />
    //       ))}
    //       {!!allys.length && <Separator />}
    //       {corps.map(([id, name]) => (
    //         <DropdownItem
    //           key={id}
    //           id={id}
    //           name={name}
    //           type='corp'
    //         />
    //       ))}
    //       {!!corps.length && <Separator />}
    //       {chars.map(([id, name]) => (
    //         <DropdownItem
    //           key={id}
    //           id={id}
    //           name={name}
    //           type='char'
    //         />
    //       ))}
    //     </Overlay>
    //   </Dropdown>
    // )
  }

  const EndIcon = input ? (
    <StyledIconButton
      disableRipple
      disableFocusRipple
      size='small'
      onClick={handleClearSearch}
    >
      <CloseIcon />
    </StyledIconButton>
  ) : undefined

  return (
    <Root>
      <InputWrapper>
        <StyledInput
          inputRef={inputRef}
          value={input}
          placeholder='search'
          startAdornment={<SearchIcon />}
          endAdornment={EndIcon}
          onChange={handleChange}
        />
        {renderMatched()}
      </InputWrapper>
    </Root>
  )
}

export default SearchInput
