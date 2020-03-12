import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./Login.css";
import axios from "axios";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleSubmit(e) {
    /*
    const user = "pepe@mail.com";
    const pass = "123";
    */
    e.preventDefault();

    axios
      .post("http://localhost:8080/user/login", {
        username: "xyz",
        email: this.state.email,
        password: this.state.password
      })
      .then(function(response) {
        console.log(response.data);
        //this.props.login();
        localStorage.setItem("accessToken", response.data.accessToken);
        //localStorage.setItem("email", this.state.email);
        //localStorage.setItem("password", this.state.password);
        document.location.href = "/home";
      })
      .catch(function(error) {
        console.log(error);
        alert("Correo o password incorrecto");
      });

    /*
    if (
      localStorage.getItem("email") === null ||
      localStorage.getItem("password") === null
    ) {
      if (this.state.email !== user || this.state.password !== pass) {
        alert("Correo o password incorrecto");
        return;
      }
    } else if (
      localStorage.getItem("email") !== this.state.email ||
      localStorage.getItem("password") !== this.state.password
    ) {
      alert("Correo o password incorrecto");
      return;
    }
    */
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main className="layout">
          <Paper className="paper">
            <Avatar className="avatar">
              <LockIcon />
            </Avatar>
            <Typography variant="h2">Sign in</Typography>
            <form className="form" onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleEmail}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handlePassword}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
