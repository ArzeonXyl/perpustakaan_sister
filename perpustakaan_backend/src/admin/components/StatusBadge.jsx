// src/admin/components/StatusBadge.jsx
import React from 'react';
import { Badge, Box } from '@adminjs/design-system';

const StatusBadge = (props) => {
  // Defensive programming: Cek apakah data ada
  const { record, property } = props;
  
  if (!record || !property) {
    return null;
  }

  const status = record.params[property.name];

  // Logic Warna Sederhana
  let variant = 'light';
  if (['Dikembalikan', 'Sudah Dibayar'].includes(status)) variant = 'success';
  if (['Terlambat', 'Belum Dibayar', 'Ditolak'].includes(status)) variant = 'danger';
  if (status === 'Dipinjam') variant = 'primary';
  if (status === 'Menunggu Persetujuan') variant = 'info';

  return (
    <Box>
      <Badge variant={variant}>{status || '-'}</Badge>
    </Box>
  );
};

export default StatusBadge;