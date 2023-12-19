'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

const ChargerList = ({ chargers }: any) => {
    const token = Cookies.get('token');
    const [totalWidth, setTotalWidth] = useState(0);
    const [numberOfItemsDisplayed, setNumberOfItemsDisplayed] = useState(0);
    // console.log("🚀 ~ file: page.tsx:36 ~ PricingPage ~ numberOfItemsDisplayed:", numberOfItemsDisplayed)
    const currentRef = useRef<any>(null);
    const rightRef = useRef<any>(null);

    const handleResize = () => {
        setTotalWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    useLayoutEffect(() => {
        const rows = currentRef.current?.children;
        const rightPos = rightRef.current?.offsetLeft;
        const totalDivWidth = Number(rightPos) - Number(rows[0].offsetLeft) - 14;

        if (rows && rows.length > 0) {
            let numItems = 0;
            let showItemsWidth = 0;
            for (let i = 0; i < rows.length; i++) {
                showItemsWidth += rows[i].offsetWidth;
                if (showItemsWidth < totalDivWidth) {
                    numItems++;
                }
            }
            setNumberOfItemsDisplayed(numItems);
        }
    }, [totalWidth, window.innerWidth]);
    return (
        <div className='mt-1 flex justify-between items-center gap-1'>
            <div ref={currentRef} className='flex flex-wrap gap-1 h-[25px] overflow-hidden'>
                {
                    chargers.map((charger: any) =>
                        <p
                            key={charger._id}
                            className='text-sm border px-2 overflow-ellipsis bg-gray-100 rounded-lg whitespace-nowrap'
                        >
                            {charger.name}
                        </p>
                    )
                }
            </div>
            <p className='text-sm whitespace-nowrap' ref={rightRef}>{chargers.length - numberOfItemsDisplayed > 0 ? `...+${chargers.length - numberOfItemsDisplayed} more` : ''}</p>
        </div>
    );
};

export default ChargerList;