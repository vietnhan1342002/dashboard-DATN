
'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/redux/store';


export default function StoreProvider({ children }: { children: ReactNode }) {
    return <Provider store={makeStore()}>{children}</Provider>;
}
