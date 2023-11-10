import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './utils/trpc';
import ReactDOM from 'react-dom/client';
import './globals.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Pagination from "./components/home/pagination";
import CoinTable from "./components/home/coinTable";
import CoinPage from "./components/pageCoin/Coin";
import Custom404 from "./components/not-found/not-found";
import { variables } from './variables';

function App() {

    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient(
            {
                links:
                    [
                        httpBatchLink(
                            {
                                url: variables.MY_API_URL,
                            }),
                    ],
            }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path={'/coin/:id'} element={
                                <main className='main'>
                                    <CoinPage />
                                </main>}
                        />
                        <Route path='/' element={
                                <main className='main'>
                                    <CoinTable />
                                    <Pagination />
                                </main>}
                        />
                        <Route path='*' element={
                                <main className='main'>
                                    <Custom404 />
                                </main>}
                        />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    )
};

const root = ReactDOM.createRoot(
    document.getElementById('app') as HTMLElement
);
root.render(
    <App />
);