

stage_schedules =  [
    {
        "environmental_targets": {
            "humidity": 0,
            "temperature": 0
        },
        "hours_of_light": 1,
        "name": "idle"
    },
    {
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80
        },
        "hours_of_light": 18,
        "name": "germination"
    },
    {
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80
        },
        "hours_of_light": 18,
        "name": "seedling"
    },
    {
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80
        },
        "hours_of_light": 12,
        "name": "vegetative"
    },
    {
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80
        },
        "hours_of_light": 12,
        "name": "flowering"
    },
    {
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80
        },
        "hours_of_light": 0,
        "name": "drying"
    },
    {
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80
        },
        "hours_of_light": 0,
        "name": "curing"
    }
];

function getStageSchedules(cabinetid) {
    return stage_schedules
}

module.exports = {
    getStageSchedules,
}