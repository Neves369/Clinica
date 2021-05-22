import React from 'react';
import { FiUsers } from "react-icons/fi";
import { AiOutlineProfile } from "react-icons/ai";
import { IoMdMedical } from "react-icons/io";
import { BsCreditCard } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import { VscGroupByRefType } from "react-icons/vsc";
import { FiUserCheck } from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";


export const SidebarData = [
    {
        title: 'Atendimentos',
        path: '/atendimentos',
        icon: <AiOutlineProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Convenios',
        path: '/convenios',
        icon: <BsCreditCard />,
        cName: 'nav-text'
    },
    {
        title: 'Medicos',
        path: '/medicos',
        icon: <IoMdMedical/>,
        cName: 'nav-text'
    },
    {
        title: 'Pacientes',
        path: '/pacientes',
        icon: <FiUsers />,
        cName: 'nav-text'
    },
    {
        
        title: 'Recibos',
        path: '/recibos',
        icon: <BiReceipt />,
        cName: 'nav-text'
        
    },
    {
        title: 'Serviços',
        path: '/servicos',
        icon: <RiCustomerService2Line />,
        cName: 'nav-text'
    },
    {
        
        title: 'TipoUsuarios',
        path: '/tipoUsuarios',
        icon: <VscGroupByRefType />,
        cName: 'nav-text'
        
    },
    {
        
        title: 'Usuarios',
        path: '/usuarios',
        icon: <FiUserCheck />,
        cName: 'nav-text'
        
    }
]