import {useState} from 'react';
import React from 'react'
import '../App.css';
import {Button} from "rendition";
import {Text, Box, TextInput, Markdown} from "grommet";


async function loginUser(credentials) {
    console.log("loginUser calling out to api for token")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://localhost:3003/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        if(response.ok) {
            let loginstate = await response.json();
            console.log("Got loginstate " + JSON.stringify(loginstate));
            resolve(loginstate)
        } else {
            console.log("error " + response.status)
            reject( response.status )
        }
    })
}

function RenderUnauthenticatedOverview (props) {
    const md = `
### Bubbles Controller
Enter your username and password to start configuring and controlling your Bubbles installation.
                        
Click here to see first-time setup instructions.
`;

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        /*
                e.preventDefault();
        */
        console.log("handleSubmit - calling out for token for email "+username)
        await loginUser({
            username: username,
            password: password
        })
            .then((loginstate) =>{
                console.log("Calling set token with " + loginstate.token)
                props.setToken(loginstate);
            })
            .catch((err) => {
                console.log("login failed = " + err)
                props.setToken({auth: false, token: ""});
            });
    };

    let ret =
        <Box direction="column" >
            <form  onSubmit={handleSubmit}>
            <Box direction="row" margin="xlarge" >
                <Box round="small" direction="column" background="#aabbff">
                    <Box gap="xlarge">
                      <Box margin="large" direction="column" gap="medium" width="medium" >
                          <Text size="xlarge">Username:</Text>
                          <Box>
                              <TextInput defaultValue={username} onChange={e => setUserName(e.target.value)}/>
                          </Box>
                          <Text size="xlarge">Password:</Text>
                          <Box gap="small">
                              <TextInput type={"password"} onChange={e => setPassword(e.target.value)}/>
                              <Button alignSelf="center"

                                      width={'medium'} round={'large'}
                                      active={"true"}
                                      onClick={handleSubmit} label={"Log in"} />
                          </Box >
                      </Box>
                    </Box>
                </Box>
                <Box margin="medium">
                    <Markdown  children={md}>
                     </Markdown>
                </Box>
            </Box>
            </form>
        </Box>
    return (ret);
}

export default RenderUnauthenticatedOverview;
