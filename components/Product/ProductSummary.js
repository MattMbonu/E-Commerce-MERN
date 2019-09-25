import {
  ItemGroup,
  Item,
  ItemImage,
  ItemContent,
  ItemHeader,
  ItemDescription,
  ItemExtra,
  Label
} from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";

function ProductSummary({ name, mediaUrl, _id, price, sku, user }) {
  return (
    <ItemGroup>
      <Item>
        <ItemImage size="medium" src={mediaUrl}></ItemImage>
        <ItemContent>
          <ItemHeader>{name}</ItemHeader>
          <ItemDescription>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </ItemDescription>
          <ItemExtra>
            <AddProductToCart user={user} productId={_id}></AddProductToCart>
          </ItemExtra>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}

export default ProductSummary;
