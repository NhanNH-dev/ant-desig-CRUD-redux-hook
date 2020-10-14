import React from "react";
import { Card, Button, Typography, Rate } from "antd";
import { useDispatch } from "react-redux";
import { LikeOutlined } from "@ant-design/icons";
import "./styles.less";
import { addToCart } from "../../actions/cart";

function Product({ book }) {
  const dispatch = useDispatch();

  const handleAddToCart = (book) => {

    // add object product
    const newBook = {
      id: book.id,
      url: book.url,
      book_name: book.book_name,
      newprice: book.newprice,
      quantity: book.quantity,
    };
    //dispacth action
    const action = addToCart(newBook);
    return dispatch(action);
  };

  return (
    <Card
      className="set_margin_product"
      hoverable
      style={{ width: 210 }}
      cover={
        <img
          style={{ height: 250 }}
          src={require(`../../assets/` + book.url + `.jpg`)}
          alt={book.url}
        />
      }
    >
      <Typography className="book_name">{book.book_name}</Typography>
      <Rate className="rate_start" allowHalf defaultValue={book.start} />{" "}
      &nbsp;&nbsp;{" "}
      <span>
        ( <LikeOutlined style={{ color: "blue" }} />
        &nbsp;
        {book.like} )
      </span>
      <Button
        className="btn_add_to_cart"
        block
        type="primary"
        // onClick={() => dispatch({ type: "ADD_TO_CART", payload: book })}
        onClick={() => handleAddToCart(book)}
      >
        Add to Cart
      </Button>
      <div className="old_new_price">
        <b>{book.author}</b>
        <span>
          <span className="old_price">${book.oldprice}</span>&nbsp;&nbsp;
          <span className="new_price">${book.newprice}</span>
        </span>
      </div>
    </Card>
  );
}

export default Product;
