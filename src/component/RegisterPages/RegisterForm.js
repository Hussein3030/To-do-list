import axios from 'axios';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {motion} from 'framer-motion';
import {
  Container,
  Button,
  Col,
  Form,
  Row,
  Card,
} from 'react-bootstrap';

function Register(props) {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setDataa] = useState([]);
  axios.defaults.withCredentials = true;

  const addUser = async () => {
    if (setValidated(false)) {
      console.log('Fill all data');
    }
    if (setValidated(true)) {

      axios.post('http://localhost:5000/register', {
        username: username,
        password: password,

      }).then((response) => response.json()).then((data) => {
        setDataa((posts) => [data, ...posts]);
        setUsername('');
        setPassword('');
      }).catch((error) => {
        console.log(error.message);
      });
    }
    console.log('PPP: ', username, password);
  };

  const handleUser = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    addUser();
  };

  return (
      <Container fluid="md">
        <Row
            className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <motion.div initial="hidden" animate="visible" variants={{
              hidden: {
                scale: .8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: .4,
                },
              },
            }}>
              <div className="border border-3 border-primary rounded"></div>
              <Card className="shadow border border-3">
                <Card.Body>
                  <div className="mb-1 mt-md-4">

                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="mb-5">Please enter your username and
                      password!</p>


                    <div className="mb-5">
                      <Form
                          noValidate
                          validated={validated}
                          onSubmit={handleSubmitRegister}
                      >
                        <Form.Group controlId="validationCustom01">
                          <FloatingLabel
                              controlId="floatingInput"
                              label="Username"
                              className="mb-3"
                          >
                            <Form.Control
                                required
                                type="text"
                                placeholder="User name"
                                minLength={4}
                                value={username}
                                onChange={handleUser}
                            /></FloatingLabel>
                          <Form.Control.Feedback>Looks
                            good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Username should be more then three letter
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="validationCustomPassword"
                        >
                          <FloatingLabel controlId="floatingPassword"
                                         label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                required
                                minLength={6}
                                onChange={handlePassword}
                            /></FloatingLabel>
                          <Form.Control.Feedback>Looks
                            good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Password should be more then three letter
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid">
                          <Button type="submit">Submit form</Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0 text-center">
                          Already have an account?

                          <Link className="text-primary fw-bold " to="/"> Log
                            in</Link>

                        </p>
                      </div>
                    </div>

                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
  );
}

export default Register;