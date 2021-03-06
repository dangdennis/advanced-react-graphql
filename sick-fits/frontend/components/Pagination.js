import React from "react";
import Link from "next/link";
import Head from "next/head";
import PaginationStyles from "../components/styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export default function Pagination(props) {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;

        return (
          <PaginationStyles data-test="pagination">
            <Head>
              <title>
                Sick Fits! - Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: "items",
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                Prev
              </a>
            </Link>
            <p>
              Page {page} of <span data-test="total-pages">{pages}</span>
            </p>
            <p>{count} Items Total</p>
            <Link
              href={{
                pathname: "items",
                query: { page: page + 1 }
              }}
            >
              <a className="next" aria-disabled={page >= pages}>
                Next
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
}

export { PAGINATION_QUERY };
