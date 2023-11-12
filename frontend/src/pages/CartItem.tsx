import { useContext } from "react";
import { IProduct } from "../models/interface";
import { IShopContext, ShopContext } from "../context/shopContext";

interface Props {
  product: IProduct;
}

const CartItem = (props: Props) => {
  const { _id, imageURL, productName, price } = props.product;

  const { getCartItemCount, addToCart, removeFromCart, updateCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div className="cart-item">
      {" "}
      <img src={imageURL} alt="image" />
      <div className="description">
        <h3>{productName}</h3> <p>Price: ${price}</p>
      </div>
      <div className="count-handler">
        <button onClick={() => removeFromCart(_id)}>-</button>
        <input
          type="number"
          value={cartItemCount}
          onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
        />
        <button onClick={() => addToCart(_id)}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
