//import {useState} from "react";
//import log from 'roarr';

import {
    ROARR,
} from 'roarr';

let levelnames = [
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "TRACE",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "DEBUG",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "UNK",
    "INFO"
]

const logLevel = 20

ROARR.write = (message) => {
    let x = JSON.parse(message)
    let index = x.context.logLevel
    if( index < 0 || index >= levelnames.length) {
        console.log(index + " : " + x.message);
    }
    else if( index >= logLevel)
        console.log(levelnames[index] + " : " + x.message);
};
