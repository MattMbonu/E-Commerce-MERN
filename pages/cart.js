import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import baseUrl from "../utils/baseUrl";
import axios from "axios";

function Cart({ products }) {
  console.log(products);
  return (
    <Segment>
      <CartItemList products={products}></CartItemList>
      <CartSummary></CartSummary>
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const url = `${baseUrl}/api/cart`;
  const { token } = parseCookies(ctx);
  try {
    if (!token) return { products: [] };
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    return { products: response.data };
  } catch (error) {
    console.error(error);
  }
};

export default Cart;
