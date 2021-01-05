import Router from 'next/dist/next-server/lib/router/router';
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import MainLayout from "../layouts/MainLayout";
import { clickedProduct as clickedProductAtom } from "../recoil/atoms";

export default function Test() {
    const [clickedProduct, setClickedProduct] = useRecoilState(clickedProductAtom)

    return (
        <MainLayout>
            <div>
                <button>{clickedProduct}</button>
            </div>
        </MainLayout>

    )
}
