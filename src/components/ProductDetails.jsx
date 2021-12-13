import { useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const ProductDetails = ({ handleAddToCart }) => {
  const [productDetail, setProductDetail] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API_URL}/products/${productId}`, {
        withCredentials: true,
      });
      setProductDetail(response.data);
    };

    getData();
  }, [productId]);

  return (
    <div>
      <div className="title">{productDetail.name}</div>
      <div>
        <div className="home">
          <img
            className="category-image"
            src={productDetail.image}
            alt="cat"
          ></img>
          <div>{productDetail.description}</div>
          <div>${productDetail.price}</div>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
