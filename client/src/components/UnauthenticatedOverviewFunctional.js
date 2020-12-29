import React from 'react';
import '../App.css';
import {Button} from "rendition";
import {Text, Box, TextInput, Markdown} from "grommet";

function RenderUnauthenticatedOverview (props) {
    const md = `
### Bubbles Controller
Enter your username and password to start configuring and controlling your Bubbles installation.
                        
Click here to see first-time setup instructions.
`;
    let ret =
        <Box direction="column" >
            <Box align="center" background="yellow">
            </Box>
            <Box direction="row" margin="xlarge" >
                <Box round="small" direction="column" background=" #aabbff">
                    <Box gap="xlarge">
                      <Box margin="large" direction="column" gap="medium" width="medium" >
                          <Text size="xlarge">Username:</Text>
                          <Box>
                              <TextInput />
                          </Box>
                          <Text size="xlarge">Password:</Text>
                          <Box gap="small">
                              <TextInput />
                              <Button alignSelf="center" onClick={props.successfulLogin}>Log in</Button>
                          </Box >
                      </Box>
                    </Box>
                </Box>
                <Box margin="medium">
                    <Markdown  children={md}>
                     </Markdown>
                </Box>
            </Box>
        </Box>
    return (ret);
}

export default RenderUnauthenticatedOverview;
