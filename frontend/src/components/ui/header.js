import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import IconButton from "@material-ui/core/IconButton"
//import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
//import Hidden from "@material-ui/core/Hidden"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
//import Badge from "@material-ui/core/Badge"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"

import logo from "../../images/logo.png"

import search from "../../Icons/search.svg"
import cart from "../../Icons/cart.svg"
import account from "../../Icons/account-header.svg"
import menu from "../../Icons/menu.svg"

const useStyles = makeStyles(theme => ({
  logo: {},

  logoContainer: {
    [theme.breakpoints.down("md")]: {
      marginRight: "auto",
    },
  },
  tab: {
    ...theme.typography.body1,
    fontWeight: 500,
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    height: "3rem",
    width: "3rem",
    [theme.breakpoints.down("xs")]: {
      height: "2rem",
      width: "2rem",
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    color: "#fff",
  },
  badge: {
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: theme.palette.secondary,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem",
      height: "1.1rem",
      width: "1.1rem",
      minWidth: 0,
    },
  },
}))

export default function Header() {
  const classes = useStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [value, setValue] = useState(0)

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === "/shop" && value !== 1) {
      setValue(1)
    } else if (window.location.pathname === "/contact" && value !== 2) {
      setValue(2)
    }
  }, [value])

  const tabs = (
    <Tabs
      value={value}
      className={classes.tabs}
      onChange={handleChange}
      indicatorColor="transparent"
    >
      <Tab className={classes.tab} label="Home" to="/" component={Link} />
      <Tab className={classes.tab} label="Shop" to="/shop" component={Link} />
      <Tab
        className={classes.tab}
        label="Contact Us"
        to="/contact"
        component={Link}
      />
    </Tabs>
  )

  const drawer = (
    <SwipeableDrawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(FontFaceSetLoadEvent)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      classes={{ paper: classes.drawer }}
    >
      <List disablePadding>
        <ListItem
          onClick={() => {
            setDrawerOpen(false)
            setValue(0)
          }}
          component={Link}
          to="/"
          divider
          button
        >
          <ListItemText
            className={
              value === 0
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
          >
            Home
          </ListItemText>
        </ListItem>
        <ListItem
          onClick={() => {
            setDrawerOpen(false)
            setValue(1)
          }}
          component={Link}
          to="/shop"
          divider
          button
        >
          <ListItemText
            className={
              value === 1
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
          >
            Shop
          </ListItemText>
        </ListItem>
        <ListItem
          onClick={() => {
            setDrawerOpen(false)
            setValue(2)
          }}
          component={Link}
          to="/contact"
          divider
          button
        >
          <ListItemText
            className={
              value === 2
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
          >
            Contact Us
          </ListItemText>
        </ListItem>
      </List>
    </SwipeableDrawer>
  )

  const actions = [
    {
      icon: search,
      alt: "search",
      visible: true,
      onClick: () => console.log("search"),
    },
    { icon: cart, alt: "cart", visible: true, link: "/cart" },
    { icon: account, alt: "account", visible: !matchesMD, link: "/account" },
    {
      icon: menu,
      alt: "menu",
      visible: matchesMD,
      onClick: () => setDrawerOpen(true),
    },
  ]

  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Button
          component={Link}
          to="/"
          disableRipple
          className={classes.logoContainer}
        >
          <img
            alt="company logo"
            className={classes.logo}
            component={Link}
            to="home"
            src={logo}
          />
        </Button>
        {matchesMD ? drawer : tabs}
        {actions.map(action => {
          if (action.visible) {
            return (
              <IconButton
                onClick={action.onClick}
                key={action.alt}
                component={action.onClick ? undefined : Link}
                to={action.onClick ? undefined : action.link}
              >
                <img
                  className={classes.icon}
                  src={action.icon}
                  alt={action.alt}
                />
              </IconButton>
            )
          }
        })}
      </Toolbar>
    </AppBar>
  )
}
