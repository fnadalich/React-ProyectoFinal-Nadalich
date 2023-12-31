import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
    const {carrito, vaciarCarrito, total, cantidadTotal} = useContext (CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <>
                <h2>No hay productos en la caja.</h2>
                <Link to="/"> Ver produtos </Link>
            </>
        )
    }

  return (
    <div>
        {
            carrito.map(producto => <CartItem key={producto.item.id} {...producto} />)
        }
        <h3>Total: ${total} </h3>
        <h3>Cantidad Total: {cantidadTotal} </h3>
        <button onClick={() => vaciarCarrito()}> Vaciar caja </button>
        <Link to="/checkout">Finalizar compra</Link>
        </div>
  )
}

export default Cart
