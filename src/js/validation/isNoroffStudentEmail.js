/**
 *  Validates the if the provided string is a Noroff student email.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - Whether or not the email is valid.
 */
const isNoroffStudentEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@stud\.noroff\.no$/;
    return regex.test(email);
};

export { isNoroffStudentEmail };
