import React from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { Link } from "react-router-dom";
import Footer from "../components/footer.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      Password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(){
    try{
      const {UserName, Password} = this.state;

      const response = await axios.post("https://demo-nasa-api-backend.azurewebsites.net/signin", {
        UserName,
        Password,
      });

      console.log(response.data);

      if(response.data.success){

        // localStorage.setItem('token', response.data.token);

        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('UserName', response.data.user.UserName);
        const expirationTime = new Date().getTime() + (2 * 60 * 60 * 1000);
        sessionStorage.setItem('tokenExpiration', expirationTime);

        toast.success("Signin successful!", {
          position: 'top-right',
          autoClose: 400,
          onClose: ()=> {
            window.location.href = "/landing-page";
          }
        });

      }

    }catch(error){
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 1000,
      });
      console.error("Error signing up:", error);
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-4 pb-lg-5">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <h3>Sign in</h3>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              placeholder="UserName" 
                              type="text" 
                              name="UserName"
                              value={this.state.UserName}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
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
                              autoComplete="off"
                              name="Password"
                              value={this.state.Password}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={this.handleSubmit}
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link
                        className="text-light"
                        to="/register-page"
                      >
                        <small>Create new account</small>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <Footer/>
      </>
    );
  }
}

export default Login;
