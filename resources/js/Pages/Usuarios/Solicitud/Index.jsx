import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Collapse from '@/Components/collapse';
import { Head, usePage } from '@inertiajs/react';
import { Modal } from 'flowbite-react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import '../../../../css/dataTables.css';



const Index = () => {

    const { ciudad, predios, alquilados } = usePage().props;

    const [showToast, setShowToast] = useState(false)
    const [showEquipo, setShowEquipo] = useState(false);


    const [datos, setDatos] = useState('');

    useEffect(() => {
        fetch('/Solicitud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ nombre: showEquipo })
            })
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error:', error));
    }, [showEquipo]);


    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    DataTable.use(DT);

    return (

        <AuthenticatedLayout>

            <Head title="Solicitudes" />

            <div className="container py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Nueva Solicitud</div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">

                <div className="row justify-content-start">

                    <div className="col-md-2 menu1 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                        <Collapse.button
                            onClick={(e) => setShowToast('Solicitud de Cancha', e.target.value)}>
                            <i className="fa-solid fa-futbol ico-soli"></i>
                            Solicitud de Cancha
                        </Collapse.button>

                        <Collapse.button
                            onClick={confirmUserDeletion}>
                            <i className="fa-solid fa-map-location-dot ico-soli"></i>
                            Disponibildad de cancha
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Baja de Reserva', e.target.value)}>
                            <i className="fa-solid fa-calendar-xmark ico-soli"></i>
                            Baja de Reserva
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Locacion de Predio', e.target.value)}>
                            <i className="fa-solid fa-earth-americas ico-soli"></i>
                            Locacion de Predio
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Reserva Varias', e.target.value)}>
                            <i className="fa-solid fa-clipboard-list ico-soli"></i>
                            Reserva Varias
                        </Collapse.button>

                        <Collapse.button
                            onClick={(e) => setShowToast('Error de Sistema', e.target.value)}>
                            <i className="fa-solid fa-screwdriver-wrench ico-soli"></i>
                            Error de Sistema
                        </Collapse.button>

                    </div>

                    {showToast === "Solicitud de Cancha" && (
                            <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {ciudad.map( (lugar, index ) => (
                                    <Collapse.button
                                        value={lugar.localidad}
                                        onClick={(e) => setShowEquipo(e.target.value)}
                                        key={index}
                                    >
                                        {lugar.localidad}
                                    </Collapse.button>
                                ))}
                            </div>
                    )}


                    <Modal show={confirmingUserDeletion} onClose={closeModal}>

                        <Modal.Body className='container-fluid'>

                            <div className="modal-body">
                                <button type="button" onClick={closeModal} >
                                    <i className="fa-solid fa-xmark ico-modal"></i>
                                    <span className="sr-only">Close modal</span>
                                </button>

                                <DataTable className="display text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" id="example">
                                    <thead >
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Predio</th>
                                        <th scope="col">localidad</th>
                                        <th scope="col">Direccion</th>
                                        <th scope="col">Futbol 5</th>
                                        <th scope="col">Ftubol 8</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {predios.map(data => (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={data.id}>
                                                    <th scope="row">{data.id}</th>
                                                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.nombre}</td>
                                                    <td>{data.localidad}</td>
                                                    <td>{data.direccion}</td>
                                                    <td>{data.cinco}</td>
                                                    <td>{data.ocho}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                </DataTable>

                            </div>

                    </Modal.Body>
                    </Modal>



                    {showEquipo === "Cipolletti" && (

                        <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (
                                <a
                                    href={route('Solicitud.show', predio.id)}
                                    className='relative inline-flex items-center w-full px-4 py-3 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                                    key={indexs}
                                    >
                                    {predio.nombre}
                                </a>
                            ))}
                        </div>

                    )}

                    {showEquipo === "Neuquen" && (
                        <>
                            <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (

                                <Collapse.button
                                    key={indexs}>
                                        {predio.nombre}
                                </Collapse.button>
                                ))}
                            </div>
                        </>
                    )}

                    {showEquipo === "Cinco-Salto" && (

                        <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (
                                <Collapse.button
                                    key={indexs}
                                    >
                                    {predio.nombre}
                                </Collapse.button>
                            ))}
                        </div>

                    )}

                    {showEquipo === "Fernandez-Oro" && (

                        <div className="col-md-2 menu2 mx-8  text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {datos.map( (predio, indexs ) => (
                                <Collapse.button
                                    key={indexs}
                                    >
                                    {predio.nombre}
                                </Collapse.button>
                            ))}
                        </div>

                    )}







                </div>


            </div>

        </AuthenticatedLayout>

    )
}

export default Index
