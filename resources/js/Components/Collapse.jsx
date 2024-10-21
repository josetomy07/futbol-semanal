import { Transition } from '@headlessui/react';
import React, { createContext, useContext, useState } from 'react'


const CollapseButton = ({ className = '', disabled, children, ...props }) => {

    return (
        <button
            {...props}
                className={
                `relative inline-flex items-center w-full px-4 py-3 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}


Collapse.button = CollapseButton;

export default Collapse
