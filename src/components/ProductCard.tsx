
import "../styles/StudentCard.css"

type ProductCardProps = {
    product : any
}

function ProductCard({product, }: ProductCardProps){
    return (
      <div className="contactCard">
        <div className="infoContactCard">
          <h1>{product.nombre}</h1>
          <p>Precio: {product.precio}</p>
        </div>
      </div>
    );

}

export default ProductCard;