/**
 * Created by rodley on 2/21/2017.
 */


(function () {
    exports.formattedTemperature = function (temperatureMonitoredSensor) {
        var ret = {};
        var config = require("../../config/locals.js");
        var sprintf = require("sprintf-js").sprintf,
            vsprintf = require("sprintf-js").vsprintf;

        if (temperatureMonitoredSensor) {
            if (temperatureMonitoredSensor.units === 'METRIC' &&
                config.getLocals().units === 'IMPERIAL') {
                ret.value = sprintf("%.1f", (temperatureMonitoredSensor.value * 9 / 5) + 32);
            }
            else if (temperatureMonitoredSensor.units === 'IMPERIAL' &&
                config.getLocals().units === 'METRIC') {
                ret.value = sprintf("%.1f", (temperatureMonitoredSensor.value - 32) * 5 / 9);
            }
            if (config.getLocals().units === 'METRIC') {
                ret.value = temperatureMonitoredSensor.value;
                ret.units = "C";
            }
            else {
                ret.value = temperatureMonitoredSensor.value;
               ret.units = 'F';
            }
        }
        return ( ret );
    }
}).call(this);

(function () {
    exports.formattedWaterLevel = function (waterLevelMonitoredSensor) {
        var ret = {};
        var config = require("../../config/locals.js");
        var sprintf = require("sprintf-js").sprintf,
            vsprintf = require("sprintf-js").vsprintf;

        var gallons_per_inch = config.getLocals().tubvolume / config.getLocals().tubdepth;
        var gallons = (config.getLocals().tubdepth - (waterLevelMonitoredSensor.value / 2.54)) * gallons_per_inch;
        if (gallons < 0)
            return ( 'EMPTY' );
        else
            return ( sprintf("%.1f gallons", gallons));
    }
}).call(this);

(function () {
    exports.formattedAtmosphericPressure = function (airPressureMonitoredSensor) {
        var ret = {};
        var config = require("../../config/locals.js");
        var sprintf = require("sprintf-js").sprintf,
            vsprintf = require("sprintf-js").vsprintf;
        return ( sprintf("%.1f %s", airPressureMonitoredSensor.value, airPressureMonitoredSensor.units));
    }
}).call(this);