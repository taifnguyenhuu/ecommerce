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
  Select,
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
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    setLoading(true);
    (param.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    )
      .then((res) => res.json())
      .then((items) => setItems(items.products));

    setLoading(false);
  }, [param]);
  if (loading) {
    return <Spin spinning />;
  }

  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const aLowerCaseTitle = a.title.toLowerCase();
      const bLowerCaseTitle = b.title.toLowerCase();

      if (sortOrder === "az") {
        return aLowerCaseTitle > bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (sortOrder === "za") {
        return aLowerCaseTitle < bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (sortOrder === "lowHigh") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "highLow") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }
    });
    return sortedItems;
  };
  return (
    <div className="productsContainer">
      <div className="productSort">
        <Typography.Text>View Items Sorted By: </Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"az"}
          options={[
            {
              label: "a-z",
              value: "az",
            },
            {
              label: "z-a",
              value: "za",
            },
            {
              label: "Low to High",
              value: "lowHigh",
            },
            {
              label: "High to Low",
              value: "highLow",
            },
          ]}
        ></Select>
      </div>
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
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
}

function AddToCart({ item }) {
  const [loading, setLoading] = useState(false);

  const addBudgeToCart = () => {
    if (localStorage.getItem("items") == null) {
      localStorage.setItem("items", "[]");
    }
    const itemOld = JSON.parse(localStorage.getItem("items"));
    itemOld.push(item);
    localStorage.setItem("items", JSON.stringify(itemOld));
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
