/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "globals.constans";
// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { registerSchema } from "../../components/Schemas/register/validationRegister";
import { Formik } from "../../components/Schemas/register/formik";

const Register = () => {
  
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact_number: "",
    document_number: "",
  });



  const navigate = useHistory();

  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const url = (`${BASE_URL}auth/register`);
  //     const { data: res } = await axios.post(url, data);
  //     navigate.push("/auth/login");
  //     console.log(res.message);
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //       setError(error.response.data);
  //     }
  //   }
  // };

  // const validate = () => {
  //   try {
  //     const errors = {};
  //     if (data.first_name.trim() === "") {
  //       errors.first_name = "First name is required";
  //     }
  //     if (data.last_name.trim() === "") {
  //       errors.last_name = "Last name is required";
  //     }
  //     if (data.email.trim() === "") {
  //       errors.email = "Email is required";
  //     }
  //     if (data.password.trim() === "") {
  //       errors.password = "Password is required";
  //     }
  //     if (data.contact_number.trim() === "") {
  //       errors.contact_number = "Contact number is required";
  //     }
  //     if (data.document_number.trim() === "") {
  //       errors.document_number = "Document number is required";
  //     }
  //     return Object.keys(errors).length === 0 ? null : errors;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  

  // const formik = useFormik({
  //   initialValues: {
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     password: '',
  //     contact_number: '',
  //     document_number: '',
  //   },
  //   validationSchema: registerSchema,
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //     console.log(JSON.stringify(values, null, 2));
  //   },
  // });

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Formik 
              initialValues={{ 
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                contact_number: '',
                document_number: '',
              }}
              validationSchema={registerSchema}
              onSubmit={values => {
                try {
                  const save = async () => {
                    const url = (`${BASE_URL}auth/register`);
                    const { data: res } = await axios.post(url, values);
                    navigate.push("/auth/login");
                    console.log(res.message);
                  }
                  save();
                } catch (error) {
                  console.log(error);
                }
              }
            }

            >
              {formik => (
                <Form role="form" onSubmit={formik.handleSubmit}>

                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="first_name"
                        placeholder="First Name"
                        type="text"
                        name="first_name"
                        {...formik.getFieldProps('first_name')}
                      />
                    </InputGroup> 
                    {
                      formik.touched.first_name && formik.errors.first_name ? (
                        <p className="text-danger" role="alert">
                          {formik.errors.first_name}
                        </p>
                      ) : null
                    }
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        name="last_name"
                        {...formik.getFieldProps('last_name')}
                      />
                    </InputGroup>
                    {
                      formik.touched.last_name && formik.errors.last_name ? (
                        <p className="text-danger" role="alert">
                          {formik.errors.last_name}
                        </p>
                      ) : null
                    }
                  </FormGroup>
                  
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        {...formik.getFieldProps('email')}
                      />
                    </InputGroup>
                    {
                      formik.touched.email && formik.errors.email ? (
                        <p className="text-danger" role="alert">
                          {formik.errors.email}
                        </p>
                      ) : null
                    }
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        {...formik.getFieldProps('password')}
                      />
                    </InputGroup>
                    {
                      formik.touched.password && formik.errors.password ? (
                        <p className="text-danger" role="alert">
                          {formik.errors.password}
                        </p>
                      ) : null
                    }
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-mobile-button" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Contact Number"
                        type="number"
                        name="contact_number"
                        {...formik.getFieldProps('contact_number')}
                      />
                    </InputGroup>
                    {
                      formik.touched.contact_number && formik.errors.contact_number ? (
                        <p className="text-danger" role="alert">
                          {formik.errors.contact_number}
                        </p>
                      ) : null
                    }
                  </FormGroup>

                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-badge" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Document Number"
                        type="number"
                        name="document_number"
                        {...formik.getFieldProps('document_number')}
                      />
                    </InputGroup>
                    {
                      formik.touched.document_number && formik.errors.document_number ? (
                        <p className="text-danger" role="alert">
                          {formik.errors.document_number}
                        </p>
                      ) : null
                    }
                  </FormGroup>

                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit">
                      Create account
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
