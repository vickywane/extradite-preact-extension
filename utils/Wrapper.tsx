import React from "react";

import Header from "~components/Header";

const Wrapper = ({children}) => (
    <div className='w-[400px] h-[500px]'>
        <Header/>

        <div className={"p-4"}>
            {children}
        </div>
    </div>
)

export default Wrapper