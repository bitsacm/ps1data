import data from './data/ps1_data.json'
import { Box, Flex } from '@chakra-ui/layout';

import List from './components/List';
import Filters from './components/Filters'
import SearchBar from './components/SearchBar';

function App() {
  data.pop()
  return (
    <Flex
      height="100vh"
      // bg="gray.50"
      justifyContent="center"
      // overflow="hidden"
    >
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        // bg="red"
        height="100vh"
        // mt="150px"
      >
        <Filters/>
        <Box
          ml="350px"
          // bg="tomato"
          position="relative"
          flex="1 1 auto"
          minWidth="1200px"
          display="flex"
          flexDirection="column"
          // height="100%"
        >
          <Box
            width="100%"
            height="80px"
            // bg="aqua"
            display="flex"
            alignItems="center"
            position="absolute"
          >
            <SearchBar/>
          </Box>

          <Box
            // bg="yellow"
            height="100%"
            boxSizing='border-box'
            mt="80px"
            flex="1 1 auto"
          >
            <List stations={data}/>
          </Box>

        </Box>
      </Box>
    </Flex>
  );
}

export default App;
