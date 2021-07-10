import React, { useState, Fragment } from 'react'

import useBooleanToggle from 'utils/hooks/useBooleanToggle'
import { OrgIcon, Expander } from 'components'
import { CorpName, AllyName } from 'components/primitives'

import { Root, Row, CorpsBlock, IconNameWrapper } from './styles'

const AllyIconName = ({ ally, names }) => {
  return (
    <IconNameWrapper>
      <OrgIcon link mini ally={ally.id} names={names} />
      <AllyName id={ally.id} name={names.allys[ally.id]} />
    </IconNameWrapper>
  )
}

const CorpIconName = ({ corp, names }) => {
  return (
    <IconNameWrapper>
      <OrgIcon link mini corp={corp.id} names={names} />
      <CorpName id={corp.id} name={names.corps[corp.id]} />
    </IconNameWrapper>
  )
}

const groupAttackers = attackers => {
  const allys = {}
  attackers.forEach(att => {
    if (!att.ally) {
      allys.unaffiliated = allys.unaffiliated || { count: 0, corps: {} }
      allys.unaffiliated.count += 1
      allys.unaffiliated.corps[att.corp] = allys.unaffiliated.corps[att.corp] || { count: 0 }
      allys.unaffiliated.corps[att.corp].count += 1
    } else {
      allys[att.ally] = allys[att.ally] || { count: 0, corps: {} }
      allys[att.ally].count += 1
      allys[att.ally].corps[att.corp] = allys[att.ally].corps[att.corp] || { count: 0 }
      allys[att.ally].corps[att.corp].count += 1
    }
  })

  // console.log('allys:', JSON.stringify(allys, null, 2))

  const allysArray = Object.keys(allys)
    .map(allyID => ({
      id: allyID,
      ...allys[allyID],
    }))
    .sort((a, b) => b.count - a.count)

  // const nameA = SdeUtils.getTypeName(a.type)
  // const nameB = SdeUtils.getTypeName(b.type)
  // return order === 'DESC'
  //   ? nameA.localeCompare(nameB)
  //   : nameB.localeCompare(nameA)

  allysArray.forEach(ally => {
    ally.corps = Object.keys(ally.corps)
      .map(corpID => ({
        id: corpID,
        ...ally.corps[corpID],
      }))
      .sort((a, b) => b.count - a.count)
  })

  // console.log('allysArray:', JSON.stringify(allysArray, null, 2))

  return allysArray
}

const getStoredValue = () => {
  const result = localStorage.getItem(`collapsed-killmail-involved-orgs`)
  return Boolean(result)
}

const InvolvedGrouped = ({ attackers, names }) => {
  const [collapsed, toggleCollapsed] = useBooleanToggle(getStoredValue())
  const [grouped] = useState(groupAttackers(attackers))
  return (
    <Root>
      <Expander
        title='Involved Alliances and Corps'
        storageKey='collapsed-killmail-involved-orgs'
        onChange={toggleCollapsed}
        backgroundColor='#222'
      />
      {grouped.map(ally => (
        <Fragment key={ally.id}>
          <Row>
            {/* <AllyName id={ally.id} name={names.allys[ally.id]} /> */}
            <AllyIconName ally={ally} names={names} />
            <div>{ally.count}</div>
          </Row>
          {!collapsed &&
            <CorpsBlock>
              {ally.corps.map(corp => (
                <Row key={corp.id}>
                  {/* <CorpName id={corp.id} name={names.corps[corp.id]} /> */}
                  <CorpIconName corp={corp} names={names} />
                  <div>{corp.count}</div>
                </Row>
              ))}
            </CorpsBlock>
          }
        </Fragment>
      ))}
    </Root>
  )
}

export default InvolvedGrouped
