import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';


const crear = ({permission}) => {

    console.log(permission)
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

                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Permission:</strong>
                                <br/>
                                {permission.map(role => (
                                    <li key={permission.id}>{role.name}</li>
                                ))}
                                <br/>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>



    </AuthenticatedLayout>
  )
}

export default crear;

