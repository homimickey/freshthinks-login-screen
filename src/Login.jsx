import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "./fire_config/config";
import urlDispatcher from "./urls/urls";
import setCookie from "./utils/setCookie";
import CircularProgress from '@material-ui/core/CircularProgress';


const auth = firebase.auth();
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Freshthinks
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alignItemsAndJustifyContent: {
        height:"100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default function Login() {
    const classes = useStyles();
    const [loading, setloading] = useState(false)
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [mistake, setmistake] = useState(null);
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPass(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, pass)
            .then((userCred) => {
                userCred.user.getIdTokenResult(true)
                .then((tokenRes) => {
                    if (!!tokenRes.claims.admin) {
                        setloading(true)
                        setCookie("idtoken", tokenRes.token, 1);
                        window.location.replace(urlDispatcher("home"));
                    } else {
                        setloading(true)
                        window.location.replace(urlDispatcher("ofa"));
                    }
                })
            })
            .catch((err) => {
                if (err.code === "auth/wrong-password") {
                    setmistake(true);
                } else {
                    setmistake(false);
                    setloading(true)
                    window.location.replace(urlDispatcher("error"));
                }
            });
        setEmail("");
        setPass("");
    };
    if (loading){
        return (
            <Container className={classes.alignItemsAndJustifyContent}>
                <CircularProgress />
            </Container>
        )
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <EmojiObjectsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admin Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            error={mistake}
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleEmailChange}
                            value={email}
                            autoFocus
                        />
                        <TextField
                            error={mistake}
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            value={pass}
                            autoComplete="current-password"
                            helperText={(mistake)?"Invalid credentials": null}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log In
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
}
