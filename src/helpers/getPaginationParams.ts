export default function getPaginationParams(
  query: any
): [page: number, perPage: number] {
  const { page, perPage } = query;

  const pageNumber =
    typeof page === "string" && parseInt(page, 10) > 0
      ? parseInt(page, 10)
      : 10;

  const perPageNumber =
    typeof perPage === "string" && parseInt(perPage, 10) > 0
      ? parseInt(perPage, 10)
      : 1;

  return [pageNumber, perPageNumber];
}
