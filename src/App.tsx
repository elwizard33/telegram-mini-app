import React from 'react';

const App = () => {
    const tools = [
        "Email Generator",
        "Meme Generator",
        "Live Chat",
        "Marketing Plan Generator",
        "Article Summarizer",
        "Code Debugger",
        "Image Captioner",
        "Personal Assistant",
        "Recipe Finder",
        "Travel Planner"
    ];

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#18222D',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const headerStyle = {
        fontSize: '2.25rem',
        lineHeight: '2.5rem',
        fontWeight: 700,
        marginBottom: '2rem',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '1rem',
        width: '100%',
        padding: '0 1rem',
    };

    const gridItemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#374151',
        borderRadius: '0.5rem',
        height: '8rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const gridItemTextStyle = {
        fontSize: '1.25rem',
        fontWeight: 600,
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>My GPT Wizard</h1>
            <div style={gridStyle}>
                {tools.map((tool) => (
                    <div key={tool} style={gridItemStyle}>
                        <p style={gridItemTextStyle}>{tool}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;