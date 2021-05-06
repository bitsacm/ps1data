import React, { useState, useCallback, useEffect } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import data from './data/ps1_data.json'
import { Box, Flex } from '@chakra-ui/layout';
import Fuse from 'fuse.js'

import List from './components/List';
import Filters from './components/Filters'
import SearchBar from './components/SearchBar';
import industryColors from './constants/industry'
import branchColors from './constants/branch'

const SEARCH_DEBOUNCE_PERIOD = 10

data.pop()

function App() {
    const [stations, setStations] = useState(data)
    const [industries, setIndustries] = useState({})
    const [branches, setBranches] = useState({})
    const [interestingToggle, setInterestingToggle] = useState(false)

    useEffect(() => {
        const industryOpts = {}
        Object.keys(industryColors).forEach((key) => {
            industryOpts[key] = {
                    selected: true,
                    color: industryColors[key],
                    value: key,
                    label: key
            }
        })

        const branchOpts = {}
        Object.keys(branchColors).forEach((key) => {
            branchOpts[key] = {
                selected: true,
                color: branchColors[key],
                value: key,
                label: key
            }
        })

        setIndustries(industryOpts)
        setBranches(branchOpts)
    }, [])

    const options = {
        keys: [
            {
                name: 'name',
                weight: 10
            },
            {
                name: 'projects.title',
                weight: 4
            },
            {
                name: 'projects.description',
                weight: 2
            }
        ]
    }
    const searchIndex = Fuse.createIndex(options.keys, stations)
    const fuse = new Fuse(stations, options, searchIndex)

    function onSearch(query) {
        if (query === '') {
            return data
        }
        const results = fuse.search(query).map(({ item }) => item)
        return results
    }

    const performSearch = useCallback(_.debounce((query) => {
        const results = onSearch(query)
        setStations(results)
    }, SEARCH_DEBOUNCE_PERIOD), [])

    function onSearchValueChange(query) {
        performSearch(query)
    }


    function toggleSelect(type, itemVal, selected) {
        console.log('brah', itemVal)
        if (type === 'INDUSTRY') {
            const newInds = {...industries}
            newInds[itemVal].selected = selected
            setIndustries(newInds)
        } else if (type === 'BRANCH') {
            console.log(itemVal)
            const newBranches = {...branches}
            newBranches[itemVal].selected = selected
            setBranches(newBranches)
        }
    }

    return (
        <Flex
            height="100vh"
            justifyContent="center"
        >
            <Box
                position="relative"
                display="flex"
                flexDirection="column"
                height="100vh"
                bg='yellow'
            >
                <Box
                    bg='aqua'
                >
                    <Filters
                        industryOpts={industries}
                        branchOpts={branches}
                        toggleSelect={toggleSelect}
                        setInterestingToggle={setInterestingToggle}
                    />
                </Box>
                <Box
                    ml="350px"
                    position="relative"
                    flex="1 1 auto"
                    minWidth="800px"
                    display="flex"
                    flexDirection="column"
                >
                    <Box
                        width="100%"
                        height="80px"
                        display="flex"
                        alignItems="center"
                        position="absolute"
                    >
                        <SearchBar
                            onSearch={onSearchValueChange}
                        />
                    </Box>
                    <Box
                        height="100%"
                        boxSizing='border-box'
                        mt="80px"
                        flex="1 1 auto"
                    >
                        <List
                            stations={stations}
                            industryFilters={industries}
                            branchFilters={branches}
                            interestingToggle={interestingToggle}
                        />
                    </Box>

                </Box>
            </Box>
        </Flex>
    );
}

export default App;
