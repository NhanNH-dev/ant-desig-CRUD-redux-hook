import React from "react";
import { Col, Row, Pagination } from "antd";
import "./styles.less";
import Product from "../Product";
import { useState } from "react";
function ContentProducts({ arrBooks }) {
  const [current, setCurrent] = useState(1);
  const [nextPage, setNextPage] = useState({
    _start: 0,
    _limit: 4,
  });
  const pageSize = 4;

  const onChange = (page) => {
    setNextPage({
      _start: (page - 1) * 4,
      _limit: pageSize * page,
    });
    setCurrent(page);
  };
  const list = arrBooks.slice(nextPage._start, nextPage._limit);
  return (
    <div className="site-card-wrapper">
      <Row gutter={0}>
        {list.map((book, index) => {
          return (
            <Col
              className="set_padding_bottom_cart"
              sm={{ span: 12 }}
              md={{ span: 6 }}
              key={index}
            >
              <Product book={book} />
            </Col>
          );
        })}
      </Row>

      <Pagination
        style={{ textAlign: "center" }}
        current={current}
        onChange={onChange}
        total={arrBooks.length}
        defaultPageSize={nextPage._limit}
      />
    </div>
  );
}

export default ContentProducts;
