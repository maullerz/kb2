import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import isEmpty from 'lodash/isEmpty'

import KillmailService from 'api/KillmailService'
import * as SdeUtils from 'utils/SdeUtils'
import * as KillmailUtils from 'utils/KillmailUtils'
import { Spinner, NoContent, Ads } from 'components'

import Summary from './Summary'
import ItemsList from './ItemsList'
import FittingWheel from './FittingWheel'
import AttackersList from './AttackersList'

import {
  Root, AdsBlock,
  Body, Center, Top, SummaryWrapper, Items, Attackers,
} from './styles'

// Duplicate Containers
// http://localhost:3000/kill/81245472/

// Titan with containers
// https://zkillboard.com/kill/91991358/
// https://br.evetools.org/related/30002537/202104060300

// None & Structure service slot 1/2/...
// http://localhost:3000/kill/89911203

// Orca with ships
// http://localhost:3000/kill/91842087/
// with giant conts
// http://localhost:3000/kill/91788976

const IS_DEV = process.env.NODE_ENV === 'development'
const DEBUG = false
const km = null // require('./km.json')

const getDevelopingKillmail = () => {
  if (DEBUG && km) {
    const parsedItems = SdeUtils.parseKillmailItems(km)
    const fittingItems = KillmailUtils.parseItems(km)
    return {
      ...km,
      parsedItems,
      fittingItems,
    }
  }
  return null
}

const KillmailPage = () => {
  const [kmData, setKmData] = useState(getDevelopingKillmail())
  const { killmailID } = useParams()
  // const { isLoading, isError, data, error } = useQuery(['killmail', killmailID], () => KillmailService.getSingleKillmail(killmailID))

  useEffect(() => {
    if (killmailID && !kmData) {
      KillmailService.getSingleKillmail(killmailID)
        .then(({ data }) => {
          if (IS_DEV) {
            console.log('killmail:', data)
          }
          const parsedItems = SdeUtils.parseKillmailItems(data)
          const fittingItems = KillmailUtils.parseItems(data)
          setKmData({
            ...data,
            parsedItems,
            fittingItems,
          })
          ReactTooltip.rebuild()
        })
        .catch(err => {
          console.error('err:', err)
          setKmData({})
        })
    }
  }, [killmailID])

  // console.log('kmData:', JSON.stringify(kmData, null, 2))

  function renderBody() {
    if (isEmpty(kmData)) {
      return (
        <Body>
          <NoContent
            title='Killmail not found.'
            descr='Actually EveTools still doesn`t have many killmails as on ZKillboard.'
          />
        </Body>
      )
    }
    return (
      <>
        <Body>
          <Center>
            <Top>
              <FittingWheel kmData={kmData} />
              <SummaryWrapper>
                <Summary kmData={kmData} />
              </SummaryWrapper>
            </Top>

            <Items>
              <ItemsList kmData={kmData} />
            </Items>
          </Center>

          <Attackers>
            <AttackersList data={kmData} />
          </Attackers>
        </Body>

        {/* <ReactTooltip
          multiline
          effect='solid'
          backgroundColor='#000f'
          border
          borderColor='#555'
        /> */}
      </>
    )
  }

  return (
    <Root>
      <AdsBlock>
        <Ads type='killmail' />
      </AdsBlock>

      {kmData
        ? renderBody()
        : <Spinner />
      }
    </Root>
  )
}

export default KillmailPage
