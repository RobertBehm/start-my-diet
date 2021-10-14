import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { UserWrapper, FeedbackWrapper } from "../../contexts"
import theme from "./theme"

export default ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <UserWrapper>
        <FeedbackWrapper>{element}</FeedbackWrapper>
      </UserWrapper>
    </ThemeProvider>
  )
}
