import React from 'react'
import { Box } from '@chakra-ui/layout'


const Project = (props) => {
    return (
        <Box
            marginBottom="16px"
        >
            <Box>
                <strong>{props.data.title}</strong>
            </Box>
            <Box>
                {props.data.description}
            </Box>
            
        </Box>
    )
}

export default Project