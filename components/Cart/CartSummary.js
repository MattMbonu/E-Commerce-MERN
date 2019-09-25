import { Segment, Button, Divider } from "semantic-ui-react";

function CartSummary() {
  return (
    <>
      <Divider></Divider>
      <Segment clearing size="large">
        <strong>Sub total: </strong> $0.00
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="checkout"
        ></Button>
      </Segment>
    </>
  );
}

export default CartSummary;
