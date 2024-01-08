import React from 'react'
import { Icon } from '@iconify/react';

export default function textIcon({ iconName, text , active}) {
    return (
        <div className='d-flex px-3 py-2 hover-container'>
            <div className='mx-2'>
                <Icon icon={iconName} color={active?"white": "gray"} width={25} className='iconText'/>
            </div>
            <div className='mx-2 iconText' style={{color: active? "white": "gray"}}>{text}</div>
        </div>
    )
}

