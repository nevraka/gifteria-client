import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/app.context';
import { API_URL } from '../config.js';
import Stack from '@mui/material/Stack';
import './cart.css';
import { Spinner } from 'react-bootstrap';

const Cart = ({ handleDelete, handleEdit }) => {
  const { user, cart, setCart } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const getCart = async () => {
        let response = await axios.get(`${API_URL}/cart`, {
          withCredentials: true,
        });
        console.log(cart);
        setCart(response.data);
      };
      getCart();
    }
  }, [user]);

  if (!user) {
    return <Spinner animation="grow" variant="dark" />;
  }

  return (
    <div>
      <div className="profile">
        <div>{user && user.name}'s Profile</div>
      </div>
      <div class="gifts">
        <div>
          <Stack spacing={2}>
            {cart &&
              cart.map((c) => {
                if (c.product === null) {
                  return null;
                }
                console.log(c);
                return (
                  <>
                    <div className="information">
                      <h3>{c.product.name}</h3>

                      <p>Total: ${(c.quantity * c.product.price).toFixed(2)}</p>
                      <div className="buttons">
                        <button
                          size="small"
                          disableElevation
                          variant="contained"
                          onClick={() =>
                            c.quantity === 1
                              ? handleDelete(c.product._id)
                              : handleEdit(c.product._id, c.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <p>{c.quantity}</p>
                        <button
                          size="small"
                          disableElevation
                          variant="contained"
                          onClick={() =>
                            handleEdit(c.product._id, c.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <img
                          src="./image/delete.png"
                          alt="delete"
                          style={{ height: '30px', cursor: 'pointer' }}
                          onClick={() => handleDelete(c.product._id)}
                        ></img>
                      </div>
                      <img
                        className="cart-image"
                        src={c.product.image}
                        alt={c.product.name}
                      />
                    </div>
                  </>
                );
              })}
          </Stack>
        </div>
      </div>
    </div>
  );
};
export default Cart;
