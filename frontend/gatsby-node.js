/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        products: allStrapiProduct {
          edges {
            node {
              name
              strapiId
              category {
                name
              }
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              name
              strapiId
              description
              filterOptions {
                Size {
                  checked
                  label
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const products = result.data.products.edges
  const categories = result.data.categories.edges

  products.forEach(product => {
    createPage({
      path: `/${product.node.category.name.toLowerCase()}/${product.node.name
        .split(" ")[0]
        .toLowerCase()}`,
      component: require.resolve("./src/templates/ProductDetail.js"),
      context: {
        name: product.node.name,
        //id: product.node.strapiId,
        //category: product.node.category.name,
        //description: product.node.description,
        //variants: product.node.variants,
        //product: product,
      },
    })
  })

  categories.forEach(category => {
    createPage({
      path: `/${category.node.name.toLowerCase()}`,
      component: require.resolve("./src/templates/ProductList.js"),
      context: {
        name: category.node.name,
        description: category.node.description,
        id: category.node.strapiId,
        filterOptions: category.node.filterOptions,
      },
    })
  })
}
