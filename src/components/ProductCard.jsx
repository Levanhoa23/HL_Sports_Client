import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import AddToCartButton from "./AddToCartButton";
import PriceContainer from "./PriceContainer";

const ProductCard = ({ item, viewMode = "grid", className = "" }) => {
  console.log("ProductCard rendered with item:", item);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleProductDetails = () => {
    navigate(`/product/${item?._id}`, {
      state: {
        item: item,
      },
    });
  };

  if (viewMode === "list") {
    return (
      <div
        className={`w-full bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden ${className}`}
      >
        <div className="flex">
          {/* Image Container */}
          <div className="relative flex-shrink-0 w-48 h-48 overflow-hidden bg-gray-50">
            <div
              onClick={handleProductDetails}
              className="w-full h-full overflow-hidden bg-white cursor-pointer"
            >
              <img
                className="object-cover w-full h-full transition-transform duration-500 ease-out hover:scale-105"
                src={item?.images?.[0] || item?.image}
                alt={item?.name}
              />
            </div>

            {/* Sale Badge */}
            {item?.offer && (
              <div className="absolute top-3 left-3">
                {item?.discountedPercentage > 0 ? (
                  <span className="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-black">
                    -{item.discountedPercentage}%
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-red-600">
                    Sale
                  </span>
                )}
              </div>
            )}

            {/* Badge for new items */}
            {item?.badge && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-green-600">
                  New
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between flex-1 p-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="flex-1 mr-4 text-lg font-semibold tracking-wide text-gray-900 uppercase transition-colors duration-200 cursor-pointer hover:text-gray-600"
                  onClick={handleProductDetails}
                >
                  {item?.name}
                </h3>
                <div className="text-right">
                  <PriceContainer item={item} />
                </div>
              </div>

              {item?.brand && (
                <p className="mb-2 text-sm text-gray-600">
                  Brand: {item.brand}
                </p>
              )}

              {item?.category && (
                <p className="mb-3 text-sm text-gray-600">
                  Category: {item.category}
                </p>
              )}

              {item?.description && (
                <p className="mb-4 text-sm text-gray-700 line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-end">
              <AddToCartButton item={item} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div
      className={`w-full relative group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 ease-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <div
          onClick={handleProductDetails}
          className="w-full aspect-[4/4] overflow-hidden cursor-pointer bg-white"
        >
          <img
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
            src={item?.images?.[0] || item?.image}
            alt={item?.name}
          />
        </div>

        {/* Sale Badge */}
        {item?.offer && (
          <div className="absolute top-3 left-3">
            {item?.discountedPercentage > 0 ? (
              <span className="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-black">
                -{item.discountedPercentage}%
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-red-600">
                Sale
              </span>
            )}
          </div>
        )}

        {/* Badge for new items */}
        {item?.badge && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium tracking-wide text-white uppercase bg-green-600">
              New
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleProductDetails}
              className="px-6 py-2 text-sm font-medium tracking-wide text-black uppercase transition-colors duration-200 bg-white hover:bg-gray-100"
            >
              Quick Look
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 pt-4 pb-4 text-center">
        <h3
          className="mb-2 text-sm font-medium tracking-wide text-gray-900 uppercase transition-colors duration-200 cursor-pointer hover:text-gray-600"
          onClick={handleProductDetails}
        >
          {item?.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <PriceContainer item={item} />
        </div>

        {/* Add to Cart Button */}
        <div className="transition-opacity duration-300 opacity-100 group-hover:opacity-100">
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    offer: PropTypes.bool,
    badge: PropTypes.bool,
    discountedPercentage: PropTypes.number,
    brand: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"]),
  className: PropTypes.string,
};

export default ProductCard;
