var timeFormat = {
  milliSecToUnit: function (milliSecs, unit) {
    if (unit === 'milliseconds') {
      return milliSecs;
    } else if (unit === 'seconds') {
      return this.milliSecToSec(milliSecs);
    } else if (unit === 'minutes') {
      return this.milliSecToMin(milliSecs);
    } else if (unit === 'hours') {
      return this.milliSecToHour(milliSecs);
    }
  },

  milliSecToSec: function (milliSecs) {
    return milliSecs * 1000;
  },

  milliSecToMin: function (milliSecs) {
    return milliSecs * 1000 * 60;
  },

  milliSecToHour: function (milliSecs) {
    return milliSecs * 1000 * 60 * 60;
  },

  frequencyConvert: function (frequency, unit) {
    if (unit === 'per hour') {
      return Math.round(60 * 60 * 1000 / frequency);
    } else if (unit === 'per day') {
      return Math.round(24 * 60 * 60 * 1000 / frequency);
    } else if (unit === 'per week') {
      return Math.round(7 * 24 * 60 * 60 * 1000 / frequency);
    } else if (unit === 'per month') {
      return Math.round(30.4167 * 24 * 60 * 60 * 1000 / frequency);
    } else if (unit === 'per year') {
      return Math.round(12 * 30.4167 * 24 * 60 * 60 * 1000 / frequency);
    }
  },
};

module.exports = timeFormat;
