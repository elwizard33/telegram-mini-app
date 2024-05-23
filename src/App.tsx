import React, { useState } from 'react';
import styled from 'styled-components';

enum View {
    MAIN = 0,
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #18222d;
    color: white;
`;

const Header = styled.h1`
    text-align: center;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    width: 100%;
    padding: 0 1rem;
`;

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #374151;
    border-radius: 0.5rem;
    height: 8rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GridItemText = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
`;

function App() {
    const [view] = useState<View>(View.MAIN);

    return (
        <Container>
            {view === View.MAIN && (
                <div className="flex flex-col items-center justify-center h-full">
                    <Header>My GPT Wizard</Header>
                    <Grid>
                        {[
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
                        ].map((tool) => (
                            <GridItem key={tool}>
                                <GridItemText>{tool}</GridItemText>
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            )}
        </Container>
    );
}

export default App;