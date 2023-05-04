/**
 * Retuns how until a date is in a readable format
 * @param {number} date - A UNIX timestamp (milliseconds) in the past
 * @returns {string} - a readable format of how long until a date is
 */

function timeUntil(date) {
    const now = new Date().getTime();
    const oneMinute = 60000;
    const oneHour = 3600000;
    const oneDay = 3600000 * 24;
    const oneWeek = 3600000 * 24 * 7;
    const oneMonth = 3600000 * 24 * 30;
    const oneYear = 3600000 * 24 * 365;
    const remaining = date - now;

    // in the past
    if (remaining < 0) return false;

    // more than 1 minute, less than 3 minutes
    if (remaining < oneMinute * 3) return 'less than 3 minutes';

    // more than 3 minutes, less than 1 hour
    if (remaining < oneHour) {
        const remainingMinutes = Math.floor(remaining / oneMinute);
        return `${remainingMinutes} minutes`;
    }

    // more than 1 hour, less than 2 hours
    if (remaining < oneHour * 2) return '1 hour';

    // more than 2 hours, less than 1 day
    if (remaining < oneDay) {
        const remainingHours = Math.floor(remaining / oneHour);
        return `${remainingHours} hours`;
    }

    // more than 1 day, less than 2 days
    if (remaining < oneDay * 2) return '1 day';

    // more than 2 days, less than 1 week
    if (remaining < oneWeek) {
        const remainingDays = Math.floor(remaining / oneDay);
        return `${remainingDays} days`;
    }

    // more than 1 week, less than 2 weeks
    if (remaining < oneWeek * 2) return '1 week';

    // more than 1 week, less than 1 month
    if (remaining < oneMonth) {
        const remainingWeeks = Math.floor(remaining / oneWeek);
        return `${remainingWeeks} weeks`;
    }

    // more than 1 month, less than 2 months
    if (remaining < oneMonth * 2) return '1 month';

    // more than 2 months, less than 1 year
    if (remaining < oneYear) {
        const remainingMonths = Math.floor(remaining / oneMonth);
        return `${remainingMonths} months`;
    }
    // more than 1 year, less than 2 years
    if (remaining < oneYear * 2) return '1 year';

    // more than 2 years
    if (remaining > oneYear * 2) {
        const remainingYears = Math.floor(remaining / oneYear);
        return `${remainingYears} years`;
    }

    // Fallback - returns the date in a readable format
    return date.toLocaleString('no-NO');
}

export { timeUntil };
