import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  numOfPages,
  requestedPage,
  isAdmin = false,
  keyword = '',
}) => {
  return (
    <>
      {numOfPages > 1 && (
        <Pagination>
          {Array.from({ length: numOfPages }, (_, index) => {
            return (
              <LinkContainer
                key={index + 1}
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${index + 1}`
                      : `/page/${index + 1}`
                    : `/admin/productlist/${index + 1}`
                }
              >
                <Pagination.Item active={index + 1 === requestedPage}>
                  {index + 1}
                </Pagination.Item>
              </LinkContainer>
            );
          })}
        </Pagination>
      )}
    </>
  );
};

export default Paginate;
