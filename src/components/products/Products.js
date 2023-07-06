import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addcart, increment } from "../../actions/counter";
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
  const updateLocalStorage = useSelector((state) => state.updateLocalStorage);

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
  const [addCart, setAddCart] = useState(false);
  const dispatch = useDispatch();
  const addBudgeToCart = () => {
    dispatch(addcart(addCart));
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
    const itemOld = localStorage.getItem("itemslocal")
      ? JSON.parse(localStorage.getItem("itemslocal"))
      : [];
    itemOld.push(item);
    localStorage.setItem("itemslocal", JSON.stringify(itemOld));
  };
  return (
    <Button type="link" onClick={addBudgeToCart} loading={loading}>
      Add to Cart
    </Button>
  );
}
export default Products;
