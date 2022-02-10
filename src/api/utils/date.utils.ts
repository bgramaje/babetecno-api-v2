import moment from 'moment';
import 'moment/locale/es';

export const TODAY = moment().format("YYYY-MM-DD")
export const YESTERDAY = (moment(new Date()).subtract(1, "days")).format("YYYY-MM-DD")

/**
 * datesAreOnSameDay
 * @param {Date} first 
 * @param {Date} second 
 * @returns {Boolean} depending if two date objects are the same day
 */
export const areDatesOnSameDay = (first: Date, second: Date): boolean =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();