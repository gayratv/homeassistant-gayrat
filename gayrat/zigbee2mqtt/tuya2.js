const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;

module.exports = [
    {
        fingerprint: [{modelID: 'TS0202', manufacturerName: '_TZ3000_ykwcwxmz'}],
        model: 'TS0202',
        vendor: 'TuYa',
        description: 'Motion sensor',
        whiteLabel: [{vendor: 'Mercator Ikuü', model: 'SMA02P'}, {vendor: 'TuYa', model: 'TY-ZPR06'}],
        fromZigbee: [fz.ias_occupancy_alarm_1, fz.battery, fz.ignore_basic_report, fz.ias_occupancy_alarm_1_report],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper(), e.battery(), e.battery_voltage()],
    },
];
