import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import Chapters from '../Chapters/Chapters';
const BOOKS_QUERY = gql`
  query BOOKS_QUERY {
    viewer {
      books {
        hits {
          id
          displayTitle
          url
          subjects {
            name
          }
          levels {
            name
          }
          valid
        }
      }
    }
  }
`;

export default function Books() {
  const [showChapters, setShowChapters] = useState('');
  function handleChapter(id) {
    setShowChapters(id);
  }
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.viewer.books.hits
    .filter(({ valid }) => valid === true)
    .sort((a, b) =>
      a.subjects.name > b.subjects.name
        ? 1
        : -1 && a.levels.name > b.levels.name
        ? 1
        : -1
    )
    .map(({ id, displayTitle, url }) => (
      <div key={id}>
        <h3>{displayTitle}</h3>
        <img src={url} alt='cover' className='cover' />
        <br />

        <button id={id} type='button' onClick={(e) => handleChapter(id, e)}>
          Montrer les chapitres
        </button>
        {showChapters === id && <Chapters bookId={id} />}

        <br />
      </div>
    ));
}
