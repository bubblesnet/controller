import { useState } from 'react';
import log from "roarr";

/// TODO check copyright and license

export default function useToken() {
    const getToken = () => {
        try {
            const tokenString = sessionStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            log.trace("Returning saved token " + JSON.stringify(userToken))

            return userToken
        } catch( err ) {
            log.trace("auth token err " + err)
            return({auth: false})
        }
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);    // Forces a rerender
    };

    log.trace("Returning token " + JSON.stringify(token))
    return {
        setToken: saveToken,
        token
    }

}