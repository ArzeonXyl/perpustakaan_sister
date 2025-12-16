(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const TopBarWithLogout = ({
    toggleSidebar
  }) => {
    const handleLogout = () => {
      // HARD REDIRECT → cocok untuk AdminJS
      window.location.href = 'http://localhost:3000/api/logout';
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      px: "xl",
      py: "lg",
      bg: "white",
      borderBottom: "default",
      style: {
        height: '64px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      flexDirection: "row",
      alignItems: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "text",
      onClick: toggleSidebar,
      mr: "lg",
      type: "button"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Menu"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "lg",
      fontWeight: "bold"
    }, "IFNO Perpustakaan")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "danger",
      size: "sm",
      onClick: handleLogout,
      type: "button"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "LogOut"
    }), " Logout")));
  };

  const Dashboard = () => {
    const [stats, setStats] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const api = new adminjs.ApiClient();
    React.useEffect(() => {
      fetchStats();
    }, []);
    const fetchStats = async () => {
      try {
        const response = await api.getPage({
          pageName: 'stats'
        });
        if (response.data && response.data.stats) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error('❌ Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xxl",
        flex: true,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "50vh"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        mt: "lg",
        color: "grey60"
      }, "Sedang memuat data..."));
    }
    if (!stats) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        p: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Gagal memuat data statistik."));
    }

    // Komponen Card Sederhana menggunakan Box
    const InfoCard = ({
      title,
      value,
      subtitle,
      color,
      badge
    }) => /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "white",
      boxShadow: "card",
      p: "lg",
      borderRadius: "default",
      mb: "lg" // Margin bottom agar aman di mobile
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H3, {
      mb: "sm"
    }, title), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true,
      alignItems: "center"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H1, {
      style: {
        color: color || 'inherit',
        marginRight: '8px'
      }
    }, value), badge && /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
      variant: "danger"
    }, badge)), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60",
      variant: "sm"
    }, subtitle));
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H1, null, "\uD83D\uDCCA Dashboard Perpustakaan"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      color: "grey60",
      mb: "xxl"
    }, "Ringkasan aktivitas dan statistik sistem perpustakaan"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "grid",
      gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr'],
      gridGap: "lg",
      mb: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(InfoCard, {
      title: "\uD83D\uDCDA Total Buku",
      value: stats.total_books || 0,
      subtitle: "Judul tersedia"
    }), /*#__PURE__*/React__default.default.createElement(InfoCard, {
      title: "\uD83D\uDC65 Anggota",
      value: stats.total_members || 0,
      subtitle: "Peminjam aktif"
    }), /*#__PURE__*/React__default.default.createElement(InfoCard, {
      title: "\u23F3 Pending",
      value: stats.pending_borrowings || 0,
      subtitle: "Menunggu persetujuan",
      color: "#f39c12"
    }), /*#__PURE__*/React__default.default.createElement(InfoCard, {
      title: "\u26A0\uFE0F Terlambat",
      value: stats.late_borrowings || 0,
      subtitle: "Peminjaman telat",
      color: "#e74c3c"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "grid",
      gridTemplateColumns: ['1fr', '1fr 1fr'],
      gridGap: "lg",
      mb: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(InfoCard, {
      title: "\uD83D\uDCB0 Denda Belum Dibayar",
      value: `Rp${(stats.total_unpaid_amount || 0).toLocaleString('id-ID')}`,
      subtitle: "Total tagihan aktif",
      color: "#e74c3c",
      badge: `${stats.unpaid_fines || 0} transaksi`
    }), /*#__PURE__*/React__default.default.createElement(InfoCard, {
      title: "\u2705 Denda Dibayar",
      value: `Rp${(stats.total_paid_amount || 0).toLocaleString('id-ID')}`,
      subtitle: "Total pemasukan denda",
      color: "#27ae60"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "white",
      boxShadow: "card",
      p: "lg",
      borderRadius: "default"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      mb: "lg"
    }, "\u26A1 Status Cepat"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      display: "grid",
      gridTemplateColumns: ['1fr', '1fr'],
      gridGap: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "Clock"
    }), " Menunggu:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, stats.pending_borrowings || 0, " Request")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      fontWeight: "bold"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Icon, {
      icon: "AlertCircle"
    }), " Telat:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, stats.late_borrowings || 0, " Buku")))));
  };

  // src/admin/components/ReturnBookForm.jsx
  const ReturnBookForm = props => {
    const {
      record,
      resource,
      action
    } = props;
    const [returnDate, setReturnDate] = React.useState(new Date());
    const [notes, setNotes] = React.useState('');
    const handleSubmit = event => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('return_date', returnDate.toISOString().split('T')[0]);
      formData.append('notes', notes);

      // Submit form
      const form = event.target;
      form.submit();
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      as: "form",
      onSubmit: handleSubmit,
      method: "post"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Tanggal Pengembalian"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "date",
      value: returnDate.toISOString().split('T')[0],
      onChange: e => setReturnDate(new Date(e.target.value)),
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Catatan (Opsional)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "text",
      value: notes,
      onChange: e => setNotes(e.target.value),
      placeholder: "Catatan pengembalian..."
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg",
      p: "md",
      style: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Informasi Peminjaman:"), /*#__PURE__*/React__default.default.createElement("div", null, "ID: ", record.params.id), /*#__PURE__*/React__default.default.createElement("div", null, "User ID: ", record.params.user_id), /*#__PURE__*/React__default.default.createElement("div", null, "Buku ID: ", record.params.book_id), /*#__PURE__*/React__default.default.createElement("div", null, "Tanggal Pinjam: ", record.params.borrow_date), /*#__PURE__*/React__default.default.createElement("div", null, "Jatuh Tempo: ", record.params.due_date), /*#__PURE__*/React__default.default.createElement("div", null, "Status: ", record.params.status)), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      variant: "primary"
    }, "Konfirmasi Pengembalian"));
  };

  // src/admin/components/ManageFineForm.jsx
  const ManageFineForm = props => {
    const {
      record
    } = props;

    // Hitung denda otomatis
    const today = new Date();
    const dueDate = new Date(record.params.due_date);
    const diffTime = Math.max(0, today - dueDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const defaultFine = diffDays * 5000;
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      p: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "lg",
      bold: true
    }, "Kelola Denda Peminjaman #", record.params.id)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg",
      p: "md",
      style: {
        backgroundColor: '#e8f5e9',
        borderRadius: '8px',
        border: '1px solid #c8e6c9'
      }
    }, /*#__PURE__*/React__default.default.createElement("strong", null, "Informasi Keterlambatan:"), /*#__PURE__*/React__default.default.createElement("div", null, "Tanggal Jatuh Tempo: ", record.params.due_date), /*#__PURE__*/React__default.default.createElement("div", null, "Hari Keterlambatan: ", /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
      variant: "danger"
    }, diffDays, " hari")), /*#__PURE__*/React__default.default.createElement("div", null, "Denda per Hari: Rp5,000"), /*#__PURE__*/React__default.default.createElement("div", null, /*#__PURE__*/React__default.default.createElement("strong", null, "Total Denda: Rp", defaultFine.toLocaleString('id-ID')))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Jumlah Denda (Rp)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      name: "fine_amount",
      type: "number",
      defaultValue: defaultFine
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Status Pembayaran"), /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      name: "paid_status",
      options: [{
        value: 'Belum Dibayar',
        label: 'Belum Dibayar'
      }, {
        value: 'Sudah Dibayar',
        label: 'Sudah Dibayar'
      }],
      defaultValue: "Belum Dibayar"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mb: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Tanggal Pembayaran"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      name: "paid_date",
      type: "date",
      defaultValue: today.toISOString().split('T')[0]
    })), /*#__PURE__*/React__default.default.createElement("input", {
      type: "hidden",
      name: "days_late",
      value: diffDays
    }));
  };

  // src/admin/components/StatusBadge.jsx
  const StatusBadge = props => {
    // Defensive programming: Cek apakah data ada
    const {
      record,
      property
    } = props;
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
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
      variant: variant
    }, status || '-'));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.TopBar = TopBarWithLogout;
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.ReturnBookForm = ReturnBookForm;
  AdminJS.UserComponents.ManageFineForm = ManageFineForm;
  AdminJS.UserComponents.StatusBadge = StatusBadge;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9Ub3BCYXJXaXRoTG9nb3V0LmpzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0Rhc2hib2FyZC5qc3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9SZXR1cm5Cb29rRm9ybS5qc3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9NYW5hZ2VGaW5lRm9ybS5qc3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9TdGF0dXNCYWRnZS5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgVG9wQmFyV2l0aExvZ291dCA9ICh7IHRvZ2dsZVNpZGViYXIgfSkgPT4ge1xuICBjb25zdCBoYW5kbGVMb2dvdXQgPSAoKSA9PiB7XG4gICAgLy8gSEFSRCBSRURJUkVDVCDihpIgY29jb2sgdW50dWsgQWRtaW5KU1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvbG9nb3V0JztcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGZsZXhcbiAgICAgIGZsZXhEaXJlY3Rpb249XCJyb3dcIlxuICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCJcbiAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgcHg9XCJ4bFwiXG4gICAgICBweT1cImxnXCJcbiAgICAgIGJnPVwid2hpdGVcIlxuICAgICAgYm9yZGVyQm90dG9tPVwiZGVmYXVsdFwiXG4gICAgICBzdHlsZT17eyBoZWlnaHQ6ICc2NHB4JyB9fVxuICAgID5cbiAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cInRleHRcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVNpZGViYXJ9XG4gICAgICAgICAgbXI9XCJsZ1wiXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8SWNvbiBpY29uPVwiTWVudVwiIC8+XG4gICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XG4gICAgICAgICAgSUZOTyBQZXJwdXN0YWthYW5cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwiZGFuZ2VyXCJcbiAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249XCJMb2dPdXRcIiAvPiBMb2dvdXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhcldpdGhMb2dvdXQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgXG4gIEJveCwgXG4gIEgxLCBcbiAgSDIsIFxuICBIMywgXG4gIFRleHQsIFxuICBJY29uLFxuICBCYWRnZSxcbiAgTG9hZGVyXG59IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2hTdGF0cygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZmV0Y2hTdGF0cyA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0UGFnZSh7IHBhZ2VOYW1lOiAnc3RhdHMnIH0pO1xuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5zdGF0cykge1xuICAgICAgICBzZXRTdGF0cyhyZXNwb25zZS5kYXRhLnN0YXRzKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcign4p2MIEVycm9yIGZldGNoaW5nIGRhc2hib2FyZCBzdGF0czonLCBlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IHA9XCJ4eGxcIiBmbGV4IGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIiBoZWlnaHQ9XCI1MHZoXCI+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgPFRleHQgbXQ9XCJsZ1wiIGNvbG9yPVwiZ3JleTYwXCI+U2VkYW5nIG1lbXVhdCBkYXRhLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghc3RhdHMpIHtcbiAgICAgcmV0dXJuIChcbiAgICAgICAgPEJveCBwPVwieHhsXCI+XG4gICAgICAgICAgIDxUZXh0PkdhZ2FsIG1lbXVhdCBkYXRhIHN0YXRpc3Rpay48L1RleHQ+XG4gICAgICAgIDwvQm94PlxuICAgICApO1xuICB9XG5cbiAgLy8gS29tcG9uZW4gQ2FyZCBTZWRlcmhhbmEgbWVuZ2d1bmFrYW4gQm94XG4gIGNvbnN0IEluZm9DYXJkID0gKHsgdGl0bGUsIHZhbHVlLCBzdWJ0aXRsZSwgY29sb3IsIGJhZGdlIH0pID0+IChcbiAgICA8Qm94IFxuICAgICAgdmFyaWFudD1cIndoaXRlXCIgXG4gICAgICBib3hTaGFkb3c9XCJjYXJkXCIgXG4gICAgICBwPVwibGdcIiBcbiAgICAgIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIlxuICAgICAgbWI9XCJsZ1wiIC8vIE1hcmdpbiBib3R0b20gYWdhciBhbWFuIGRpIG1vYmlsZVxuICAgID5cbiAgICAgIDxIMyBtYj1cInNtXCI+e3RpdGxlfTwvSDM+XG4gICAgICA8Qm94IGZsZXggYWxpZ25JdGVtcz1cImNlbnRlclwiPlxuICAgICAgICA8SDEgc3R5bGU9e3sgY29sb3I6IGNvbG9yIHx8ICdpbmhlcml0JywgbWFyZ2luUmlnaHQ6ICc4cHgnIH19PlxuICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgPC9IMT5cbiAgICAgICAge2JhZGdlICYmIDxCYWRnZSB2YXJpYW50PVwiZGFuZ2VyXCI+e2JhZGdlfTwvQmFkZ2U+fVxuICAgICAgPC9Cb3g+XG4gICAgICA8VGV4dCBjb2xvcj1cImdyZXk2MFwiIHZhcmlhbnQ9XCJzbVwiPntzdWJ0aXRsZX08L1RleHQ+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHA9XCJ4eGxcIj5cbiAgICAgIDxIMT7wn5OKIERhc2hib2FyZCBQZXJwdXN0YWthYW48L0gxPlxuICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIiBtYj1cInh4bFwiPlxuICAgICAgICBSaW5na2FzYW4gYWt0aXZpdGFzIGRhbiBzdGF0aXN0aWsgc2lzdGVtIHBlcnB1c3Rha2FhblxuICAgICAgPC9UZXh0PlxuXG4gICAgICB7LyogLS0tIEdSSUQgVVRBTUEgKE1hbnVhbCBHcmlkIGRlbmdhbiBDU1MgR3JpZCkgLS0tICovfVxuICAgICAgPEJveCBcbiAgICAgICAgZGlzcGxheT1cImdyaWRcIiBcbiAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1ucz17WycxZnInLCAnMWZyIDFmcicsICcxZnIgMWZyIDFmciAxZnInXX0gXG4gICAgICAgIGdyaWRHYXA9XCJsZ1wiIFxuICAgICAgICBtYj1cInh4bFwiXG4gICAgICA+XG4gICAgICAgIDxJbmZvQ2FyZCBcbiAgICAgICAgICB0aXRsZT1cIvCfk5ogVG90YWwgQnVrdVwiIFxuICAgICAgICAgIHZhbHVlPXtzdGF0cy50b3RhbF9ib29rcyB8fCAwfSBcbiAgICAgICAgICBzdWJ0aXRsZT1cIkp1ZHVsIHRlcnNlZGlhXCIgXG4gICAgICAgIC8+XG4gICAgICAgIDxJbmZvQ2FyZCBcbiAgICAgICAgICB0aXRsZT1cIvCfkaUgQW5nZ290YVwiIFxuICAgICAgICAgIHZhbHVlPXtzdGF0cy50b3RhbF9tZW1iZXJzIHx8IDB9IFxuICAgICAgICAgIHN1YnRpdGxlPVwiUGVtaW5qYW0gYWt0aWZcIiBcbiAgICAgICAgLz5cbiAgICAgICAgPEluZm9DYXJkIFxuICAgICAgICAgIHRpdGxlPVwi4o+zIFBlbmRpbmdcIiBcbiAgICAgICAgICB2YWx1ZT17c3RhdHMucGVuZGluZ19ib3Jyb3dpbmdzIHx8IDB9IFxuICAgICAgICAgIHN1YnRpdGxlPVwiTWVudW5nZ3UgcGVyc2V0dWp1YW5cIiBcbiAgICAgICAgICBjb2xvcj1cIiNmMzljMTJcIlxuICAgICAgICAvPlxuICAgICAgICA8SW5mb0NhcmQgXG4gICAgICAgICAgdGl0bGU9XCLimqDvuI8gVGVybGFtYmF0XCIgXG4gICAgICAgICAgdmFsdWU9e3N0YXRzLmxhdGVfYm9ycm93aW5ncyB8fCAwfSBcbiAgICAgICAgICBzdWJ0aXRsZT1cIlBlbWluamFtYW4gdGVsYXRcIiBcbiAgICAgICAgICBjb2xvcj1cIiNlNzRjM2NcIlxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiAtLS0gR1JJRCBLRVVBTkdBTiAtLS0gKi99XG4gICAgICA8Qm94IFxuICAgICAgICBkaXNwbGF5PVwiZ3JpZFwiIFxuICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPXtbJzFmcicsICcxZnIgMWZyJ119IFxuICAgICAgICBncmlkR2FwPVwibGdcIiBcbiAgICAgICAgbWI9XCJ4eGxcIlxuICAgICAgPlxuICAgICAgICA8SW5mb0NhcmQgXG4gICAgICAgICAgdGl0bGU9XCLwn5KwIERlbmRhIEJlbHVtIERpYmF5YXJcIiBcbiAgICAgICAgICB2YWx1ZT17YFJwJHsoc3RhdHMudG90YWxfdW5wYWlkX2Ftb3VudCB8fCAwKS50b0xvY2FsZVN0cmluZygnaWQtSUQnKX1gfSBcbiAgICAgICAgICBzdWJ0aXRsZT1cIlRvdGFsIHRhZ2loYW4gYWt0aWZcIiBcbiAgICAgICAgICBjb2xvcj1cIiNlNzRjM2NcIlxuICAgICAgICAgIGJhZGdlPXtgJHtzdGF0cy51bnBhaWRfZmluZXMgfHwgMH0gdHJhbnNha3NpYH1cbiAgICAgICAgLz5cbiAgICAgICAgPEluZm9DYXJkIFxuICAgICAgICAgIHRpdGxlPVwi4pyFIERlbmRhIERpYmF5YXJcIiBcbiAgICAgICAgICB2YWx1ZT17YFJwJHsoc3RhdHMudG90YWxfcGFpZF9hbW91bnQgfHwgMCkudG9Mb2NhbGVTdHJpbmcoJ2lkLUlEJyl9YH0gXG4gICAgICAgICAgc3VidGl0bGU9XCJUb3RhbCBwZW1hc3VrYW4gZGVuZGFcIiBcbiAgICAgICAgICBjb2xvcj1cIiMyN2FlNjBcIlxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIHsvKiAtLS0gU1RBVFVTIENFUEFUIC0tLSAqL31cbiAgICAgIDxCb3ggdmFyaWFudD1cIndoaXRlXCIgYm94U2hhZG93PVwiY2FyZFwiIHA9XCJsZ1wiIGJvcmRlclJhZGl1cz1cImRlZmF1bHRcIj5cbiAgICAgICAgPEgyIG1iPVwibGdcIj7imqEgU3RhdHVzIENlcGF0PC9IMj5cbiAgICAgICAgPEJveCBkaXNwbGF5PVwiZ3JpZFwiIGdyaWRUZW1wbGF0ZUNvbHVtbnM9e1snMWZyJywgJzFmciddfSBncmlkR2FwPVwibGdcIj5cbiAgICAgICAgICAgPEJveD5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD1cImJvbGRcIj48SWNvbiBpY29uPVwiQ2xvY2tcIiAvPiBNZW51bmdndTo8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0PntzdGF0cy5wZW5kaW5nX2JvcnJvd2luZ3MgfHwgMH0gUmVxdWVzdDwvVGV4dD5cbiAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+PEljb24gaWNvbj1cIkFsZXJ0Q2lyY2xlXCIgLz4gVGVsYXQ6PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dD57c3RhdHMubGF0ZV9ib3Jyb3dpbmdzIHx8IDB9IEJ1a3U8L1RleHQ+XG4gICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiLy8gc3JjL2FkbWluL2NvbXBvbmVudHMvUmV0dXJuQm9va0Zvcm0uanN4XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgQnV0dG9uLCBEYXRlUGlja2VyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IFJldHVybkJvb2tGb3JtID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSwgYWN0aW9uIH0gPSBwcm9wcztcbiAgY29uc3QgW3JldHVybkRhdGUsIHNldFJldHVybkRhdGVdID0gdXNlU3RhdGUobmV3IERhdGUoKSk7XG4gIGNvbnN0IFtub3Rlcywgc2V0Tm90ZXNdID0gdXNlU3RhdGUoJycpO1xuICBcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgncmV0dXJuX2RhdGUnLCByZXR1cm5EYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdub3RlcycsIG5vdGVzKTtcbiAgICBcbiAgICAvLyBTdWJtaXQgZm9ybVxuICAgIGNvbnN0IGZvcm0gPSBldmVudC50YXJnZXQ7XG4gICAgZm9ybS5zdWJtaXQoKTtcbiAgfTtcbiAgXG4gIHJldHVybiAoXG4gICAgPEJveCBhcz1cImZvcm1cIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgPExhYmVsPlRhbmdnYWwgUGVuZ2VtYmFsaWFuPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgIHZhbHVlPXtyZXR1cm5EYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFJldHVybkRhdGUobmV3IERhdGUoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJsZ1wiPlxuICAgICAgICA8TGFiZWw+Q2F0YXRhbiAoT3BzaW9uYWwpPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHZhbHVlPXtub3Rlc31cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5vdGVzKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNhdGF0YW4gcGVuZ2VtYmFsaWFuLi4uXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94IG1iPVwibGdcIiBwPVwibWRcIiBzdHlsZT17eyBcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZjlmYScsIFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2RlZTJlNidcbiAgICAgIH19PlxuICAgICAgICA8c3Ryb25nPkluZm9ybWFzaSBQZW1pbmphbWFuOjwvc3Ryb25nPlxuICAgICAgICA8ZGl2PklEOiB7cmVjb3JkLnBhcmFtcy5pZH08L2Rpdj5cbiAgICAgICAgPGRpdj5Vc2VyIElEOiB7cmVjb3JkLnBhcmFtcy51c2VyX2lkfTwvZGl2PlxuICAgICAgICA8ZGl2PkJ1a3UgSUQ6IHtyZWNvcmQucGFyYW1zLmJvb2tfaWR9PC9kaXY+XG4gICAgICAgIDxkaXY+VGFuZ2dhbCBQaW5qYW06IHtyZWNvcmQucGFyYW1zLmJvcnJvd19kYXRlfTwvZGl2PlxuICAgICAgICA8ZGl2PkphdHVoIFRlbXBvOiB7cmVjb3JkLnBhcmFtcy5kdWVfZGF0ZX08L2Rpdj5cbiAgICAgICAgPGRpdj5TdGF0dXM6IHtyZWNvcmQucGFyYW1zLnN0YXR1c308L2Rpdj5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB2YXJpYW50PVwicHJpbWFyeVwiPlxuICAgICAgICBLb25maXJtYXNpIFBlbmdlbWJhbGlhblxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXR1cm5Cb29rRm9ybTsiLCIvLyBzcmMvYWRtaW4vY29tcG9uZW50cy9NYW5hZ2VGaW5lRm9ybS5qc3hcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIExhYmVsLCBJbnB1dCwgU2VsZWN0LCBUZXh0LCBCYWRnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBNYW5hZ2VGaW5lRm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XG4gIFxuICAvLyBIaXR1bmcgZGVuZGEgb3RvbWF0aXNcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkdWVEYXRlID0gbmV3IERhdGUocmVjb3JkLnBhcmFtcy5kdWVfZGF0ZSk7XG4gIGNvbnN0IGRpZmZUaW1lID0gTWF0aC5tYXgoMCwgdG9kYXkgLSBkdWVEYXRlKTtcbiAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xuICBjb25zdCBkZWZhdWx0RmluZSA9IGRpZmZEYXlzICogNTAwMDtcbiAgXG4gIHJldHVybiAoXG4gICAgPEJveCBwPVwieGxcIj5cbiAgICAgIDxCb3ggbWI9XCJ4bFwiPlxuICAgICAgICA8VGV4dCB2YXJpYW50PVwibGdcIiBib2xkPlxuICAgICAgICAgIEtlbG9sYSBEZW5kYSBQZW1pbmphbWFuICN7cmVjb3JkLnBhcmFtcy5pZH1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJsZ1wiIHA9XCJtZFwiIHN0eWxlPXt7IFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZThmNWU5JywgXG4gICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjYzhlNmM5J1xuICAgICAgfX0+XG4gICAgICAgIDxzdHJvbmc+SW5mb3JtYXNpIEtldGVybGFtYmF0YW46PC9zdHJvbmc+XG4gICAgICAgIDxkaXY+VGFuZ2dhbCBKYXR1aCBUZW1wbzoge3JlY29yZC5wYXJhbXMuZHVlX2RhdGV9PC9kaXY+XG4gICAgICAgIDxkaXY+SGFyaSBLZXRlcmxhbWJhdGFuOiA8QmFkZ2UgdmFyaWFudD1cImRhbmdlclwiPntkaWZmRGF5c30gaGFyaTwvQmFkZ2U+PC9kaXY+XG4gICAgICAgIDxkaXY+RGVuZGEgcGVyIEhhcmk6IFJwNSwwMDA8L2Rpdj5cbiAgICAgICAgPGRpdj48c3Ryb25nPlRvdGFsIERlbmRhOiBScHtkZWZhdWx0RmluZS50b0xvY2FsZVN0cmluZygnaWQtSUQnKX08L3N0cm9uZz48L2Rpdj5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgPExhYmVsPkp1bWxhaCBEZW5kYSAoUnApPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgbmFtZT1cImZpbmVfYW1vdW50XCJcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e2RlZmF1bHRGaW5lfVxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG4gICAgICBcbiAgICAgIDxCb3ggbWI9XCJsZ1wiPlxuICAgICAgICA8TGFiZWw+U3RhdHVzIFBlbWJheWFyYW48L0xhYmVsPlxuICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgbmFtZT1cInBhaWRfc3RhdHVzXCJcbiAgICAgICAgICBvcHRpb25zPXtbXG4gICAgICAgICAgICB7IHZhbHVlOiAnQmVsdW0gRGliYXlhcicsIGxhYmVsOiAnQmVsdW0gRGliYXlhcicgfSxcbiAgICAgICAgICAgIHsgdmFsdWU6ICdTdWRhaCBEaWJheWFyJywgbGFiZWw6ICdTdWRhaCBEaWJheWFyJyB9XG4gICAgICAgICAgXX1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJCZWx1bSBEaWJheWFyXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgPExhYmVsPlRhbmdnYWwgUGVtYmF5YXJhbjwvTGFiZWw+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIG5hbWU9XCJwYWlkX2RhdGVcIlxuICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RvZGF5LnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXX1cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICB7LyogSGlkZGVuIGZpZWxkIHVudHVrIGRheXNfbGF0ZSAqL31cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgbmFtZT1cImRheXNfbGF0ZVwiXG4gICAgICAgIHZhbHVlPXtkaWZmRGF5c31cbiAgICAgIC8+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VGaW5lRm9ybTsiLCIvLyBzcmMvYWRtaW4vY29tcG9uZW50cy9TdGF0dXNCYWRnZS5qc3hcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCYWRnZSwgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IFN0YXR1c0JhZGdlID0gKHByb3BzKSA9PiB7XG4gIC8vIERlZmVuc2l2ZSBwcm9ncmFtbWluZzogQ2VrIGFwYWthaCBkYXRhIGFkYVxuICBjb25zdCB7IHJlY29yZCwgcHJvcGVydHkgfSA9IHByb3BzO1xuICBcbiAgaWYgKCFyZWNvcmQgfHwgIXByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBzdGF0dXMgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdO1xuXG4gIC8vIExvZ2ljIFdhcm5hIFNlZGVyaGFuYVxuICBsZXQgdmFyaWFudCA9ICdsaWdodCc7XG4gIGlmIChbJ0Rpa2VtYmFsaWthbicsICdTdWRhaCBEaWJheWFyJ10uaW5jbHVkZXMoc3RhdHVzKSkgdmFyaWFudCA9ICdzdWNjZXNzJztcbiAgaWYgKFsnVGVybGFtYmF0JywgJ0JlbHVtIERpYmF5YXInLCAnRGl0b2xhayddLmluY2x1ZGVzKHN0YXR1cykpIHZhcmlhbnQgPSAnZGFuZ2VyJztcbiAgaWYgKHN0YXR1cyA9PT0gJ0RpcGluamFtJykgdmFyaWFudCA9ICdwcmltYXJ5JztcbiAgaWYgKHN0YXR1cyA9PT0gJ01lbnVuZ2d1IFBlcnNldHVqdWFuJykgdmFyaWFudCA9ICdpbmZvJztcblxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8QmFkZ2UgdmFyaWFudD17dmFyaWFudH0+e3N0YXR1cyB8fCAnLSd9PC9CYWRnZT5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXR1c0JhZGdlOyIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IFRvcEJhciBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9Ub3BCYXJXaXRoTG9nb3V0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Ub3BCYXIgPSBUb3BCYXJcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBSZXR1cm5Cb29rRm9ybSBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9SZXR1cm5Cb29rRm9ybSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmV0dXJuQm9va0Zvcm0gPSBSZXR1cm5Cb29rRm9ybVxuaW1wb3J0IE1hbmFnZUZpbmVGb3JtIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL01hbmFnZUZpbmVGb3JtJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5NYW5hZ2VGaW5lRm9ybSA9IE1hbmFnZUZpbmVGb3JtXG5pbXBvcnQgU3RhdHVzQmFkZ2UgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvU3RhdHVzQmFkZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlN0YXR1c0JhZGdlID0gU3RhdHVzQmFkZ2UiXSwibmFtZXMiOlsiVG9wQmFyV2l0aExvZ291dCIsInRvZ2dsZVNpZGViYXIiLCJoYW5kbGVMb2dvdXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJmbGV4IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsInB4IiwicHkiLCJiZyIsImJvcmRlckJvdHRvbSIsInN0eWxlIiwiaGVpZ2h0IiwiQnV0dG9uIiwidmFyaWFudCIsIm9uQ2xpY2siLCJtciIsInR5cGUiLCJJY29uIiwiaWNvbiIsIlRleHQiLCJmb250V2VpZ2h0Iiwic2l6ZSIsIkRhc2hib2FyZCIsInN0YXRzIiwic2V0U3RhdHMiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiYXBpIiwiQXBpQ2xpZW50IiwidXNlRWZmZWN0IiwiZmV0Y2hTdGF0cyIsInJlc3BvbnNlIiwiZ2V0UGFnZSIsInBhZ2VOYW1lIiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsInAiLCJMb2FkZXIiLCJtdCIsImNvbG9yIiwiSW5mb0NhcmQiLCJ0aXRsZSIsInZhbHVlIiwic3VidGl0bGUiLCJiYWRnZSIsImJveFNoYWRvdyIsImJvcmRlclJhZGl1cyIsIm1iIiwiSDMiLCJIMSIsIm1hcmdpblJpZ2h0IiwiQmFkZ2UiLCJkaXNwbGF5IiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdyaWRHYXAiLCJ0b3RhbF9ib29rcyIsInRvdGFsX21lbWJlcnMiLCJwZW5kaW5nX2JvcnJvd2luZ3MiLCJsYXRlX2JvcnJvd2luZ3MiLCJ0b3RhbF91bnBhaWRfYW1vdW50IiwidG9Mb2NhbGVTdHJpbmciLCJ1bnBhaWRfZmluZXMiLCJ0b3RhbF9wYWlkX2Ftb3VudCIsIkgyIiwiUmV0dXJuQm9va0Zvcm0iLCJwcm9wcyIsInJlY29yZCIsInJlc291cmNlIiwiYWN0aW9uIiwicmV0dXJuRGF0ZSIsInNldFJldHVybkRhdGUiLCJEYXRlIiwibm90ZXMiLCJzZXROb3RlcyIsImhhbmRsZVN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwidG9JU09TdHJpbmciLCJzcGxpdCIsImZvcm0iLCJ0YXJnZXQiLCJzdWJtaXQiLCJhcyIsIm9uU3VibWl0IiwibWV0aG9kIiwiTGFiZWwiLCJJbnB1dCIsIm9uQ2hhbmdlIiwiZSIsInJlcXVpcmVkIiwicGxhY2Vob2xkZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJwYXJhbXMiLCJpZCIsInVzZXJfaWQiLCJib29rX2lkIiwiYm9ycm93X2RhdGUiLCJkdWVfZGF0ZSIsInN0YXR1cyIsIk1hbmFnZUZpbmVGb3JtIiwidG9kYXkiLCJkdWVEYXRlIiwiZGlmZlRpbWUiLCJNYXRoIiwibWF4IiwiZGlmZkRheXMiLCJjZWlsIiwiZGVmYXVsdEZpbmUiLCJib2xkIiwibmFtZSIsImRlZmF1bHRWYWx1ZSIsIlNlbGVjdCIsIm9wdGlvbnMiLCJsYWJlbCIsIlN0YXR1c0JhZGdlIiwicHJvcGVydHkiLCJpbmNsdWRlcyIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIlRvcEJhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUdBLE1BQU1BLGdCQUFnQixHQUFHQSxDQUFDO0VBQUVDLEVBQUFBO0VBQWMsQ0FBQyxLQUFLO0lBQzlDLE1BQU1DLFlBQVksR0FBR0EsTUFBTTtFQUN6QjtFQUNBQyxJQUFBQSxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLGtDQUFrQztJQUMzRCxDQUFDO0VBRUQsRUFBQSxvQkFDRUMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO01BQ0ZDLElBQUksRUFBQSxJQUFBO0VBQ0pDLElBQUFBLGFBQWEsRUFBQyxLQUFLO0VBQ25CQyxJQUFBQSxjQUFjLEVBQUMsZUFBZTtFQUM5QkMsSUFBQUEsVUFBVSxFQUFDLFFBQVE7RUFDbkJDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQ1BDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQ1BDLElBQUFBLEVBQUUsRUFBQyxPQUFPO0VBQ1ZDLElBQUFBLFlBQVksRUFBQyxTQUFTO0VBQ3RCQyxJQUFBQSxLQUFLLEVBQUU7RUFBRUMsTUFBQUEsTUFBTSxFQUFFO0VBQU87RUFBRSxHQUFBLGVBRTFCWixzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7TUFBQ0MsSUFBSSxFQUFBLElB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
