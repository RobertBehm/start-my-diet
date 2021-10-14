import * as React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
//import { Link } from "gatsby"

import Layout from "../components/ui/layout"
//import { IconButton } from "@material-ui/core"
//import Seo from "../components/seo"

const ShopPage = () => (
  <Layout>
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Button color="secondary" variant="contained">
          Aminos
        </Button>
      </Grid>
      <Grid item>
        <Button color="secondary" variant="contained">
          Proteins
        </Button>
      </Grid>
      <Grid item>
        <Button color="secondary" variant="contained">
          Weight Loss
        </Button>
      </Grid>
    </Grid>
  </Layout>
)

export default ShopPage
