import React, { useState } from "react";
import products from "./product";
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <main className={styles["container-main"]}>
      <section className={styles["container-main__products-container"]}>
        <h2 className={styles["container-main__products-heading"]}>Products</h2>
        <div className={styles["container-main__products"]}>
          {products.map((product, index) => (
            <article
              key={index}
              className={styles["container-main__product"]}
              draggable="true"
            >
              <img
                className={styles["container-main__product-image"]}
                src={product.image}
                alt={product.name}
                draggable="false"
              />
              <div className={styles["container-main__product-info"]}>
                <h3 className={styles["container-main__product-title"]}>
                  {product.name}
                </h3>
                <p className={styles["container-main__product-description"]}>
                  {product.description}
                </p>
                <p className={styles["container-main__product-price"]}>
                  price - {product.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
