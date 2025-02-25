// src/components/Chat.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from './Chat';
import { useMessages } from '../hooks/useMessages';

jest.mock('../hooks/useMessages');

describe('Chat Component', () => {
    const mockMessages = [
        { id: '1', text: 'Hello!', sender: 'User', timestamp: new Date() },
        { id: '2', text: 'How are you?', sender: 'User', timestamp: new Date() },
    ];

    beforeEach(() => {
        (useMessages as jest.Mock).mockReturnValue({
            messages: mockMessages,
            addMessage: jest.fn(),
            editMessage: jest.fn(),
            deleteMessage: jest.fn(),
        });
    });

    it('renders correctly', async () => {
        render(<Chat />);        

        expect(screen.getByText('Hello!')).toBeInTheDocument();
        expect(screen.getByText('How are you?')).toBeInTheDocument();
    });

    it('adds a new message', () => {
        
        fireEvent.change(screen.getByPlaceholderText('Type your message...'), { target: { value: 'New message' } });
        fireEvent.click(screen.getByText('Send')); 
        
        expect(screen.getByText('New message')).toBeInTheDocument();
    });
});
