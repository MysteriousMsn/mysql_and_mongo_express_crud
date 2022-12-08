const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// passing strict false parameter in new Schema we can use mongoose as a schema less, means we can create or update user with extra fields.
const employeeSchema = new Schema({
    employee_name:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    email:{
        type: String
    },
    mobile_number:{
        type: Number
    },
    salary:{
        type: Number
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
}, { strict: false });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;