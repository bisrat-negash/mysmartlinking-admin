import Image from 'next/image';
import React from 'react';

const CheckEmail = () => {
    const containerStyle: React.CSSProperties = {
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    };

    const cardStyle = {
        backgroundColor: '#1e293b', // slate-800
        padding: '32px 24px',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
    };

    const headingStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#ffffff',
    };

    const messageStyle = {
        fontSize: '16px',
        color: '#e2e8f0', // light slate
        marginBottom: '12px',
    };

    const emailIconStyle = {
        width: '60px',
        height: '60px',
        marginBottom: '20px',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <Image
                    src="https://www.svgrepo.com/show/428001/email-send-paper-airplane.svg"
                    alt="Check Email"
                    style={emailIconStyle}
                />
                
                <h1 style={headingStyle}>Check Your Email</h1>
                <p style={messageStyle}>
                    We&apos;ve sent you an email to verify your account.
                </p>
                <p style={{ ...messageStyle, fontSize: '14px' }}>
                    Please click the link in the email to complete your registration.
                </p>
            </div>
        </div>
    );
};

export default CheckEmail;
