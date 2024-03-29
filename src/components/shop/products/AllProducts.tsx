import { Product } from "../../../types/collection"
import ProductCard from "./ProductCard"

interface AllProductsProps {
  products: Product[]
}

const AllProducts = ({ products }: AllProductsProps) => {
  return (
    <>
      {!products ||
        (products.length === 0 && (
          <div className="text-center text-muted-foreground my-6">
            No products found
          </div>
        ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 box-border">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  )
}

export default AllProducts
