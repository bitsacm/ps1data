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

    useDisclosure,
    HStack
  } from "@chakra-ui/react"


import Project from './Project'
import branchColors from '../constants/branch'
import industryColors from '../constants/industry'

const Station = (props) => {
    const { name, location, industry, projects } = props.data

    const { isOpen, onOpen, onClose } = useDisclosure()
    const trRef = useRef()

    let branches = {}
    projects.forEach((proj) => (
        proj.preferredDisciplines.forEach((disc) => branches[disc] = true)
    ))
    branches = Object.keys(branches)
    const branchTags = (
        <HStack spacing='8px'>
            {
                branches.map((branch) => (
                    <Badge colorScheme={branchColors[branch]}>{branch}</Badge>
                ))
            }
        </HStack>
    )

    return (
        <>
            <Tr
                onClick={onOpen}
                ref={trRef}
                cursor="pointer"
            >
                <Td>{props.idx + 1}</Td>
                <Td>{name}</Td>
                <Td>
                    {
                        <Badge colorScheme={industryColors[industry]}>{industry}</Badge>
                    }
                </Td>
                <Td>
                    {branchTags}
                </Td>
            </Tr>
            <Drawer
                // isOpen={props.data.stationId === '3589'}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={trRef}
                size={'xl'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{name}</DrawerHeader>

                    <DrawerBody>
                        {
                            projects.map((proj, idx) => <Project data={proj} idx={idx} />)
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        Footer
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Station