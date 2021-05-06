import React, { useState } from 'react'
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
    let idx = 0
    const stationComps = props.stations.map((station, idx) => (
        <Station data={station} key={idx++} idx={idx}/>
    ))

    return (
        <Box
            // bg="tomato"          
            display="flex"
            height="100%"
            position="relative"
            overflow="auto"
            width="1200px"
        >
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                position="absolute"
            >
                <Table>
                    <TableCaption>PS-1 Stations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>S. no</Th>
                            <Th>Name</Th>
                            <Th>Industry</Th>
                            <Th>Branches</Th>
                            {/* <Th>Location</Th> */}
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