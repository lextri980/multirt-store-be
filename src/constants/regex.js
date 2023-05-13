//! _id field in mongodb: { equal: 24 }
const idRegex = /^[0-9a-fA-F]{24}$/;

//! Email: { format }
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//! Password: { min: 6, letter, number }
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;



module.exports = { emailRegex, passwordRegex, idRegex };
