import Router from 'next/dist/next-server/lib/router/router';
import React from 'react'
import MainLayout from "../layouts/MainLayout";

export default function Test() {
    return (
        <MainLayout>
            <div>
                asdfasdf
                <button onClick={() => Router.back()}>asdfasf</button>
            </div>
        </MainLayout>

    )
}
