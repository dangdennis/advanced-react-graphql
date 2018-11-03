import React from "react";
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

export default function Pagination() {
  return (
    <PaginationStyles>
      <p>Hi, I am pagination</p>
      <Query query={PAGINATION_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          const count = data.itemsConnection.aggregate.count;
          const pages = Math.ceil(count / perPage);
          return <p>Page 1 of {pages}!</p>;
        }}
      </Query>
    </PaginationStyles>
  );
}
