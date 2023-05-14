/**
 *
 * @param {object} date - a date object
 * @returns - a string formatted for the datepicker
 */

function formatDateforDatepicker(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export { formatDateforDatepicker };
