import React, { useState, useCallback } from "react";
import styles from "./Header.module.scss";
import { debounce } from "./utilis";
import products from "./product";

function Header() {
  const [query, setQuery] = useState("");
  const [productData, setProductsData] = useState([]);

  const handleSearch = async (value) => {
    if (value === "") {
      setProductsData([]);
      return;
    }
    const productsFilteredData = await new Promise((res) => {
      setTimeout(
        () =>
          res(
            products.filter((product) =>
              product.name.trim().toLocaleLowerCase().startsWith(value)
            )
          ),
        1000
      );
    });
    setProductsData(productsFilteredData);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleKeyBoard = (e) => {};

  return (
    <header className={styles["container-header"]}>
      <span>POS</span>
      <div className={styles["container-header__search-container"]}>
        <input
          placeholder="Search Products...."
          className={styles["container-header__search-input"]}
          onChange={handleChange}
          value={query}
          onKeyDown={handleKeyBoard}
        />
        <div className={styles["container-header__search-result"]}>
          {productData.map((product, index) => {
            return (
              <div
                key={index}
                onKeyDown={handleKeyBoard}
                style={{ color: "black" }}
                tabIndex={index}
              >
                {product.name}
              </div>
            );
          })}
        </div>
      </div>
      <span></span>
    </header>
  );
}

export default Header;
