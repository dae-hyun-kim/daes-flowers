require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  SELECT "productId",
          "name",
          "price",
          "image",
          "shortDescription"
  FROM "products"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    }).catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = req.params.productId;
  const sql = `
  SELECT *
  FROM "products"
  WHERE "productId" = $1
  `;
  if (productId < 0) {
    next(new ClientError(`${productId} is not a valid Product ID`, 400));
  } else {
    db.query(sql, [productId])
      .then(result => {
        const productDetails = result.rows[0];
        if (!productDetails) {
          next(new ClientError(`Cannot ${req.method} Product with ID: ${productId}`, 404));
        } else {
          res.status(200).json(productDetails);
        }
      }).catch(err => next(err));
  }
});

app.get('/api/cart', (req, res, next) => {
  const sqlExist = `
  SELECT "cartItems"."cartItemId",
          "cartItems"."price",
          "products"."productId",
          "products"."image",
          "products"."name",
          "products"."shortDescription"
  FROM "cartItems"
  JOIN "products" USING ("productId")
  WHERE "cartItems"."cartId" = $1
  `;

  if (!req.session.cartId) {
    return res.json([]);
  } else {
    return (
      db.query(sqlExist, [req.session.cartId])
        .then(result => {
          const cartContent = result.rows;
          res.status(200).json(cartContent);
        })
    );
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  const sql = `
  SELECT "price"
  FROM "products"
  WHERE "productId" = $1
  `;
  if (parseInt(productId) < 0 || !productId) {
    next(new ClientError(`${productId} is not a Valid Product ID`, 400));
  } else {
    db.query(sql, [productId])
      .then(result => {
        const productIdCheck = result.rows;
        if (!productIdCheck) {
          throw new ClientError('That is an invalid request');
        } else {
          const insertNewCartSQL = `
              INSERT INTO "carts" ("cartId", "createdAt")
              VALUES (default, default)
              RETURNING "cartId"
            `;
          if (!req.session.cartId) {
            return (
              db.query(insertNewCartSQL)
                .then(result => {
                  return (
                    {
                      cartId: result.rows[0].cartId,
                      price: productIdCheck[0].price
                    }
                  );
                })
            );
          } else {
            return (
              {
                cartId: req.session.cartId,
                price: productIdCheck[0].price
              }
            );
          }
        }
      })
      .then(result => {
        const resultCartID = result.cartId;
        const resultPrice = result.price;
        req.session.cartId = resultCartID;
        const insertCartItemsSQL = `
          INSERT INTO "cartItems" ("cartId", "productId", "price")
          VALUES ($1, $2, $3)
          RETURNING "cartItemId"
        `;
        return (
          db.query(insertCartItemsSQL, [resultCartID, productId, resultPrice])
            .then(result => {
              return (result.rows[0].cartItemId);
            })
        );
      })
      .then(result => {
        const cartItemId = result;
        const cartItemInformationSQL = `
        SELECT "cartItems"."cartItemId",
                "cartItems"."price",
                "products"."productId",
                "products"."image",
                "products"."name",
                "products"."shortDescription"
        FROM "cartItems"
        JOIN "products" USING ("productId")
        WHERE "cartItems"."cartItemId" = $1
        `;
        return (
          db.query(cartItemInformationSQL, [cartItemId])
            .then(result => {
              const cartItemInformation = result.rows[0];
              res.status(201).json(cartItemInformation);
            }));
      })
      .catch(err => next(err));
  }
});

app.post('/api/orders', (req, res, next) => {
  const customerCartId = req.session.cartId;
  const customerName = req.body.name;
  const customerCreditCard = req.body.creditCard;
  const customerAddress = req.body.shippingAddress;
  if (!customerCartId) {
    next(new ClientError('Cart ID is Invalid', 400));
  } else if (!customerName) {
    next(new ClientError('Please Enter A Name.', 400));
  } else if (!customerCreditCard) {
    next(new ClientError('Please Enter A Valid Credit Card'), 400);
  } else if (!customerAddress) {
    next(new ClientError('Please enter A Valid Address'), 400);
  } else {
    const customerInfoSQL = `
    INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
    VALUES ($1, $2, $3, $4)
    RETURNING "orderId", "createdAt", "name", "creditCard", "shippingAddress"
    `;
    return (
      db.query(customerInfoSQL, [customerCartId, customerName, customerCreditCard, customerAddress])
        .then(result => {
          const customerInfo = result.rows[0];
          delete req.session.cartId;
          return (
            res.status(201).json(customerInfo)
          );
        }).catch(err => next(err))
    );
  }
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const cartItemId = req.params.cartItemId;
  const deleteSQL = `
  DELETE FROM "cartItems"
  WHERE "cartItemId" = $1
  RETURNING *
  `;

  db.query(deleteSQL, [cartItemId])
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json(`Cannot find Cart Item with ID: ${cartItemId}`);
      } else {
        res.status(204).json(`Item with cart item ID ,${cartItemId}, has been deleted`);
      }
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
