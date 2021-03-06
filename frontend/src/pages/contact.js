import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import clsx from "clsx"
import { Link } from "gatsby"

import address from "../icons/address.svg"
import Email from "../icons/emailAdornment"
import send from "../icons/send.svg"
import nameAdornment from "../Icons/name-adornment.svg"
import PhoneAdornment from "../Icons/PhoneAdornment"

import Layout from "../components/ui/layout"
import validate from "../components/ui/validate"
//import Seo from "../components/seo"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: "40rem",
    backgroundColor: theme.palette.primary.main,
    marginTop: "8rem",
    height: "45rem",
  },
  formWrapper: {
    height: "100%",
  },
  formContainer: {
    height: "100%",
  },
  blockContainer: {
    height: "6rem",
    width: "30rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
  },
  titleContainer: {
    marginTop: "-2.75rem",
  },
  buttonContainer: {
    marginBottom: "-2.75rem",
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  sendIcon: {
    marginLeft: "2rem",
  },
  contactInfo: {
    fontSize: "1.5rem",
    marginLeft: "1rem",
  },
  contactIcon: {
    height: "3rem",
    width: "3rem",
  },
  contactEmailIcon: {
    height: "2.25rem",
    width: "3rem",
  },
  infoContainer: {
    height: "21.25rem",
  },
  middleInfo: {
    borderTop: "2px solid #fff",
    borderBottom: "2px solid #fff",
  },
  iconContainer: {
    borderRight: "2px solid #fff",
    height: "7rem",
    width: "8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "30rem",
  },
  input: {
    color: "#fff",
  },
  fieldContainer: {
    marginBottom: "1rem",
  },
  multilineContainer: {
    marginTop: "1rem",
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: "10px",
  },
  phoneAdornment: {
    width: 25.173,
    height: 25.122,
  },
  multiline: {
    border: "2px solid #fff",
    borderRadius: 10,
    padding: "1rem",
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main} `,
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before":
      {
        borderBottom: "2px solid #fff",
      },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid #fff`,
    },
  },
}))

const ContactPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})

  return (
    <Layout>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        classes={{ root: classes.mainContainer }}
      >
        {/* Contact Form */}
        <Grid item classes={{ root: classes.formWrapper }}>
          <Grid
            container
            classes={{ root: classes.formContainer }}
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid
              item
              classes={{
                root: clsx(classes.titleContainer, classes.blockContainer),
              }}
            >
              <Typography variant="h4">Contact Us</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item classes={{ root: classes.fieldContainer }}>
                  <TextField
                    value={name}
                    onChange={e => {
                      if (errors.name) {
                        const valid = validate({ name: e.target.value })
                        setErrors({ ...errors, name: !valid.name })
                      }
                      setName(e.target.value)
                    }}
                    onBlur={e => {
                      const valid = validate({ name })
                      setErrors({ ...errors, name: !valid.name })
                    }}
                    error={errors.name}
                    helperText={errors.name && "you must enter a name"}
                    placeholder="Name"
                    classes={{ root: classes.textField }}
                    InputProps={{
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={nameAdornment} alt="name" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.fieldContainer }}>
                  <TextField
                    value={email}
                    onChange={e => {
                      if (errors.email) {
                        const valid = validate({ email: e.target.value })
                        setErrors({ ...errors, email: !valid.email })
                      }
                      setEmail(e.target.value)
                    }}
                    onBlur={e => {
                      const valid = validate({ email })
                      setErrors({ ...errors, email: !valid.email })
                    }}
                    error={errors.email}
                    helperText={errors.email && "invalid email"}
                    placeholder="Email"
                    classes={{ root: classes.textField }}
                    InputProps={{
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div className={classes.emailAdornment}>
                            <Email color={theme.palette.secondary.main} />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.fieldContainer }}>
                  <TextField
                    value={phoneNumber}
                    onChange={e => {
                      if (errors.phone) {
                        const valid = validate({ phone: e.target.value })
                        setErrors({ ...errors, phone: !valid.phone })
                      }
                      setPhoneNumber(e.target.value)
                    }}
                    onBlur={e => {
                      const valid = validate({ phone: phoneNumber })
                      setErrors({ ...errors, phone: !valid.phone })
                    }}
                    error={errors.phone}
                    helperText={errors.phone && "invalid phone number"}
                    placeholder="Phone"
                    classes={{ root: classes.textField }}
                    InputProps={{
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div className={classes.phoneAdornment}>
                            <PhoneAdornment
                              color={theme.palette.secondary.main}
                            />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item classes={{ root: classes.multilineContainer }}>
                  <TextField
                    value={message}
                    onChange={e => {
                      if (errors.message) {
                        const valid = validate({ message: e.target.value })
                        setErrors({ ...errors, message: !valid.message })
                      }
                      setMessage(e.target.value)
                    }}
                    onBlur={e => {
                      const valid = validate({ message })
                      setErrors({ ...errors, message: !valid.message })
                    }}
                    error={errors.message}
                    helperText={errors.message && "you must enter a message"}
                    placeholder="Message"
                    multiline
                    rows={6}
                    classes={{ root: classes.textField }}
                    InputProps={{
                      disableUnderline: true,
                      classes: {
                        input: classes.input,
                        multiline: classes.multiline,
                        error: classes.multilineError,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              component={Button}
              disabled={
                Object.keys(errors).some(error => errors[error] === true) ||
                Object.keys(errors).length !== 4
              }
              classes={{
                root: clsx(classes.buttonContainer, classes.blockContainer),
              }}
            >
              <Typography variant="h4">send message</Typography>
              <img src={send} alt="send message" className={classes.sendIcon} />
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Grid item>
          <Grid
            container
            direction="column"
            justify="space-between"
            classes={{ root: classes.infoContainer }}
          >
            <Grid item container alignItems="center">
              <Grid item classes={{ root: classes.iconContainer }}>
                <img
                  className={classes.contactIcon}
                  src={address}
                  alt="address"
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  classes={{ root: classes.contactInfo }}
                >
                  1478 Atwood Ave STE 210, Johnston, RI 02919
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              classes={{ root: classes.middleInfo }}
            >
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactIcon}>
                  <PhoneAdornment />
                </div>
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  classes={{ root: classes.contactInfo }}
                >
                  (401) 632-9326
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactEmailIcon}>
                  <Email color="#fff" />
                </div>
              </Grid>
              <Grid item>
                <Typography
                  variant="h2"
                  classes={{ root: classes.contactInfo }}
                >
                  startmydiet@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
