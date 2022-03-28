

stage_schedules =  [
    {
        "name": "idle",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 0,
            "temperature": 0,
            "water_temperature": 0
        }
    },
    {
        "name": "germination",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 30,
            "temperature": 81,
            "water_temperature": 68
        }
    },
    {
        "name": "seedling",
        "hours_of_light": 18,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 61
       }
    },
    {
        "name": "vegetative",
        "hours_of_light": 12,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 61
        }
    },
    {
        "name": "bloom",
        "hours_of_light": 12,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 61
        }
    },
    {
        "name": "drying",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 0
        }
    },
    {
        "name": "curing",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 0
        }
    }
];

function getStageSchedules(stationid) {
    return stage_schedules
}

module.exports = {
    getStageSchedules,
}