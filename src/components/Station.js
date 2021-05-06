import React, { useRef } from 'react'

import {
    Tr,
    Td,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Badge,
    Box,
    Switch,

    useDisclosure,
    HStack,
    CloseButton
} from "@chakra-ui/react"


import Project from './Project'
import branchColors from '../constants/branch'
import industryColors from '../constants/industry'

const Station = (props) => {
    const { name, location, industry, projects, branches, stationId } = props.data

    const { isOpen, onOpen, onClose } = useDisclosure()

    const branchTags = (
        <Box
            width='100px'
        >
            {
                branches.map((branch) => (
                    <Badge 
                        colorScheme={branchColors[branch]}
                        marginRight='8px'
                        marginBottom='6px'
                    >
                            {branch}
                    </Badge>
                ))
            }
        </Box>
    )

    function handleInterestingToggle(stationId, checked) {
        let interesting = JSON.parse(localStorage.getItem('interesting'))
        if (interesting === null) {
            interesting = {}
        }
        if (checked) {
            interesting[stationId] = true
        } else {
            delete interesting[stationId]
        }
        // props.setInterests(interesting)
        localStorage.setItem('interesting', JSON.stringify(interesting))
        return interesting
    }

    function removeInteresting(stationId) {
        const interesting = handleInterestingToggle(stationId, false)
        // props.setInterests(interesting)
    }

    return (
        <>
            <Tr
                cursor="pointer"
                _hover={{
                    backgroundColor: 'gray.50'
                }}
            >
                <Td>{props.idx + 1}</Td>
                <Td onClick={onOpen}>{name}</Td>
                <Td onClick={onOpen}>
                    {
                        <Badge colorScheme={industryColors[industry]}>{industry}</Badge>
                    }
                </Td>
                <Td onClick={onOpen}>
                    {branchTags}
                </Td>
                <Td>
                    <Box display='none'>
                        {stationId}
                    </Box>
                    {
                        props.interestingToggle
                        ?   <Box>
                                <CloseButton
                                    onClick={() => removeInteresting(stationId)}
                                />
                            </Box>
                        :   <Switch
                                onChange={(e) => handleInterestingToggle(stationId, e.target.checked)}
                                isChecked={props.interesting}
                            />
                    }
                </Td>
            </Tr>



            <Drawer
                // isOpen={props.data.stationId === '3589'}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size={'xl'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader
                        marginBottom='24px'
                    >
                        <Box
                            fontSize='32px'
                            width='90%'
                        >
                            {name}
                            <HStack marginTop='8px'>
                                <Badge
                                    colorScheme={industryColors[industry]}
                                    fontSize='16px'
                                >
                                    {industry}
                                </Badge>
                                <Box
                                    fontSize='16px'
                                    color='#059FC9'
                                >
                                    @{location}
                                </Box>
                            </HStack>
                        </Box>
                    </DrawerHeader>

                    <DrawerBody>
                        {
                            projects.map((proj, idx) => <Project data={proj} idx={idx} last={idx===projects.length-1}/>)
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Box
                            fontSize='14px'
                            color='gray.500'
                            fontWeight='600'
                        >
                            We know the data is ugly. Blame PSD.
                        </Box>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Station