import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  List,
  Image,
  Typography,
  ellipsis,
  Badge,
  Rate,
  Button,
  message,
  Spin,
} from "antd";
import {
  getAllProducts,
  addToCart,
  getProductsByCategory,
} from "../../api/Api";
import Paragraph from "antd/es/typography/Paragraph";
function Products() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const param = useParams();
  console.log(param.categoryId);
  useEffect(() => {
    setLoading(true);
    (param.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    )
      .then((res) => res.json())
      .then((items) => setItems(items.products));
    console.log(loading);
    setLoading(false);
  }, [param]);
  if (loading) {
    return <Spin spinning />;
  }
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={`${product.discountPercentage}% Off`}
              color="cyan"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating}></Rate>,
                  <AddToCart item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

function AddToCart({ item }) {
  const [loading, setLoading] = useState(false);
  const addBudgeToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };
  return (
    <Button type="link" onClick={addBudgeToCart} loading={loading}>
      Add to Cart
    </Button>
  );
}
export default Products;
