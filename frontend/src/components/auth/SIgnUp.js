import React, { useState } from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import clsx from "clsx"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Fields from "./Fields"
import { EmailPassword } from "../auth/Login"
import { setUser, setSnackbar } from "../../contexts/actions"

import addUserIcon from "../../icons/add-user.svg"
import nameAdornment from "../../icons/name-adornment.svg"
import forward from "../../icons/forward-outline.svg"
import backward from "../../icons/backwards-outline.svg"

const useStyles = makeStyles(theme => ({
  addUserIcon: {
    height: "10rem",
    width: "11rem",
    marginTop: "5rem",
  },
  textField: {
    width: "20rem",
  },
  input: {
    color: theme.palette.primary.main,
  },
  facebookSignUp: {
    width: "20rem",
    borderRadius: 50,
    marginTop: "-3rem",
  },
  facebookText: {
    textTransform: "none",
    fontSize: "1.5rem",
  },
  navigation: {
    height: "4rem",
    width: "4rem",
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  removeButtonMargin: {
    marginTop: 0,
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

export default function SignUp({
  steps,
  setSelectedStep,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  })

  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNavigate = direction => {
    if (direction === "forward") {
      setInfo(true)
    } else {
      if (info) {
        setInfo(false)
      } else {
        const login = steps.find(step => step.label === "Login")

        setSelectedStep(steps.indexOf(login))
      }
    }
  }

  const handleComplete = () => {
    setLoading(true)

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local/register", {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        dispatchUser(setUser({ ...response.data.user, jwt: response.data.jwt }))

        const complete = steps.find(step => step.label === "Complete")

        setSelectedStep(steps.indexOf(complete))
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const nameField = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornment} alt="name" />,
    },
  }

  const fields = info
    ? EmailPassword(classes, false, false, visible, setVisible)
    : nameField

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt="new user" className={classes.addUserIcon} />
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
          component={!info && "a"}
          href={!info && `https://08ba-100-10-53-128.ngrok.io/connect/facebook`}
          disabled={loading || (info && disabled)}
          onClick={() => (info ? handleComplete() : null)}
          classes={{
            root: clsx(classes.facebookSignUp, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" classes={{ root: classes.facebookText }}>
              sign up{info ? "" : " with Facebook"}
            </Typography>
          )}
        </Button>
      </Grid>
      <Grid item container justify="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <img
              src={backward}
              alt="back to login"
              className={classes.navigation}
            />
          </IconButton>
        </Grid>
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <img
                src={forward}
                alt="continue registration"
                className={classes.navigation}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}