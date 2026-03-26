import React, { useContext, useState, useEffect } from 'react';
import ShopContext from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];

      productsCopy = productsCopy.filter(
        item => item.category === category && item.subcategory === subcategory
      );

      setRelated(productsCopy.slice(0, 4));
    }
  }, [products, category, subcategory]); // FIXED ✔

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'EXAM'} />
      </div>

      <div className=" grid items-center grid-cols-1 ">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}  
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
