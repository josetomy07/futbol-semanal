import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const index = ({data}) => {

  return (

    <AuthenticatedLayout>
        <Head title="Usuarios" />

        <div className="container py-12">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="flex items-center justify-between md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                    < div className="sm:col-span-3">
                        <button type="button" className="inline-flex ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <Link href={route('Usuarios.create')}>New Usuario</Link>
                        </button>
                    </div>
                </div>


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
                                    <a href={route('Usuarios.edit', usuarios.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-3">Edit</a>
                                    <form style={{display:"inline"}}>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </form>
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
