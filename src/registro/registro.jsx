import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Logo from '../imagen/logo.png'
import { useStyles } from '../styles.js'


export default function Registro() {
  const classes = useStyles();

  const [values, setValues] = useState({});
  const [validation, setValidation] = useState(true)
  const [validationEmail, setValidationEmail] = useState(true)
  const [open, setOpen] = useState(false);
  const [valuePass, setValuePass] = useState({
    password: '',
    password2: '',
    showPassword: false,
  });
  const history = useHistory()

  const handleClickShowPassword = () => {
    setValuePass({ ...valuePass, showPassword: !valuePass.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
  };

  const validations = () => {
    setTimeout(() => {
      if (values.password === values.password2) {
        setValidation(true)
      } else {
        setValidation(false)
      }
    }, 600)
  }

  const validationsEmail = () => {
    if (values.email) {
      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(values.email)) {
        setValidationEmail(true)
      } else {
        setValidationEmail(false)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${REACT_APP_BACKEND_URL}/register`, values)
      .then(res => {
        console.log("res", res)
        if (res.ok) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Felicitaciones ',
            text: 'Tu usuario se ha creado con exito',
            footer: 'Ahora inicia sesion',
            timer: 2500
          })
          setTimeout(() => { history.push('/') }, 2300);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    validationsEmail()
    validations()
  }, [validationsEmail, validations])

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="rounded"
          src={Logo}
          alt="logo"
          className={classes.large} >
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Grid item>
          <Link href="/inicio" variant="body1" className={classes.paper}>
            Ya tienes cuenta? Inicia sesion
        </Link>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                placeholder="Nombres"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombres"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                placeholder="Apellido"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                error={validationEmail ? false : true}
                placeholder="Email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              {validationEmail ? <FormHelperText id="component-error-text"></FormHelperText> : <FormHelperText id="component-error-text">Email incorrecto</FormHelperText>}

            </Grid>
            <Grid item xs={12}>
              <Input
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                placeholder="Password"
                type={valuePass.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickOpen}>
                      <ErrorOutlineIcon variant="outlined" color="primary" onMouseDown={handleMouseDownPassword} >
                        Open dialog
                </ErrorOutlineIcon>
                    </IconButton>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>

                }
              />
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Consejos para password seguro
        </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    El password debe tener al menos 8 digitos que contengan al menos:
           <br />
           * 1 Mayuscula
           <br />
           * 1 Número
           <br />
           * 1 Simbolo especial
          </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    OK
          </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={12}>
              <Input
                error={validation ? false : true}
                aria-describedby={validation ? "Password no coinciden" : "Password coinciden"}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Repetir Password"
                id="password2"
                autoComplete="current-password"
                onChange={handleChange}
                placeholder="Repetir Password"
                type={valuePass.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {validation ? <FormHelperText id="component-error-text"></FormHelperText> : <FormHelperText id="component-error-text">Password coinciden</FormHelperText>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto terminos y condiciones"
              />
            </Grid>
          </Grid>
          {values.firstName && values.lastName && values.email && values.password && validation &&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarme
          </Button>
          }
        </form>
      </div>
    </Container>
  );
}