import { Box } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/switch'
import React from 'react'
import Select from 'react-select'
import MultiSelect from './MultiSelect'

const Filters = (props) => {
    return (
        <Box
            // mt="80px"
            minWidth="250px"
            // width="100%"
            // height="600px"
            flex="1 1 auto"
            // position="absolute"
            bg="gray.50"
            borderRadius="10px"
            boxShadow='md'
            borderColor='gray.100'
            borderWidth='1px'
            boxSizing='border-box'
            padding='16px'
        >
            <Box
                fontSize='14px'
                color='gray.400'
                fontWeight='600'
                marginBottom='8px'
            >
                FILTER BY INDUSTRY
            </Box>
            <Box
                // bg="tomato"
            >
                <MultiSelect
                    items={props.industryOpts}
                    toggleSelect={(value, selected) => props.toggleSelect('INDUSTRY', value, selected)}
                    // toggleSelect={(idx, selected) => console.log('bruh')}
                />
            </Box>
            <Box
                fontSize='14px'
                color='gray.400'
                fontWeight='600'
                marginTop='16px'
                marginBottom='8px'
            >
                FILTER BY BRANCH
            </Box>
            <Box
                // bg="tomato"
            >
                <MultiSelect
                    items={props.branchOpts}
                    toggleSelect={(value, selected) => props.toggleSelect('BRANCH', value, selected)}
                    // toggleSelect={(idx, selected) => console.log('bruh')}
                />
            </Box>

            <Box
                fontSize='14px'
                color='gray.400'
                fontWeight='600'
                marginTop='16px'
                marginBottom='8px'
            >
                SHOW ONLY INTERESTING
            </Box>
            <Box
                // bg="tomato"
            >
                <Switch
                    onChange={(e) => props.setInterestingToggle(e.target.checked)}
                />
            </Box>
            <Box
                fontSize='12px'
                color='gray.500'
                mt='16px'
            >
                Toggling this could be a little slow :(
            </Box>
        </Box>
    )
}

export default Filters
