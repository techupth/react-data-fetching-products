import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productData, setProductData] = useState([]);
  const [status, setStatus] = useState("loading"); 

  async function getData() {
    try {
      setStatus("loading"); // เริ่มโหลด
      const response = await axios.get("http://localhost:4001/products");
      setProductData(response.data.data);
      setStatus("success"); // โหลดเสร็จ
    } catch (error) {
      console.error("Fetching error:", error);
      setStatus("error"); // โหลดไม่สำเร็จ
    }
  }

  async function handleDelete(deleteIndex) {
    const newProductData = productData.filter(
      (item, index) => index !== deleteIndex
    );
    setProductData(newProductData);
  }

  useEffect(() => {
    getData();
  }, []);

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (status === "error") {
    return <h2>Fetching Error...</h2>;
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {productData.map((item, index) => (
        <div className="product-list" key={index}>
          <div className="product">
            <div className="product-preview">
              <img
                src={item.image}
                alt="some product"
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {item.name}</h1>
              <h2>Product price: {item.price} Baht</h2>
              <p>Product description: {item.description}</p>
            </div>

            <button
              onClick={() => handleDelete(index)}
              className="delete-button"
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
