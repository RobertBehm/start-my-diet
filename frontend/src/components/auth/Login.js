import React, { useState, useEffect } from "react"
import clsx from "clsx"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Fields from "./Fields"
import { setUser, setSnackbar } from "../../contexts/actions"

import accountIcon from "../../icons/account.svg"
import EmailAdornment from "../../icons/EmailAdornment"
import passwordAdornment from "../../icons/password-adornment.svg"
import hidePasswordIcon from "../../icons/hide-password.svg"
import showPasswordIcon from "../../icons/show-password.svg"
import addUserIcon from "../../icons/add-user.svg"
import forgotPasswordIcon from "../../icons/forgot.svg"
import close from "../../icons/close.svg"

const useStyles = makeStyles(theme => ({
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  accountIcon: {
    marginTop: "2rem",
  },
  login: {
    width: "18rem",
    borderRadius: 50,
    textTransform: "none",
  },
  facebookButton: {
    marginTop: "-1rem",
  },
  facebookText: {
    fontSize: "1.25rem",
    fontWeight: 700,
    textTransform: "none",
  },
  visibleIcon: {
    padding: 0,
  },
  passwordError: {
    marginTop: 0,
  },
  close: {
    paddingTop: 5,
  },
  reset: {
    marginTop: "-4rem",
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}))

export const EmailPassword = (
  classes,
  hideEmail,
  hidePassword,
  visible,
  setVisible
) => ({
  email: {
    helperText: "invalid email",
    placeholder: "Email",
    hidden: hideEmail,
    type: "text",
    startAdornment: (
      <span className={classes.emailAdornment}>
        <EmailAdornment color="#003c54" />
      </span>
    ),
  },
  password: {
    helperText:
      "your password must be at least 8 characters, include 1 uppercase letter, 1 number, and have at least 1 special character",
    placeholder: "Password",
    hidden: hidePassword,
    type: visible ? "text" : "password",
    startAdornment: <img src={passwordAdornment} alt="password" />,
    endAdornment: (
      <IconButton
        classes={{ root: classes.visibleIcon }}
        onClick={() => setVisible(!visible)}
      >
        <img
          src={visible ? showPasswordIcon : hidePasswordIcon}
          alt={`${visible ? "Show" : "Hide"} Password`}
        />
      </IconButton>
    ),
  },
})

export default function Login({
  steps,
  setSelectedStep,
  user,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const fields = EmailPassword(classes, false, forgot, visible, setVisible)

  const navigateSignUp = () => {
    const signUp = steps.find(step => step.label === "Sign Up")

    setSelectedStep(steps.indexOf(signUp))
  }

  const handleLogin = () => {
    setLoading(true)

    axios
      .post("http://localhost:1337/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        )
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const handleForgot = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        email: values.email,
      })
      .then(response => {
        setLoading(false)
        setSuccess(true)
        dispatchFeedback(
          setSnackbar({ status: "success", message: "Reset Code Sent" })
        )
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      setForgot(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt="login page" />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          disabled={loading || (!forgot && disabled)}
          onClick={() => (forgot ? handleForgot() : handleLogin())}
          classes={{
            root: clsx(classes.login, {
              [classes.reset]: forgot,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5">
              {forgot ? "reset password" : "login"}
            </Typography>
          )}
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
            component="a"
            href={`https://08ba-100-10-53-128.ngrok.io/connect/facebook`}
            classes={{
              root: clsx(classes.facebookButton, {
                [classes.passwordError]: errors.password,
              }),
            }}
          >
            <Typography variant="h3" classes={{ root: classes.facebookText }}>
              login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}

      <Grid item container justify="space-between">
        <Grid item>
          <IconButton onClick={navigateSignUp}>
            <img src={addUserIcon} alt="sign up" />
          </IconButton>
        </Grid>
        <Grid
          item
          classes={{
            root: clsx({
              [classes.close]: forgot,
            }),
          }}
        >
          <IconButton onClick={() => setForgot(!forgot)}>
            <img
              src={forgot ? close : forgotPasswordIcon}
              alt={forgot ? "back to login" : "forgot password"}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
