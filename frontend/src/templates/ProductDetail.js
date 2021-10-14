import React from "react"
import Layout from "../components/ui/layout"

export default function ProductDetail({ pageContext }) {
  return <Layout>{pageContext.name}</Layout>
}
