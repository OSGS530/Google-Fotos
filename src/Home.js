import React from 'react'
import {Link} from 'react-router-dom'

export const Home = ({albums}) => {

  return <>
      <h1>Albums:</h1> 
      <section>
        {albums.map((album) => (
          <Link to={`/${album.id}`} className="linknormal">
            <aside key={album.name}>
              <img src={album.images ? album.images[0].url : ""} alt="album" />
              <h3>{album.name}</h3>
            </aside>
          </Link>
        ))}
      </section>
      
  </>
}