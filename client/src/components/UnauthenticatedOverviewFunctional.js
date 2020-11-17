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
                              <TextInput></TextInput>
                          </Box>
                          <Text size="xlarge">Password:</Text>
                          <Box gap="small">
                              <TextInput></TextInput>
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

function RenderUnauthenticatedOverviewXX (props) {

       let ret =
           <div className="sc-fznyAO eOAqIc sc-fznKkj eHLUJ sc-fzpdyU iXBPjP sc-fzppip jpfDlG"
                style={{"max-width": "440px"}} >
               <div className="sc-fznyAO eOAqIc sc-fznKkj dmVwQe sc-fznZeY kNOxIq">
                   <div className="sc-fznyAO eOAqIc sc-fznKkj ELEac sc-oTaid juzRAX">
                       <form className="rjsf">
                           <div
                               className="sc-fznyAO eOAqIc sc-fznKkj kPyLhG form-group field field-object rendition-form__field--root">
                               <section>
                                   <div className="sc-fznyAO eOAqIc sc-fznKkj ffHXvD sc-fznZeY gJZjqo">
                                       <div className="sc-fznyAO cmGJEf sc-fznKkj fmcuNh">
                                           <div
                                               className="sc-fznyAO eOAqIc sc-fznKkj kPyLhG form-group field field-string  e2e-login-username rendition-form__field--root_username">
                                               <label className="sc-qWQHW iQkyLr control-label" htmlFor="root_username">Email<span
                                                   className="required">*</span></label>
                                               <div
                                                   className="StyledTextInput__StyledTextInputContainer-sc-1x30a0s-1 jqZnBR">
                                                   <input id="root_username" placeholder="" type="text" label="Email"
                                                          required=""
                                                          className="StyledTextInput-sc-1x30a0s-0 hyUQxY sc-AxheI hAVfLB sc-Axmtr WiIYa"
                                                          value="" /></div>
                                           </div>
                                       </div>
                                       <div className="sc-fznyAO cmGJEf sc-fznKkj fmcuNh">
                                           <div
                                               className="sc-fznyAO eOAqIc sc-fznKkj kPyLhG form-group field field-string  e2e-login-password rendition-form__field--root_password">
                                               <label className="sc-qWQHW iQkyLr control-label" htmlFor="root_password">Password<span
                                                   className="required">*</span></label>
                                               <div style={{position: "relative"}}>
                                                   <div
                                                       className="StyledTextInput__StyledTextInputContainer-sc-1x30a0s-1 jqZnBR">
                                                       <input id="root_password" placeholder="" type="password"
                                                              label="Password" required=""
                                                              className="StyledTextInput-sc-1x30a0s-0 hyUQxY sc-AxheI hAVfLB sc-Axmtr bHlMXI"
                                                              value="" /></div>
                                                   <button
                                                       className="StyledButton-sc-323bzc-0 jojOEn sc-fzqBZW sc-fzpjYC hJyjKd sc-fznJRM bYfvZc sc-pIJmg lfJSky"
                                                       type="button">
                                                       <svg aria-hidden="true" focusable="false" data-prefix="far"
                                                            data-icon="eye-slash"
                                                            className="svg-inline--fa fa-eye-slash fa-w-20 fa-fw "
                                                            role="img" xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 640 512">
                                                           <path fill="currentColor"
                                                                 d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"></path>
                                                       </svg>
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </section>
                           </div>
                           <button width="60%"
                                   className="StyledButton-sc-323bzc-0 iQyBM sc-fzqBZW sc-fzqNJr dfMOAj sc-fznJRM hMlHFl"
                                   type="submit">Log in
                           </button>
                       </form>
                   </div>
                   <div className="sc-fznyAO eOAqIc sc-fznKkj cqQzcV"><a href="/password-reset">Forgot password?</a>
                   </div>
                   <hr className="sc-fzomuh dPOsAO sc-fzqMdD gbFvNL" type="dashed" />
                   <span className="sc-fzqARJ imTiIn sc-fzoyTs lmyVkm">Don't have an account?
                       <a href="/signup">Sign up</a>
                   </span>
               </div>
           </div>
return (ret)
}

export default RenderUnauthenticatedOverview;
