'use client'
import { storeUser } from '@/lib/redux/slice/userSlice';
import { store } from '@/lib/redux/store';
import { User } from '@/lib/typings';
import React, { useRef } from 'react'

function PreLoader({ user }: { user: User }) {
    const loaded = useRef(false);
    if (!loaded.current) {
        store.dispatch(storeUser(user))
        loaded.current = true
    }
    return null
}

export default PreLoader