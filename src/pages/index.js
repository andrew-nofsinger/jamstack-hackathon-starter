import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  state = { loading: false, msg: null }
  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/token-hider")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.message }))
  }

  render() {
    const { loading, msg } = this.state
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p>
              Welcome to your new Gatsby + Netlify Functions + Netlify Identity
              site
            </p>
            <ul>
              <li>
                This site has statically generated marketing pages like this one
                and <Link to="/page-2/">page 2.</Link>{" "}
              </li>
              <li>
                It also has a dynamically generated clientside app guarded by
                authentication:
                <ul>
                  <li>
                    <Link to="/app/">
                      <b>Go to App (with Netlify Identity)</b>
                    </Link>{" "}
                  </li>
                </ul>
              </li>
              <li>
                You can{" "}
                <a href="https://github.com/sw-yx/jamstack-hackathon-starter">
                  view source here
                </a>
              </li>
              <li>
                or see{" "}
                <a href="https://youtu.be/bueXJInQt2c">
                  the Youtube walkthrough
                </a>
              </li>
              <li>
                or
                <a href="https://app.netlify.com/start/deploy?repository=https://github.com/sw-yx/jamstack-hackathon-starter&stack=cms">
                  <img
                    src="https://www.netlify.com/img/deploy/button.svg"
                    alt="Deploy to Netlify"
                  />
                </a>
              </li>
            </ul>
            <hr />
            <p>
              You can still access Netlify functions even on static "marketing
              pages". This function is available at{" "}
              <a href="/.netlify/functions/token-hider">
                <code>/.netlify/functions/token-hider</code>
              </a>{" "}
              and it uses an API_SECRET environment variable that is hidden from
              the frontend!
            </p>
            <button onClick={this.handleClick}>
              {loading ? "Loading..." : "Call Lambda Function"}
            </button>
            <br />

            {msg ? (
              <img src={msg[Math.floor(Math.random() * 10)]} alt="dog"></img>
            ) : (
              <pre>"Click the button and watch this!"</pre>
            )}
          </div>
          <div
            style={{
              borderLeft: "brown",
              borderLeftStyle: "dashed",
              paddingLeft: "3rem",
            }}
          >
            <p>Now go build something great.</p>
            <div style={{ maxWidth: "300px", marginBottom: "1.45rem" }}>
              <Image />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage;

export const fluidImage = graphql`
fragment fluidImage on File {
  childImageSharp {
    fluid(maxWidth: 1000) {
      ...GatsbyImageSharpFluid
    }
  }
}
`;
export const pageQuery = graphql`
  query {
    imageOne: file(relativePath: { eq: "placeholder2.jpg" }) {
      ...fluidImage
    }
    imageTwo: file(relativePath: { eq: "placeholder4.jpg" }) {
      ...fluidImage
    }
    imageThree: file(relativePath: { eq: "placeholder5.jpg" }) {
      ...fluidImage
    }
  }
