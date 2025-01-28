import { Product } from "types"


type ParamsProductDetail = {
    product: Product
}

const ProductDetail:React.FC<ParamsProductDetail> = ({product}) => {
    return (
        <div>
            <div>
                hola
            </div>
        </div>
    )
}

export default ProductDetail