import React from 'react'
import "./index.css";

const IndexPage = ( { data }) => (
  <div>
    <h1>Hi people 2</h1>
    <h2>Trips</h2>
    <div className="trips">
    {data.camps.edges.map((camp) => (
      <div className="trip" key={camp.node.id}>
        <div className="trip-image" style={{backgroundImage: `url(${camp.node.mainImage})`}}/>
        <div className="trip-content">
          <div className="trip-title">{camp.node.title}</div>
          <div className="trip-excerpt">{camp.node.excerpt}</div>
        </div>
      </div>
    ))}
    </div>
  </div>
)

export const query = graphql`
  query Index {
    camps: allCampsJson {
      edges {
        node {
          id
          title
          excerpt
          mainImage
          body
        }
      }
    }
  } 
`;

export default IndexPage
