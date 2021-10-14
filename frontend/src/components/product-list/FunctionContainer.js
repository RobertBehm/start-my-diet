import React from "react"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import Sort from "./Sort"
import Filter from "./Filter"

import filter from "../../icons/filter.svg"
import sort from "../../icons/sort.svg"

const useStyles = makeStyles(theme => ({
  functionContainer: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: "6rem",
    height: "auto",
    borderRadius: ({ option }) =>
      option !== null ? "10px" : "10px 10px 0px 0px",
  },
}))

export default function FunctionContainer({
  filterOptions,
  option,
  setOption,
}) {
  const classes = useStyles({ option })

  const content = () => {
    switch (option) {
      case "sort":
        return <Sort setOption={setOption} />
      case "filter":
        return <Filter setOption={setOption} filterOptions={filterOptions} />
      default:
        const items = [
          { icon: filter, alt: "filter" },
          { icon: sort, alt: "sort" },
        ]
        return (
          <Grid item container justify="space-around" alignItems="center">
            {items.map(item => (
              <Grid item key={item.alt}>
                <IconButton onClick={() => setOption(item.alt)}>
                  <img src={item.icon} alt={item.alt} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )
    }
  }

  return (
    <Grid item container classes={{ root: classes.functionContainer }}>
      {content()}
    </Grid>
  )
}
