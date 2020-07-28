import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const LoginUserIcon = () => {
  const data = useStaticQuery(graphql`
    query {
      koike: file(relativePath: { eq: "koike.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return <Img fluid={data.koike.childImageSharp.fluid} className="w-8 h-8 rounded-full z-20 bg-white" />
}
export default LoginUserIcon
