import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    name: yup
                .string('The name must be a text')
                .required("The name is required")
                .min(3, 'The name must be at least 3 characters'),
    email: yup 
                .string('The email must be a text')
                .email('The email must be a valid email')
                .required("The email is required"),
    password: yup
                .string('The password must be a text')
                .required("The password is required")
})

export default yupResolver(schema);
