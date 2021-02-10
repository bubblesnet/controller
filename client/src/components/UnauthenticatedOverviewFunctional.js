import {useState} from 'react';
import React from 'react'
import '../App.css';
import {Button} from "rendition";
import {Text, Box, TextInput, Markdown} from "grommet";


async function loginUser(port, credentials) {
    console.log("loginUser calling out to api for token")

    return new Promise( async (resolve, reject) => {
        const response = await fetch('http://localhost:"++"/api/auth/login', {
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
    let websocket_server_port
    let api_server_port;
    switch( props.nodeEnv) {
        case "DEV":
            api_server_port = 3003;
            websocket_server_port = 8001;
            break;
        case "TEST":
            api_server_port = 3002;
            websocket_server_port = 8002;
            break;
        case "PRODUCTION":
            api_server_port = 3001;
            websocket_server_port = 8003;
            break;
        case "CI":
            api_server_port = 3004;
            websocket_server_port = 8004;
            break;
    }

    const [username, setUserName] = useState();
    const [password, setPassword] = useState("");   // Set to a value so that controlled-uncontrolled error doesn't get thrown
    const [failed, setFailed] = useState(false);

    const handleSubmit = async e => {
        /*
                e.preventDefault();
        */
        console.log("handleSubmit - calling out for token for user "+username)
        await loginUser(api_server_port, {
            username: username,
            password: password
        })
            .then((loginstate) =>{
                console.log("Calling set token with " + loginstate.token)
                loginstate.auth=true;
                props.processLoginResult(loginstate);   // Will re-render grandparent
            })
            .catch((err) => {
                console.log("login failed = " + err)
                /// TODO if processlogin rerenders grandparent, these 2 rerenders are not helpful
                setFailed(true)
                setPassword("")
                props.processLoginResult({auth: false});
            });
    };

    let login_status = <Box><Text>login failed</Text></Box>
    if( !failed ) {
        login_status = <></>
    }

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
                              <TextInput type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
                              <Button alignSelf="center"

                                      width={'medium'} round={'large'}
                                      active={"true"}
                                      onClick={handleSubmit} label={"Log in"} />
                          </Box >
                          {login_status}
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
