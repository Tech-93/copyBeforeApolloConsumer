import React, {useState, useEffect} from 'react'
import Book from './Book'

const Books = (props) => {

  const [genre, setGenre] = useState('all genres')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  console.log('DATA', props.result.data)
  const books = props.result.data.allBooks 


  const GenreSelector = () => {

    const merged = [].concat.apply([], books.map(book => book.genres))
    const distinctGenres = [...new Set(merged.map(genre => genre))]

    
    return(
      <div>
        {distinctGenres.map(genre => <button key={genre} onClick={() => setGenre(genre) } > {genre} </button>)}
        <button onClick={() => setGenre('all genres') } > all genres </button>
      </div>
    )
  }

  const bookFilter = () => {
    if(genre === 'all genres') {
      return books.map(book => <Book key={book.title} book={book} />)
    }

    const filteredBooks = books.filter(book => book.genres.includes(genre))
    return filteredBooks.map(book => <Book key={book.title} book={book} />   )

  }



  return (
    <div>
      <h2>books</h2>

      <div> in genre {genre} </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookFilter()}
        </tbody>
      </table>

      <GenreSelector /> 

    </div>
  )
}

export default Books