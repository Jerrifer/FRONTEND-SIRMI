import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    first_name: yup.string()
        .required('First name is required')
        .min(5, 'First name must be at least 5 characters')
        .max(10, 'First name must be less than 10 characters'),
    last_name: yup.string()
        .required('Last name is required')
        .min(5, 'Last name must be at least 5 characters')
        .max(50, 'Last name must be less than 50 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must be less than 50 characters'),
    contact_number: yup.string()
        // .typeError('Contact number must be a number')
        .required('Contact number is required')
        .min(10, 'Contact number must be at least 10 characters'),
    document_number: yup.string()
        .required('Document number is required')
        .min(8, 'Document number must be at least 8 characters')
})
// export default registerSchema;