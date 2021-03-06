module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        // checking if email matches the pattern of email
        const regEx =
            /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }
    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
    }

    if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long'
    }

    if (password.length === username) {
        errors.password = "Password the same as username? c'mon xd"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}
