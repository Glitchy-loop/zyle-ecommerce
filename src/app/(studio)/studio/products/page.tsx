import BreadCrumb from "@/components/BreadCrumbs"
import StudioListAllProducts from "@/components/studio/products/StudioListAllProducts/StudioListAllProducts"
import { supabase } from "@/lib/supabase/supabase-client"
import { Product } from "@/types/collection"
import { unstable_noStore } from "next/cache"

const getProducts = async () => {
  unstable_noStore() // NOTE: NO CACHE FOR THIS PAGE

  try {
    const { data: products, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })

    return { products, count }
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}

const StudioProductsPage = async () => {
  const { products, count } = (await getProducts()) as {
    products: Product[] | null
    count: number | null
  }

  return (
    <div>
      <BreadCrumb
        root={"Studio"}
        items={[{ title: "Products", link: "/products" }]}
      />

      {/* List products */}
      {products && (
        <StudioListAllProducts products={products || []} count={count || 0} />
      )}
    </div>
  )
}

export default StudioProductsPage
