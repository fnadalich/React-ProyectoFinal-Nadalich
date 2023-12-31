//Componente que engloba toda la lógica de la petición
import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]); //arranca con un array vacío

  const { idCategoria } = useParams();

  useEffect(()=> {
    const misProductos = idCategoria ? query (collection(db, "productos"), where("idCat", "==", idCategoria)) : collection (db, "productos");

    getDocs(misProductos)
    .then(res => {
      const nuevosProductos = res.docs.map (doc => {
        const data=doc.data()
        return {id:doc.id, ...data}
      })
      setProductos(nuevosProductos)
    })
    .catch(error => console.error(error))
  }, [idCategoria])

  return (
    <>
      <h2 style={{ textAlign: "center" }}> Mis Productos </h2>
      <ItemList productos={productos} />
    </>
  )
}

export default ItemListContainer