const validateRegistration = ({ name, email, password }) => {
    const errors = {};

    if (!name || name.trim().length < 2) {
        errors.name = "Name must contain at least 2 characters";
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "Please provide a valid email";
    }

    if (!password || password.length < 6) {
        errors.password = "Password must contain at least 6 characters";
    }

    return errors;
};

const validateLogin = ({ email, password }) => {
    const errors = {};

    if (!email) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
};

module.exports = {
    validateRegistration,
    validateLogin,
};