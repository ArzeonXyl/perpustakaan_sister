// src/admin/components/ManageFineForm.jsx
import React from 'react';
import { Box, Label, Input, Select, Text, Badge } from '@adminjs/design-system';

const ManageFineForm = (props) => {
  const { record } = props;
  
  // Hitung denda otomatis
  const today = new Date();
  const dueDate = new Date(record.params.due_date);
  const diffTime = Math.max(0, today - dueDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const defaultFine = diffDays * 5000;
  
  return (
    <Box p="xl">
      <Box mb="xl">
        <Text variant="lg" bold>
          Kelola Denda Peminjaman #{record.params.id}
        </Text>
      </Box>
      
      <Box mb="lg" p="md" style={{ 
        backgroundColor: '#e8f5e9', 
        borderRadius: '8px',
        border: '1px solid #c8e6c9'
      }}>
        <strong>Informasi Keterlambatan:</strong>
        <div>Tanggal Jatuh Tempo: {record.params.due_date}</div>
        <div>Hari Keterlambatan: <Badge variant="danger">{diffDays} hari</Badge></div>
        <div>Denda per Hari: Rp5,000</div>
        <div><strong>Total Denda: Rp{defaultFine.toLocaleString('id-ID')}</strong></div>
      </Box>
      
      <Box mb="lg">
        <Label>Jumlah Denda (Rp)</Label>
        <Input
          name="fine_amount"
          type="number"
          defaultValue={defaultFine}
        />
      </Box>
      
      <Box mb="lg">
        <Label>Status Pembayaran</Label>
        <Select
          name="paid_status"
          options={[
            { value: 'Belum Dibayar', label: 'Belum Dibayar' },
            { value: 'Sudah Dibayar', label: 'Sudah Dibayar' }
          ]}
          defaultValue="Belum Dibayar"
        />
      </Box>
      
      <Box mb="lg">
        <Label>Tanggal Pembayaran</Label>
        <Input
          name="paid_date"
          type="date"
          defaultValue={today.toISOString().split('T')[0]}
        />
      </Box>
      
      {/* Hidden field untuk days_late */}
      <input
        type="hidden"
        name="days_late"
        value={diffDays}
      />
    </Box>
  );
};

export default ManageFineForm;