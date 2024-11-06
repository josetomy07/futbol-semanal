import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '../../../../css/Estilos/estiloUnsplash.css'


function UnsplashSearch() {
    const [query, setQuery] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchPhotos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/unsplash/search?query=${query}`);
            const data = await response.json();
            setPhotos(data.results); // Ajusta el nombre si la respuesta cambia
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (query) {
            searchPhotos();
        }
    }, [query]);

    return (
        <AuthenticatedLayout>

            <div className='container'>

                <header>
                    <h3 className='title'>Buscador de Imagenes</h3>
                    <form>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for photos"
                        />
                        <button type='button' className='btn btn-primary' onClick={searchPhotos}>Search</button>
                         {loading && <p>Loading...</p>}
                    </form>
                </header>

                <div id='resultado-busqueda'>
                    {photos.length > 0 ? (
                        photos.map((photo) => (
                            <img
                                key={photo.id}
                                src={photo.urls.small}
                                alt={photo.alt_description}
                                style={{ margin: '10px', width: '300px' }}
                            />
                        ))
                    ) : (
                        <p type="text" style={{ display: 'none' }}>No results found</p>
                    )}
                </div>

            </div>

        </AuthenticatedLayout>
    );
}

export default UnsplashSearch;
