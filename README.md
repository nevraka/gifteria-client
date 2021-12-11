## Description

<hr>
Gifteria is your go-to for gifting. You can create personalized and custom gift boxes or choose from a prepacked box for friends and family.

## API routes (back-end)

<hr>
- POST /auth/signup
- body:

- name
- surname
- address
- email
- password

- renders SignUp.jsx
- redirects to "/signup" if user logged in

- POST /auth/signin

- body:

  - email
  - password

  - redirects to "/cart" if user logged in
  - renders SignUp.jsx

- POST /auth/signout

  - body: empty
  - redirect "/signup"

- GET /products/

- render Products.jsx

- GET /products/:productId

- render ProductDetails.jsx

- GET /categories

- render Categories.jsx

<!-- - GET /cart
  - render Cart.jsx -->

<!-- - POST /cart/delete

  - boxes: delete
  - redirects "/cart"

- POST /cart/upload

  - img: req.file.path
  - redirects "/cart" -->

## Models

<hr>

- User new Schema ({
  username: {
  type: String,
  required: true,
  },
  email: {
  type: String,
  required: true,
  },
  password: {
  type: String,
  required: true,
  },
  img: {
  type: String,
  default: 'images/profile.png',
  },
  products: [
  {
  type: Schema.Types.ObjectId,
  ref: 'Product',
  },
  ],
  });

- Product new Schema ({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: {
  type: Schema.Types.ObjectId,
  ref: 'Category',
  },
  });

- Category new Schema ({
  name: String,
  image: String,
  description: String,
  });

u
