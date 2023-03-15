import axios from 'axios';
import React, {useState} from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {
  Container,
  Button,
  Col,
  Form,
  Row,
  Card,
} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

function Auth(props) {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true;

  const postLogin = async () => {
    await axios.post('http://localhost:5000/login', {
      username: username,
      password: password,
    }).then((res) => {
      localStorage.setItem('Token', res.data.token);
    }).catch((error) => console.log('Error Login form', error));

  };

  const handleUser = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      await postLogin().then(() => {
        window.location.reload();
      });
    }

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

                    <h2 className="fw-bold mb-2 text-uppercase">Log in</h2>
                    <p className="mb-5">Please enter your login and
                      password!</p>

                    <div className="mb-5">

                      <Form
                          validated={validated}
                          onSubmit={handleSubmitLogin}
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
                            />
                          </FloatingLabel>
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
                          <FloatingLabel
                              controlId="floatingPassword"
                              label="Password"
                          >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                required
                                minLength={6}

                                onChange={handlePassword}
                            />
                          </FloatingLabel>
                          <Form.Control.Feedback>Looks
                            good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Password should be more then three letter
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid">
                          <Button type="submit">Log in</Button>
                        </div>

                      </Form>
                      <div className="mt-3">
                        <p className="mb-0 text-center">
                          Don't have an account?
                          <Link className="text-primary fw-bold "
                                to="/register">
                            {' '}
                            Sign Up
                          </Link>
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

export default Auth;
