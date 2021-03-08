import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

import KillmailService from 'api/KillmailService'
import { parseItems } from 'utils/KillmailUtils'
import { Spinner, Href } from 'components'

import Summary from './Summary'
import ItemsList from './ItemsList'
import FittingWheel from './FittingWheel'
import AttackersList from './AttackersList'

import { Root, Header, Body, Center, Top, SummaryWrapper, Items, Attackers } from './styles'

// None & Structure service slot 1/2/...
// http://localhost:3000/kill/89911203

// Singlton 2
// http://localhost:3000/kill/87158884
// https://zkillboard.com/kill/87158884/

const KillmailPage = () => {
  const [kmData, setKmData] = useState(null)
  const { killmailID } = useParams()

  useEffect(() => {
    if (killmailID) {
      KillmailService.getSingleKillmail(killmailID)
        .then(({ data }) => {
          console.log('data:', data)
          setKmData(data)
        })
        .catch(err => console.error('err:', err))
    }
  }, [killmailID])

  function renderBody() {
    const fittingItems = parseItems(kmData)
    return (
      <>
        <Body>
          <Center>
            <Top>
              <FittingWheel km={kmData} items={fittingItems} />
              <SummaryWrapper>
                <Summary kmData={kmData} />
              </SummaryWrapper>
            </Top>

            <Items>
              <ItemsList kmData={kmData} />
            </Items>
          </Center>

          <Attackers>
            <AttackersList data={kmData} names={kmData.names} />
          </Attackers>
        </Body>

        <ReactTooltip
          effect='solid'
          backgroundColor='#000f'
          border
          borderColor='#555'
        />
      </>
    )
  }

  return (
    <Root>
      <Header>
        <Href link={`https://zkillboard.com/kill/${killmailID}/`}>
          zkillboard
        </Href>
      </Header>

      {kmData
        ? renderBody()
        : <Spinner />
      }
    </Root>
  )
}

export default KillmailPage
