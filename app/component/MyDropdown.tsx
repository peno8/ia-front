'use client'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Props {
  dropdownName: String, items: Array<String>
}

export default function DisplayDropdown(props: Props) {
  return (
    <div className="text-right">
      <Menu as="div" className="block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-0.5 text-sm text-blue-400 font-normal hover:bg-opacity-10 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {props.dropdownName}
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-360 280-560h400L480-360Z" className="fill-blue-400" /></svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {
              props.items.map(item =>

                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {item}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              )
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}