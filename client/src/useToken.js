import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        try {
            const tokenString = sessionStorage.getItem('token');
            const userToken = JSON.parse(tokenString);
            console.log("Returning saved token " + JSON.stringify(userToken))

            return userToken
        } catch( err ) {
            console.log("auth token err " + err)
            return({auth: false})
        }
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);    // Forces a rerender
    };

    console.log("Returning token " + JSON.stringify(token))
    return {
        setToken: saveToken,
        token
    }

}