import { useQuery, gql } from '@apollo/client';

const CHAPTERS_QUERY = gql`
  query CHAPTERS_QUERY($bookId: Int) {
    viewer {
      chapters(bookIds: [$bookId]) {
        hits {
          id
          title
          url
          valid
        }
      }
    }
  }
`;

export default function Chapters({ bookId }) {
  const { loading, error, data } = useQuery(CHAPTERS_QUERY, {
    variables: { bookId },
  });
  console.log(bookId);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.viewer.chapters.hits.map(({ id, title }) => (
    <div key={id}>
      <h5>{title}</h5>
    </div>
  ));
}
