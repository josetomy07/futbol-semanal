import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Modal } from 'flowbite-react';


const index = ({ data }) => {

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [cuit, setCuit] = useState()
    const [showPerson, setShowPerson] = useState(false)
    const [person, setPerson] = useState()
    const [errorPersona, setErrorPersona] = useState()

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    const checkCuit = () => {
        // Replace 'https://your-endpoint.com/data' with the actual endpoint URL
        fetch('/cuit/' + cuit)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                if (data.error) {
                    setErrorPersona(data.error);
                }else {
                    setPerson({ idPersona: data.idPersona, nombre: data.nombre, apellido: data.apellido, error: data.error })
                }
                setShowPerson(true)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    return (

        <AuthenticatedLayout>
            <Head title="Usuarios" />

            <div className="container py-12">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                    <div className="flex items-center justify-between md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                        <div div className="sm:col-span-3">
                            <button type="button" className="inline-flex ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <Link href={route('Administrador.create')}>New Usuario</Link>
                            </button>
                        </div>
                        <div className='mr-4'>
                            <input className='border border-red-300' type='number' value={cuit} onChange={e => setCuit(e.currentTarget.value)} />
                            <button type="button" onClick={checkCuit} className="inline-flex ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                VER CUIT
                            </button>
                        </div>
                    </div>
                    <Modal show={showPerson} onClose={() => setShowPerson(false)}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" onClick={() => setShowPerson(false)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <i className="fa-solid fa-xmark ico-modal"></i>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                {person && person.nombre && person.idPersona && person.apellido && person.error && <>
                                    {person.idPersona}
                                    {person.nombre}
                                    {person.apellido}
                                    {person.error}
                                </>}
                                {errorPersona && <>{errorPersona}</>}
                            </div>

                        </div>
                    </Modal>



                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    # N°
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Usuarios
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Correo Electronico
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Roles
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(usuarios => (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={usuarios.id}>
                                    <td className="px-6 py-4" >
                                        {usuarios.id}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {usuarios.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {usuarios.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {usuarios.roles.map(role => role.name).join(', ')}
                                    </td>
                                    <td className="px-6 py-4">

                                        <a href={route('Administrador.edit', usuarios.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-3"><i className="fa-regular fa-pen-to-square"></i></a>

                                        <button type='button' onClick={confirmUserDeletion} className="font-medium text-red-600 dark:text-red-500 hover:underline"><i className="fa-solid fa-trash-can"></i></button>


                                        <Modal show={confirmingUserDeletion} onClose={closeModal}>

                                            <form >

                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    <button type="button" onClick={closeModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                        <i className="fa-solid fa-xmark ico-modal"></i>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                    <div className="p-4 md:p-5 text-center">
                                                        <i class="fa-solid fa-circle-exclamation ico-modal1"></i>
                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estás seguro de que deseas eliminar este usuario?</h3>
                                                        <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                            Si estoy seguro
                                                        </button>

                                                        <button type="button" onClick={closeModal} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancelar</button>
                                                    </div>

                                                </div>
                                            </form>


                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default index

