import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { getAllProducts } from "../../api/Api";
function Products() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      (res) => res.json().then((json) => console.log(json));
      setItems(res.products);
    });
  }, []);
  return (
    <div>
      <List
        dataSource={items}
        renderItem={(product, index) => {
          return <Card title={product.title}></Card>;
        }}
      ></List>
    </div>
  );
}

export default Products;
