import React from 'react';
// import { Loader } from 'rsuite';
import { Triangle } from 'react-loader-spinner';
import '../pages/loader.css'
function LoaderComponent() {
    return (
        // <div style={{ height: 200, background: '#000' }}>
        //     {/* <Loader inverse center content="loading..." /> */}
        //     {/* <Triangle
        //         visible={true}
        //         height="80"
        //         width="80"
        //         color="#4fa94d"
        //         ariaLabel="triangle-loading"
        //         wrapperStyle={{}}
        //         wrapperClass=""
        //     /> */}
        // </div>
        <div className="loading-screen">
            <div className="loading-spinner"></div>
        </div>
        // <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle wrapperClass />
    )
}

export default LoaderComponent;