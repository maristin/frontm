import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import swal from 'sweetalert';
import pic1 from '../image/1.jpg'
import pic2 from '../image/2.jpg'
import pic3 from '../image/5.jpg'
import pic4 from '../image/6.jpg'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.metrobus.cdmx.gob.mx/">
        Metrobús
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const pictureArray = [pic1, pic2, pic3, pic4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${selectedPicture})`, //'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [newUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    rol: "",
  });

  const handleInputChange = (e) => {
    newUser[e.target.name] = e.target.value;
    console.log(newUser);
  };

  const sendData = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/users/register";
    if (
      newUser.name !== "" &&
      newUser.lastname !== "" &&
      newUser.email !== "" &&
      newUser.password !== "" &&
      newUser.role !== ""
    ) {      
      axios
        .post(url, newUser)
        .then((res) => {
          if (res.data.success === true) {
            swal("Usuario Registrado exitosamente", "Inicia sesión", "success"); 
            setInterval(function(){ 
                localStorage.setItem('tokenMB', res.data.token);                      
                window.location.replace("/");
            }, 2000);
            console.log(res.data);           
          } else {
            swal("Error al crear usuario", "Verifica los datos o intente otra vez", "error");
            console.log(res.data);
            // alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("SERVER ERROR >: " + err);
        });
    } else {
      alert("Empty fields!!");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Regístrate
          </Typography>
          <form className={classes.form} noValidate onSubmit={sendData}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoFocus
              type="text"
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="Apellido"
              type="text"
              id="Apellido"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico "
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple"> Departamento </InputLabel>
                <Select
                  native
                  defaultValue=""
                  onChange={handleInputChange}
                  inputProps={{
                    name: "rol",
                    id: "age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"JUDE"}>JUDE</option>
                  <option value={"MantE"}>MantE</option>
                  <option value={"Cuda"}>Cuda</option>
                </Select>
              </FormControl>
            </div>           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Regístrate
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"¿Ya tienes cuenta?"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
