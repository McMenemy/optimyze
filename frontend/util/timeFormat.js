var timeFormat = {
  unitToMilliSec: function (time, unit) {
    if (unit === 'milliseconds') {
      return time;
    } else if (unit === 'seconds') {
      return this.secToMilliSec(time);
    } else if (unit === 'minutes') {
      return this.minToMilliSec(time);
    } else if (unit === 'hours') {
      return this.hourToMilliSec(time);
    }
  },

  secToMilliSec: function (time) {
    return time * 1000;
  },

  minToMilliSec: function (time) {
    return time * 1000 * 60;
  },

  hourToMilliSec: function (time) {
    return time * 1000 * 60 * 60;
  },

  calcTimeUnit: function (milliSecs) {
    if (milliseconds < 1000) {
      return 'milliseconds';
    } else if (milliseconds < 1000 * 60) {
      return 'seconds';
    } else if (milliseconds < 1000 * 60 * 60) {
      return 'minutes';
    } else {
      return 'hours';
    }
  },

  timesPerUnitToEveryMilliSec: function (frequency, unit) {
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

  milliSecsToAppropriateUnit: function (milliseconds) {
    var time;
    if (milliseconds < 1000) {
      time = milliseconds;
      return [time, 'milliseconds'];
    } else if (milliseconds < 1000 * 60) {
      time = Math.round(milliseconds / 1000);
      return [time, 'seconds'];
    } else if (milliseconds < 1000 * 60 * 60) {
      time = Math.round(milliseconds / 1000 / 60);
      return [time, 'minutes'];
    } else {
      time = Math.round(milliseconds / 1000 / 60 / 60);
      return [time, 'hours'];
    }
  },

  everyMilliSecsToTimesPerUnit: function (milliseconds) {
    var frequency;
    if (milliseconds <= 60 * 60 * 1000) {
      frequency = Math.round(60 * 60 * 1000 / milliseconds);
      return [frequency, 'per hour'];
    } else if (milliseconds <= 24 * 60 * 60 * 1000) {
      frequency = Math.round(24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per day'];
    } else if (milliseconds <= 7 * 24 * 60 * 60 * 1000) {
      frequency = Math.round(7 * 24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per week'];
    } else if (milliseconds <= 30.4167 * 24 * 60 * 60 * 1000) {
      frequency = Math.round(30.4167 * 24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per month'];
    } else {
      frequency = Math.round(12 * 30.4167 * 24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per year'];
    }
  },

};

module.exports = timeFormat;
