import { useQuery, gql } from '@apollo/client';
import Chapters from '../Chapters/Chapters';
// import { NavLink } from 'react-router-dom';
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
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.viewer.books.hits.map(({ id, displayTitle }) => (
    <div key={id}>
      <h3>{displayTitle}</h3>
      <span className='chapitre'>Chapitres du livre : </span>
      <br />
      <Chapters bookId={id} />
    </div>
  ));
}
