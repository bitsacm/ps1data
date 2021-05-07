import React, { useState, useCallback, useEffect } from 'react'
import _, { transform } from 'lodash'
import data from './data/ps1_data.json'
import { Box, Flex } from '@chakra-ui/layout';
import Fuse from 'fuse.js'
import { Star } from 'react-github-buttons'
import GitHubButton from 'react-github-btn'
import List from './components/List';
import Filters from './components/Filters'
import SearchBar from './components/SearchBar';
import industryColors from './constants/industry'
import branchColors from './constants/branch'
import Logo from './assets/logo.png'

const SEARCH_DEBOUNCE_PERIOD = 10

data.pop()

function App() {
    const [stations, setStations] = useState(data)
    const [industries, setIndustries] = useState({})
    const [branches, setBranches] = useState({})
    const [interestingToggle, setInterestingToggle] = useState(false)

    useEffect(() => {
        console.log('We wrote quite a bit of spaghetti code to finish this in a single day, of course you can hack us :/')
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
                display="flex"
                height="100vh"
            >
                <Box
                    width='25%'
                >
                    <Box
                        height='90px'
                    >
                        <img
                            src={Logo}
                            style={{
                                maxHeight: '100px',
                                marginTop: '7px',
                                transform: 'translateY(0px)'
                            }}
                        />
                    </Box>
                    <Filters
                        industryOpts={industries}
                        branchOpts={branches}
                        toggleSelect={toggleSelect}
                        setInterestingToggle={setInterestingToggle}
                    />
                    <Box
                        marginTop='16px'
                    >

                        <GitHubButton
                            href="https://github.com/bitsacm/ps1data"
                            data-icon="octicon-star" 
                            data-size="large" 
                            data-show-count="true" 
                            aria-label="Star bitsacm/ps1data on GitHub">
                                Star this on GitHub!
                        </GitHubButton>
                    </Box>
                </Box>
                <Box
                    flex="1 1 auto"
                    display="flex"
                    flexDirection="column"
                    ml='32px'
                >
                    <Box
                        width='1000px'
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
