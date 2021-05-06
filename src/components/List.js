import React, { useEffect, useState } from 'react'
import data from '../data/ps1_data.json'

import Station from './Station'
import {
    Box,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
} from "@chakra-ui/react"

const List = (props) => {
    const [interests, setInterests] = useState({})
    const { industryFilters, branchFilters } = props
    const stationComps = []

    useEffect(() => {
        let interesting = JSON.parse(localStorage.getItem('interesting'))
        if (!interesting) interesting = {}

        setInterests(interesting)
    }, [])

    if (Object.keys(industryFilters).length > 0 && Object.keys(branchFilters).length > 0) {
        // console.log(industryFilters)
        let idx = 0
        props.stations.forEach((station) => {
            if (industryFilters[station.industry].selected
                && station.branches.some((branch) => branchFilters[branch]?.selected
                || (branch.toUpperCase() === 'ANY') && branchFilters['Any'].selected)) {
                
                if (props.interestingToggle) {
                    if (!interests[station.stationId]) {
                        return
                    }
                }
                stationComps.push(
                    <Station 
                        data={station} 
                        key={idx} 
                        idx={idx++}
                        interesting={interests[station.stationId]}
                        interestingToggle={props.interestingToggle}
                        setInterests={setInterests}
                    />
                )
            }
        })
    }

    return (
        <Box
            // bg="tomato"          
            display="flex"
            height="100%"
            position="relative"
            overflow="auto"
            // width="1200px"
        >
            <Box
                // bg="green"
                display="flex"
                flexDirection="column"
                position="absolute"
            >
                <Table

                >
                    <TableCaption>PS-1 Stations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>S. no</Th>
                            <Th>Name</Th>
                            <Th>Industry</Th>
                            <Th>Branches</Th>
                            <Th>Interesting</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stationComps}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    )
}

export default List