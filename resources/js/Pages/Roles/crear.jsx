import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';


const crear = ({permission}) => {


    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/permissions', { name });
    };


  return (
    <AuthenticatedLayout>
        <Head title="Crear rol" />

        <div className="container py-12">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="flex items-center justify-between md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    < div className="sm:col-span-3">
                        <button type="button" className="inline-flex ml-4 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <Link href={route('Roles.index')}>Back</Link>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} >
                    <div className="flex items-center justify-between md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900" >

                        <InputLabel htmlFor="name" value="Name" className="ml-4 flex items-center justify-between" />
                        <TextInput
                            id="name"
                            name="name"
                            value={name}
                            className="ml-4 mr-4 mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <InputError  className="mt-2" />

                        <div className="py-10 ml-4">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Permisos</h3>
                                <br/>

                                {permission.map(permissions => (
                                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white" key={permissions.id}>
                                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600" >
                                            <div class="flex items-center ps-3">
                                                <input id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >{permissions.name}</label>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                                <br/>
                        </div>
                    </div>
                    <button type="submit"> enviar</button>
                </form>
            </div>
        </div>



    </AuthenticatedLayout>
  )
}

export default crear;

