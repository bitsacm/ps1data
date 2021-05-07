import React, { useCallback } from 'react'
import {
    Box,
    Input,
    Stack,
    InputGroup,
    InputLeftElement,
    Button
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
            display='flex'
            alignItems='center'
        >
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    // children={<Icon/>}
                    children={<FiSearch color='#aaa' size='25px'/>}
                />
                <Input
                    placeholder="Eg: Machine Learning"
                    variant="filled"
                    height="42px"
                    onChange={(e) => props.onSearch(e.target.value)}
                    // value={props.value}
                />
            </InputGroup>
        </Box>
    )
}

export default SearchBar