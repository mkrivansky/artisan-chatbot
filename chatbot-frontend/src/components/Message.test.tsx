// src/components/Message.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Message from './Message';
import { Message as MessageType } from '../types/Message';

describe('Message Component', () => {
    const mockMessage: MessageType = {
        id: '1',
        text: 'Hello, World!',
        sender: 'User',
        timestamp: new Date(),
    };

    it('renders message text and sender', () => {
        render(<Message message={mockMessage} onEdit={jest.fn()} onDelete={jest.fn()} />);

        expect(screen.getByText(mockMessage.text)).toBeInTheDocument();
        expect(screen.getByText(`${mockMessage.sender} - ${mockMessage.timestamp.toLocaleString()}`)).toBeInTheDocument();
    });

    it('allows editing a message', () => {
        const handleEdit = jest.fn();
        render(<Message message={mockMessage} onEdit={handleEdit} onDelete={jest.fn()} />);

        fireEvent.click(screen.getByText('Edit'));
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'Updated Message' } });
        fireEvent.click(screen.getByText('Save'));

        expect(handleEdit).toHaveBeenCalledWith(mockMessage.id, 'Updated Message');
    });

    it('allows deleting a message', () => {
        const handleDelete = jest.fn();
        render(<Message message={mockMessage} onEdit={jest.fn()} onDelete={handleDelete} />);

        fireEvent.click(screen.getByText('Delete'));
        expect(handleDelete).toHaveBeenCalledWith(mockMessage.id);
    });
});
