import { Badge, Box } from '@chakra-ui/layout'
import React from 'react'

const MultiSelect = (props) => {
    return (
        <Box>
            {
                Object.keys(props.items).map((key) => {
                    const item = props.items[key]
                    return (
                        <Badge
                            colorScheme={item.selected ? item.color : 'gray'}
                            marginRight='10px'
                            marginBottom='10px'
                            variant={item.selected ? 'subtle' : 'outline'}
                            onClick={() => props.toggleSelect(key, !item.selected)}
                            cursor='pointer'
                        >
                            {item.label}
                        </Badge>
                    )
                })
            }
        </Box>
    )
}

export default MultiSelect