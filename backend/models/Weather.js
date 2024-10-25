const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        index: true
    },
    main: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    feels_like: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    wind_speed: {
        type: Number,
        required: true
    },
    dt: {
        type: Number,
        required: true
    },
    alerts: [{
        type: String
    }],
    history: [{
        temp: Number,
        humidity: Number,
        wind_speed: Number,
        main: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Method to get weather summary
weatherSchema.methods.getSummary = function() {
    if (!this.history || this.history.length === 0) {
        return {
            city: this.city,
            current: {
                temp: this.temp,
                humidity: this.humidity,
                wind_speed: this.wind_speed,
                main: this.main
            },
            averages: null,
            recordCount: 0,
            lastUpdated: this.lastUpdated
        };
    }

    const averages = {
        temp: (this.history.reduce((sum, record) => sum + record.temp, 0) / this.history.length).toFixed(2),
        humidity: (this.history.reduce((sum, record) => sum + record.humidity, 0) / this.history.length).toFixed(2),
        wind_speed: (this.history.reduce((sum, record) => sum + record.wind_speed, 0) / this.history.length).toFixed(2)
    };

    return {
        city: this.city,
        current: {
            temp: this.temp,
            humidity: this.humidity,
            wind_speed: this.wind_speed,
            main: this.main
        },
        averages,
        recordCount: this.history.length,
        lastUpdated: this.lastUpdated
    };
};

module.exports = mongoose.model('Weather', weatherSchema);
