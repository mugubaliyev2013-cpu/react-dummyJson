import React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Fetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('')


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        console.log(data.products);
        setProducts(data.products);
      } catch (error) {
        console.error("Xatolik: ", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };



    fetchProducts();
  }, []);
  

     const filteredProducts = products
    .filter((product) => {
      const searchMatch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        category === "all" || product.category === category;

      return searchMatch && categoryMatch;
    })
    .sort((a, b) => {
      if (sort === "past-rating") return a.rating - b.rating;
      if (sort === "tepa-rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <>
    <h1 className="title">Mahsulotlar ro'yhati</h1>
    
        <div className="main">
      <div className="controls">
        <input
          className="input-value"
          type="text"
          placeholder="Qidiring..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>

        <select
          className="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Saralash</option>
          <option value="past-rating">Past-rating</option>
          <option value="tepa-rating">Tepa-rating</option>
        </select>
      </div>
    </div>

    <div className="container">

      {loading && <Loader />}
      {error && <p className="error">Xatolik yuz berdi</p>}

      <div className="box">
       {filteredProducts && filteredProducts.map((item) => {
          return (
            <div className="card" key={item.id}>
              <img src={item.images[0]} alt={item.title} />
              <h2>{item.title}</h2>
              <h2>{item.category}</h2>
              <h2>{item.rating}</h2>
              <h2>{item.price}</h2>
              <h2>{item.id}</h2>


            </div>
          );
        })}
      </div>
    </div>
    
    </>
  );
};

export default Fetch;