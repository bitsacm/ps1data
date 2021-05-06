import React from 'react'
import {
    Box,
    Divider,
    Badge,
    HStack
} from '@chakra-ui/layout'

import branchColors from '../constants/branch'

const Project = (props) => {
    return (
        <Box
            marginBottom="24px"
            width='80%'
            color='gray.600'
        >
            <Box
                display='flex'
                alignItems='center'
                fontWeight='600'
                fontSize='14px'
                color='#059FC9'
            >
                Project #{props.idx+1}
            </Box>
            
            <Box
                fontSize='20px'
                marginBottom='8px'
            >
                <strong>{props.data.title}</strong>
            </Box>
            
            <Box
                marginTop='8px'
                marginBottom='16px'
                // width='80%'
                color='gray.600'
            >
                {props.data.description}
            </Box>

            <Box
                display='flex'
                alignItems='center'
                marginBottom='24px'
                fontSize='14px'
                fontWeight='600'
            >
                For branches:
                <HStack spacing='8px' marginLeft='8px' >
                    {
                        props.data.preferredDisciplines.map((disc) => (
                            <Badge colorScheme={branchColors[disc]}>{disc}</Badge>
                        ))
                    }
                </HStack>
            </Box>
            
            <Divider/>
        </Box>
    )
}

export default Project