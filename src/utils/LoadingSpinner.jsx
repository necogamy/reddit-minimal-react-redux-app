import React from "react";

export function LoadingSpinner(props) {
    const {marginTop} = props;

    const separateSpinner = {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop
    }

    return (
        <section style={separateSpinner}>
            <p style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20}}>Loading</p>
            <div className='loading-spinner'></div>
        </section>
    )
}