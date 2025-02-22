import { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from "../../context/StoreContext"

const Cart = () => {

  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  return (
    <>
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className='cart-items-title1'>Items</p>
          <p className='cart-items-title2'>Title</p>
          <p className='cart-items-title3'>Price</p>
          <p className='cart-items-title4'>Quantity</p>
          <p className='cart-items-title5'>Total</p>
          <p className='cart-items-title6'>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div className="">
                  <div className='cart-items-title cart-items-item'>
                    <img className='cart-item-image' src={item.image} alt="" />
                    <p className='cart-item-name'>{item.name}</p>
                    <p className='cart-item-price'>${item.price}</p>
                    <p className='cart-item-quantity'>{cartItems[item._id]}</p>
                    <p className='cart-item-total'>${item.price * cartItems[item._id]}</p>
                    <p className='cross-div'><span onClick={() => removeFromCart(item._id)} className='cross'><i class="ri-close-large-line cross"></i></span></p>
                  </div>
                  <hr />  
                </div>
              </>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{0}</b>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Cart