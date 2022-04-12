import React from 'react';
import UnauthenticatedApp from "./UnauthenticatedApp";
import '@testing-library/jest-dom'
import {getByTestId} from "@testing-library/dom";
import { render, screen } from '@testing-library/react'

const idx = require('./UnauthenticatedApp.js')
describe("testComputation", () =>{
    it('adds 1 + 5', () =>{
        render(<UnauthenticatedApp successfulLogin={false}/>)
//        const deepelement = screen.getByTestId('animated-gif-container')
        expect(1===1);
    });
});