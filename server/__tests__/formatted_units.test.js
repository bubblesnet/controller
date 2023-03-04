
/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

let formatted_units = require ("../src/api/services/formatted_units")
var config = require("../src/config/locals.js");
var expect = require('chai').expect;

describe("formatted_units", () => {
    console.log("formatted_units")
    it('Happy path', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        localconfig.units = "IMPERIAL"
        let x = formatted_units.formattedTemperature({units: "IMPERIAL", value: 72.0});
        console.log("formatted_temperature " + x)
        expect(x.value).equals("72.0")
        localconfig.units = "METRIC"
        x = formatted_units.formattedTemperature({units: "METRIC", value: 72.0});
        console.log("formatted_temperature " + x)
        expect(x.value).equals("72.0")

        localconfig.units = "IMPERIAL"
        x = formatted_units.formattedAtmosphericPressure({units: "H", value: 72.0});
        expect(x).equals("72.0 H")
        console.log("formattedAtmosphericPressure " + x)
        x = formatted_units.formattedWaterLevel({units: "In", value: -1.0});
        expect(x).equals("EMPTY")
        console.log("formattedWaterLevel " + x)
        x = formatted_units.formattedWaterLevel({units: "In", value: 16.5});
        expect(x).equals("20.0 gallons")
        console.log("formattedWaterLevel " + x)

        localconfig.units = 'IMPERIAL'
        x = formatted_units.formattedTemperature({units: "METRIC", value: 0.0});
        expect(x.value).equals("32.0")

        localconfig.units = 'METRIC'
        x = formatted_units.formattedTemperature({units: "IMPERIAL", value: 32.0});
        expect(x.value).equals("0.0")

        return "blah";
    });
});