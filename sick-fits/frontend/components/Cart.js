import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import User from './User';
import CloseButton from './styles/CloseButton';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

export const LOCAL_CART_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return null;
        console.log(me);
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => {
              return (
                <Query query={LOCAL_CART_QUERY}>
                  {({ data }) => {
                    return (
                      <CartStyles open={data.cartOpen}>
                        <header>
                          <CloseButton title="close" onClick={toggleCart}>
                            &times;
                          </CloseButton>
                          <Supreme>{me.name}'s Cart</Supreme>
                          <p>
                            You Have {me.cart.length} Item{me.cart.length == 1 ? '' : 's'} in your
                            cart.
                          </p>
                          <ul>
                            {me.cart.map(cartItem => (
                              <CartItem key={cartItem.id} cartItem={cartItem} />
                            ))}
                          </ul>
                        </header>

                        <footer>
                          <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                          <SickButton>Checkout</SickButton>
                        </footer>
                      </CartStyles>
                    );
                  }}
                </Query>
              );
            }}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
