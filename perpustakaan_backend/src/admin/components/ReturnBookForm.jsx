// src/admin/components/ReturnBookForm.jsx
import React, { useState } from 'react';
import { Box, Label, Input, Button, DatePicker } from '@adminjs/design-system';

const ReturnBookForm = (props) => {
  const { record, resource, action } = props;
  const [returnDate, setReturnDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('return_date', returnDate.toISOString().split('T')[0]);
    formData.append('notes', notes);
    
    // Submit form
    const form = event.target;
    form.submit();
  };
  
  return (
    <Box as="form" onSubmit={handleSubmit} method="post">
      <Box mb="lg">
        <Label>Tanggal Pengembalian</Label>
        <Input
          type="date"
          value={returnDate.toISOString().split('T')[0]}
          onChange={(e) => setReturnDate(new Date(e.target.value))}
          required
        />
      </Box>
      
      <Box mb="lg">
        <Label>Catatan (Opsional)</Label>
        <Input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Catatan pengembalian..."
        />
      </Box>
      
      <Box mb="lg" p="md" style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <strong>Informasi Peminjaman:</strong>
        <div>ID: {record.params.id}</div>
        <div>User ID: {record.params.user_id}</div>
        <div>Buku ID: {record.params.book_id}</div>
        <div>Tanggal Pinjam: {record.params.borrow_date}</div>
        <div>Jatuh Tempo: {record.params.due_date}</div>
        <div>Status: {record.params.status}</div>
      </Box>
      
      <Button type="submit" variant="primary">
        Konfirmasi Pengembalian
      </Button>
    </Box>
  );
};

export default ReturnBookForm;