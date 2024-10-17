import Chat from './components/Chat';
import styled from 'styled-components';

const AppContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
`;

function App() {    
    return (
        <AppContainer>
            <h1>Chat with Ava</h1>
            <Chat />
        </AppContainer>
    );
};

export default App;
