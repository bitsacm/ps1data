import React, { useState, useCallback } from 'react'
import _ from 'lodash'
import data from './data/ps1_data.json'
import { Box, Flex } from '@chakra-ui/layout';
import Fuse from 'fuse.js'

import List from './components/List';
import Filters from './components/Filters'
import SearchBar from './components/SearchBar';

const SEARCH_DEBOUNCE_PERIOD = 10

data.pop()

function App() {
  const [stations, setStations] = useState(data)
  const [searchVal, setSearchVal] = useState('')

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
      >
        <Filters/>
        <Box
          ml="350px"
          position="relative"
          flex="1 1 auto"
          minWidth="1200px"
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
            <List stations={stations}/>
          </Box>

        </Box>
      </Box>
    </Flex>
  );
}

export default App;
