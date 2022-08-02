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
  const [subjectsBooks, setSubjectsBooks] = useState('');
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  function handleChapter(id) {
    setShowChapters(id);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <span className='levels'>Classement par niveaux</span>
      <button type='button' onClick={() => setSubjectsBooks('6ème')}>
        6ème
      </button>
      <button type='button' onClick={() => setSubjectsBooks('5ème')}>
        5ème
      </button>
      <button type='button' onClick={() => setSubjectsBooks('4ème')}>
        4ème
      </button>
      <button type='button' onClick={() => setSubjectsBooks('3ème')}>
        3ème
      </button>
      <button type='button' onClick={() => setSubjectsBooks('2de')}>
        2de
      </button>
      <button type='button' onClick={() => setSubjectsBooks('1re')}>
        1re
      </button>
      <button type='button' onClick={() => setSubjectsBooks('1re Bac Pro')}>
        1re Bac Pro
      </button>
      <button type='button' onClick={() => setSubjectsBooks('Terminale')}>
        Terminale
      </button>
      <button
        type='button'
        onClick={() => setSubjectsBooks('Terminale Bac Pro')}
      >
        Terminale Bac Pro
      </button>
      {data.viewer.books.hits
        .filter(
          ({ valid, levels }) =>
            valid === true && levels[0].name.includes(subjectsBooks)
        )
        .sort((a, b) => (a.subjects[0].name > b.subjects[0].name ? 1 : -1))
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
        ))}
    </div>
  );
}

// && a.levels.name > b.levels.name
//         ? 1
//         : -1
