import os from 'os';
import {machineIdSync} from 'node-machine-id'

// Validate only number
const isNumber = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
    } else {
        return true;
    }
};

// Cut string with dot
const cutString = function (text, limit) {
    if (text.length > limit)
        for (let i = limit; i > 0; i--) {
            return text.substring(0, i) + '...';
        }
    else
        return text;
};

// Format display view like Facebook (1k)
const kFormatter = (num) => {
    if (!num) {
        return 0
    }
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
};

// Get device id
const deviceId = () => {
    return machineIdSync()
}

// Get os of platform
const deviceOs = () => {
    if (process.platform === `darwin`) {
        return 'macos'
    } else if (process.platform === `win32`) {
        return 'windows'
    } else {
        return 'linux'
    }
}
const deviceName = () => {
    return os.hostname()
}
// Calculate price in duration
const durationCalculate = (duration, pricePerMonth, pricePerYear) => {
    if (duration === 12) {
        return "$" + pricePerYear + "/" + "1 ឆ្នាំ"
    }
    return "$" + (pricePerMonth * duration) + "/" + duration + " ខែ"
}


const gender = () => {
    let stProfile = localStorage.getItem('stProfile')

    if (stProfile) {
        stProfile = JSON.parse(stProfile)
        return stProfile.gender
    }
    return "F"
}

const numDay = (oldDate, currentDate) => {
    let date1 = new Date(oldDate);
    let date2 = new Date(currentDate);

// To calculate the time difference of two dates
    let Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
    return Math.round(Difference_In_Time / (1000 * 3600 * 24));
}

const clearDevice = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('stProfile');
    localStorage.removeItem('provinces');
}

export default{
    isNumber,
    cutString,
    kFormatter,
    deviceId,
    deviceOs,
    durationCalculate,
    gender,
    numDay,
    clearDevice,
    deviceName
}