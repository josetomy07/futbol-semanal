import { useEffect, useState } from "react";
import List from "../List/List"; //Lista que tiene ya busca los mock

const Buscador = ({ buscador }) => {
    const [listStrings, setListStrings] = useState([]);
    const [filterStrings, setFilterStrings] = useState([]);

    /**
     * Al momento de iniciar el Component 'Home' realiza un fetch al mock de 'Albums'
     * Los datos que trae lo colocamos en el state de 'albums'
     */
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch("../../mocks/albums.json")
                const result = await response.json();
                setListAlbums(result)
                setFilterAlbums(result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAlbums()
    }, [])

    /**
     * Campo buscador
     */
    const onChangeSearch = (param) => {
        if (!param.target.value) {
            setFilterStrings(listStrings)
        } else {
            let filterStrings = listStrings.filter(string =>
                string.name.toLowerCase().includes(param.target.value.toLowerCase())
            );
            setFilterStrings(filterStrings)
        }
    };

    return (
        <div className="pt-16 xl:pt-20">
            {/* Input para buscar */}
            <div className="flex justify-center">
                <input className="text-center w-52 h-12 my-5 border-double border-4 border-red-700 text-black rounded-md" type="text" placeholder="Buscar..." onChange={onChangeSearch} />
            </div>
            <List strings={filterStrings} />

        </div>
    )
}

export default Buscador