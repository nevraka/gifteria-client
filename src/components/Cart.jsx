import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/app.context';
import { API_URL } from '../config';

const Cart = () => {
  const { user, setUser } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const getCart = async () => {
  //     let response = await axios.post();
  //   };
  // });
  // ------------------------------------------------
  // we make the user requst here to know if the user is logged in or not
  // try {
  //   let userResponse = await axios.get(`${API_URL}/user`, {
  //     withCredentials: true,
  //   });
  //   setFetchingUser(false);
  //   setUser(userResponse.data);
  // } catch (err) {
  //   // the request will fail if the user is not logged in
  //   setFetchingUser(false);
  // }

  useEffect(() => {
    const imageUpload = async () => {
      let response = await axios.post(
        `${API_URL}/upload`,
        {},
        { withCredentials: true }
      );
      setUser(response.data);
    };
    imageUpload();
  }, []);

  return (
    <div>
      <div>This is Cart</div>
      <div>{user && user.name}</div>
      <div>My Gifts</div>
      <form method="POST" action="/upload" enctype="multipart/form-data">
        <input
          type="file"
          name="imageUrl"
          accept="image/png, image/jpg"
        ></input>
        <button class="addImg" type="submit">
          UPLOAD
        </button>
      </form>
    </div>
  );
};
export default Cart;
