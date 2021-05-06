import React from 'react'
import {
    Box,
    Input,
    Stack,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react"

import { FiSearch } from 'react-icons/fi'
import { FaSearch } from 'react-icons/fa'

const SearchBar = (props) => {
    const Icon = (
        <Box>
            <FiSearch color='gray.300' size='20px'/>
        </Box>
    )

    return (
        <Box
            width="70%"
        >
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    // children={<Icon/>}
                    children={<FiSearch color='#aaa' size='25px'/>}
                />
                <Input
                    placeholder="Search"
                    variant="filled"
                    height="42px"
                />
            </InputGroup>
        </Box>
    )
}

export default SearchBar