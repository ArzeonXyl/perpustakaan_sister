(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const TopBarWithLogout = props => {
    // AdminJS memberikan fungsi 'toggleSidebar' lewat props
    const {
      toggleSidebar
    } = props;
    const handleLogout = () => {
      // Arahkan ke endpoint logout backend kamu
      window.location.href = '/api/auth/logout';
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
      } // Jaga tinggi agar layout rapi
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9Ub3BCYXJXaXRoTG9nb3V0LmpzeCIsIi4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0Rhc2hib2FyZC5qc3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9SZXR1cm5Cb29rRm9ybS5qc3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9NYW5hZ2VGaW5lRm9ybS5qc3giLCIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9TdGF0dXNCYWRnZS5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24sIFRleHQgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgVG9wQmFyV2l0aExvZ291dCA9IChwcm9wcykgPT4ge1xuICAvLyBBZG1pbkpTIG1lbWJlcmlrYW4gZnVuZ3NpICd0b2dnbGVTaWRlYmFyJyBsZXdhdCBwcm9wc1xuICBjb25zdCB7IHRvZ2dsZVNpZGViYXIgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICAvLyBBcmFoa2FuIGtlIGVuZHBvaW50IGxvZ291dCBiYWNrZW5kIGthbXVcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXBpL2F1dGgvbG9nb3V0JzsgXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBmbGV4XG4gICAgICBmbGV4RGlyZWN0aW9uPVwicm93XCJcbiAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiXG4gICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgIHB4PVwieGxcIlxuICAgICAgcHk9XCJsZ1wiXG4gICAgICBiZz1cIndoaXRlXCJcbiAgICAgIGJvcmRlckJvdHRvbT1cImRlZmF1bHRcIlxuICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAnNjRweCcgfX0gLy8gSmFnYSB0aW5nZ2kgYWdhciBsYXlvdXQgcmFwaVxuICAgID5cbiAgICAgIHsvKiBCYWdpYW4gS2lyaTogVG9tYm9sIFNpZGViYXIgJiBKdWR1bCAqL31cbiAgICAgIDxCb3ggZmxleCBmbGV4RGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiPlxuICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCIgXG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlU2lkZWJhcn0gXG4gICAgICAgICAgbXI9XCJsZ1wiIFxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAgPEljb24gaWNvbj1cIk1lbnVcIiAvPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XG4gICAgICAgICAgSUZOTyBQZXJwdXN0YWthYW5cbiAgICAgICAgPC9UZXh0PlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBCYWdpYW4gS2FuYW46IFRvbWJvbCBMb2dvdXQgKi99XG4gICAgICA8Qm94PlxuICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIiBcbiAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIGljb249XCJMb2dPdXRcIiAvPiBMb2dvdXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRvcEJhcldpdGhMb2dvdXQ7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IFxuICBCb3gsIFxuICBIMSwgXG4gIEgyLCBcbiAgSDMsIFxuICBUZXh0LCBcbiAgSWNvbixcbiAgQmFkZ2UsXG4gIExvYWRlclxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgXG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoU3RhdHMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGZldGNoU3RhdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldFBhZ2UoeyBwYWdlTmFtZTogJ3N0YXRzJyB9KTtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEuc3RhdHMpIHtcbiAgICAgICAgc2V0U3RhdHMocmVzcG9uc2UuZGF0YS5zdGF0cyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgc3RhdHM6JywgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBwPVwieHhsXCIgZmxleCBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBmbGV4RGlyZWN0aW9uPVwiY29sdW1uXCIgaGVpZ2h0PVwiNTB2aFwiPlxuICAgICAgICA8TG9hZGVyIC8+XG4gICAgICAgIDxUZXh0IG10PVwibGdcIiBjb2xvcj1cImdyZXk2MFwiPlNlZGFuZyBtZW11YXQgZGF0YS4uLjwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICk7XG4gIH1cblxuICBpZiAoIXN0YXRzKSB7XG4gICAgIHJldHVybiAoXG4gICAgICAgIDxCb3ggcD1cInh4bFwiPlxuICAgICAgICAgICA8VGV4dD5HYWdhbCBtZW11YXQgZGF0YSBzdGF0aXN0aWsuPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgKTtcbiAgfVxuXG4gIC8vIEtvbXBvbmVuIENhcmQgU2VkZXJoYW5hIG1lbmdndW5ha2FuIEJveFxuICBjb25zdCBJbmZvQ2FyZCA9ICh7IHRpdGxlLCB2YWx1ZSwgc3VidGl0bGUsIGNvbG9yLCBiYWRnZSB9KSA9PiAoXG4gICAgPEJveCBcbiAgICAgIHZhcmlhbnQ9XCJ3aGl0ZVwiIFxuICAgICAgYm94U2hhZG93PVwiY2FyZFwiIFxuICAgICAgcD1cImxnXCIgXG4gICAgICBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCJcbiAgICAgIG1iPVwibGdcIiAvLyBNYXJnaW4gYm90dG9tIGFnYXIgYW1hbiBkaSBtb2JpbGVcbiAgICA+XG4gICAgICA8SDMgbWI9XCJzbVwiPnt0aXRsZX08L0gzPlxuICAgICAgPEJveCBmbGV4IGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgPEgxIHN0eWxlPXt7IGNvbG9yOiBjb2xvciB8fCAnaW5oZXJpdCcsIG1hcmdpblJpZ2h0OiAnOHB4JyB9fT5cbiAgICAgICAgICB7dmFsdWV9XG4gICAgICAgIDwvSDE+XG4gICAgICAgIHtiYWRnZSAmJiA8QmFkZ2UgdmFyaWFudD1cImRhbmdlclwiPntiYWRnZX08L0JhZGdlPn1cbiAgICAgIDwvQm94PlxuICAgICAgPFRleHQgY29sb3I9XCJncmV5NjBcIiB2YXJpYW50PVwic21cIj57c3VidGl0bGV9PC9UZXh0PlxuICAgIDwvQm94PlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBwPVwieHhsXCI+XG4gICAgICA8SDE+8J+TiiBEYXNoYm9hcmQgUGVycHVzdGFrYWFuPC9IMT5cbiAgICAgIDxUZXh0IGNvbG9yPVwiZ3JleTYwXCIgbWI9XCJ4eGxcIj5cbiAgICAgICAgUmluZ2thc2FuIGFrdGl2aXRhcyBkYW4gc3RhdGlzdGlrIHNpc3RlbSBwZXJwdXN0YWthYW5cbiAgICAgIDwvVGV4dD5cblxuICAgICAgey8qIC0tLSBHUklEIFVUQU1BIChNYW51YWwgR3JpZCBkZW5nYW4gQ1NTIEdyaWQpIC0tLSAqL31cbiAgICAgIDxCb3ggXG4gICAgICAgIGRpc3BsYXk9XCJncmlkXCIgXG4gICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM9e1snMWZyJywgJzFmciAxZnInLCAnMWZyIDFmciAxZnIgMWZyJ119IFxuICAgICAgICBncmlkR2FwPVwibGdcIiBcbiAgICAgICAgbWI9XCJ4eGxcIlxuICAgICAgPlxuICAgICAgICA8SW5mb0NhcmQgXG4gICAgICAgICAgdGl0bGU9XCLwn5OaIFRvdGFsIEJ1a3VcIiBcbiAgICAgICAgICB2YWx1ZT17c3RhdHMudG90YWxfYm9va3MgfHwgMH0gXG4gICAgICAgICAgc3VidGl0bGU9XCJKdWR1bCB0ZXJzZWRpYVwiIFxuICAgICAgICAvPlxuICAgICAgICA8SW5mb0NhcmQgXG4gICAgICAgICAgdGl0bGU9XCLwn5GlIEFuZ2dvdGFcIiBcbiAgICAgICAgICB2YWx1ZT17c3RhdHMudG90YWxfbWVtYmVycyB8fCAwfSBcbiAgICAgICAgICBzdWJ0aXRsZT1cIlBlbWluamFtIGFrdGlmXCIgXG4gICAgICAgIC8+XG4gICAgICAgIDxJbmZvQ2FyZCBcbiAgICAgICAgICB0aXRsZT1cIuKPsyBQZW5kaW5nXCIgXG4gICAgICAgICAgdmFsdWU9e3N0YXRzLnBlbmRpbmdfYm9ycm93aW5ncyB8fCAwfSBcbiAgICAgICAgICBzdWJ0aXRsZT1cIk1lbnVuZ2d1IHBlcnNldHVqdWFuXCIgXG4gICAgICAgICAgY29sb3I9XCIjZjM5YzEyXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEluZm9DYXJkIFxuICAgICAgICAgIHRpdGxlPVwi4pqg77iPIFRlcmxhbWJhdFwiIFxuICAgICAgICAgIHZhbHVlPXtzdGF0cy5sYXRlX2JvcnJvd2luZ3MgfHwgMH0gXG4gICAgICAgICAgc3VidGl0bGU9XCJQZW1pbmphbWFuIHRlbGF0XCIgXG4gICAgICAgICAgY29sb3I9XCIjZTc0YzNjXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogLS0tIEdSSUQgS0VVQU5HQU4gLS0tICovfVxuICAgICAgPEJveCBcbiAgICAgICAgZGlzcGxheT1cImdyaWRcIiBcbiAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1ucz17WycxZnInLCAnMWZyIDFmciddfSBcbiAgICAgICAgZ3JpZEdhcD1cImxnXCIgXG4gICAgICAgIG1iPVwieHhsXCJcbiAgICAgID5cbiAgICAgICAgPEluZm9DYXJkIFxuICAgICAgICAgIHRpdGxlPVwi8J+SsCBEZW5kYSBCZWx1bSBEaWJheWFyXCIgXG4gICAgICAgICAgdmFsdWU9e2BScCR7KHN0YXRzLnRvdGFsX3VucGFpZF9hbW91bnQgfHwgMCkudG9Mb2NhbGVTdHJpbmcoJ2lkLUlEJyl9YH0gXG4gICAgICAgICAgc3VidGl0bGU9XCJUb3RhbCB0YWdpaGFuIGFrdGlmXCIgXG4gICAgICAgICAgY29sb3I9XCIjZTc0YzNjXCJcbiAgICAgICAgICBiYWRnZT17YCR7c3RhdHMudW5wYWlkX2ZpbmVzIHx8IDB9IHRyYW5zYWtzaWB9XG4gICAgICAgIC8+XG4gICAgICAgIDxJbmZvQ2FyZCBcbiAgICAgICAgICB0aXRsZT1cIuKchSBEZW5kYSBEaWJheWFyXCIgXG4gICAgICAgICAgdmFsdWU9e2BScCR7KHN0YXRzLnRvdGFsX3BhaWRfYW1vdW50IHx8IDApLnRvTG9jYWxlU3RyaW5nKCdpZC1JRCcpfWB9IFxuICAgICAgICAgIHN1YnRpdGxlPVwiVG90YWwgcGVtYXN1a2FuIGRlbmRhXCIgXG4gICAgICAgICAgY29sb3I9XCIjMjdhZTYwXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICB7LyogLS0tIFNUQVRVUyBDRVBBVCAtLS0gKi99XG4gICAgICA8Qm94IHZhcmlhbnQ9XCJ3aGl0ZVwiIGJveFNoYWRvdz1cImNhcmRcIiBwPVwibGdcIiBib3JkZXJSYWRpdXM9XCJkZWZhdWx0XCI+XG4gICAgICAgIDxIMiBtYj1cImxnXCI+4pqhIFN0YXR1cyBDZXBhdDwvSDI+XG4gICAgICAgIDxCb3ggZGlzcGxheT1cImdyaWRcIiBncmlkVGVtcGxhdGVDb2x1bW5zPXtbJzFmcicsICcxZnInXX0gZ3JpZEdhcD1cImxnXCI+XG4gICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJib2xkXCI+PEljb24gaWNvbj1cIkNsb2NrXCIgLz4gTWVudW5nZ3U6PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dD57c3RhdHMucGVuZGluZ19ib3Jyb3dpbmdzIHx8IDB9IFJlcXVlc3Q8L1RleHQ+XG4gICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICA8Qm94PlxuICAgICAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiPjxJY29uIGljb249XCJBbGVydENpcmNsZVwiIC8+IFRlbGF0OjwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQ+e3N0YXRzLmxhdGVfYm9ycm93aW5ncyB8fCAwfSBCdWt1PC9UZXh0PlxuICAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0JveD5cblxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkOyIsIi8vIHNyYy9hZG1pbi9jb21wb25lbnRzL1JldHVybkJvb2tGb3JtLmpzeFxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBMYWJlbCwgSW5wdXQsIEJ1dHRvbiwgRGF0ZVBpY2tlciB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBSZXR1cm5Cb29rRm9ybSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UsIGFjdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IFtyZXR1cm5EYXRlLCBzZXRSZXR1cm5EYXRlXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkpO1xuICBjb25zdCBbbm90ZXMsIHNldE5vdGVzXSA9IHVzZVN0YXRlKCcnKTtcbiAgXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3JldHVybl9kYXRlJywgcmV0dXJuRGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0pO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgnbm90ZXMnLCBub3Rlcyk7XG4gICAgXG4gICAgLy8gU3VibWl0IGZvcm1cbiAgICBjb25zdCBmb3JtID0gZXZlbnQudGFyZ2V0O1xuICAgIGZvcm0uc3VibWl0KCk7XG4gIH07XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3ggYXM9XCJmb3JtXCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gbWV0aG9kPVwicG9zdFwiPlxuICAgICAgPEJveCBtYj1cImxnXCI+XG4gICAgICAgIDxMYWJlbD5UYW5nZ2FsIFBlbmdlbWJhbGlhbjwvTGFiZWw+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICB2YWx1ZT17cmV0dXJuRGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZXR1cm5EYXRlKG5ldyBEYXRlKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgPExhYmVsPkNhdGF0YW4gKE9wc2lvbmFsKTwvTGFiZWw+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICB2YWx1ZT17bm90ZXN9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROb3RlcyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJDYXRhdGFuIHBlbmdlbWJhbGlhbi4uLlwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveCBtYj1cImxnXCIgcD1cIm1kXCIgc3R5bGU9e3sgXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmOGY5ZmEnLCBcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkZWUyZTYnXG4gICAgICB9fT5cbiAgICAgICAgPHN0cm9uZz5JbmZvcm1hc2kgUGVtaW5qYW1hbjo8L3N0cm9uZz5cbiAgICAgICAgPGRpdj5JRDoge3JlY29yZC5wYXJhbXMuaWR9PC9kaXY+XG4gICAgICAgIDxkaXY+VXNlciBJRDoge3JlY29yZC5wYXJhbXMudXNlcl9pZH08L2Rpdj5cbiAgICAgICAgPGRpdj5CdWt1IElEOiB7cmVjb3JkLnBhcmFtcy5ib29rX2lkfTwvZGl2PlxuICAgICAgICA8ZGl2PlRhbmdnYWwgUGluamFtOiB7cmVjb3JkLnBhcmFtcy5ib3Jyb3dfZGF0ZX08L2Rpdj5cbiAgICAgICAgPGRpdj5KYXR1aCBUZW1wbzoge3JlY29yZC5wYXJhbXMuZHVlX2RhdGV9PC9kaXY+XG4gICAgICAgIDxkaXY+U3RhdHVzOiB7cmVjb3JkLnBhcmFtcy5zdGF0dXN9PC9kaXY+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgdmFyaWFudD1cInByaW1hcnlcIj5cbiAgICAgICAgS29uZmlybWFzaSBQZW5nZW1iYWxpYW5cbiAgICAgIDwvQnV0dG9uPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmV0dXJuQm9va0Zvcm07IiwiLy8gc3JjL2FkbWluL2NvbXBvbmVudHMvTWFuYWdlRmluZUZvcm0uanN4XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBMYWJlbCwgSW5wdXQsIFNlbGVjdCwgVGV4dCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgTWFuYWdlRmluZUZvcm0gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzO1xuICBcbiAgLy8gSGl0dW5nIGRlbmRhIG90b21hdGlzXG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZHVlRGF0ZSA9IG5ldyBEYXRlKHJlY29yZC5wYXJhbXMuZHVlX2RhdGUpO1xuICBjb25zdCBkaWZmVGltZSA9IE1hdGgubWF4KDAsIHRvZGF5IC0gZHVlRGF0ZSk7XG4gIGNvbnN0IGRpZmZEYXlzID0gTWF0aC5jZWlsKGRpZmZUaW1lIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgY29uc3QgZGVmYXVsdEZpbmUgPSBkaWZmRGF5cyAqIDUwMDA7XG4gIFxuICByZXR1cm4gKFxuICAgIDxCb3ggcD1cInhsXCI+XG4gICAgICA8Qm94IG1iPVwieGxcIj5cbiAgICAgICAgPFRleHQgdmFyaWFudD1cImxnXCIgYm9sZD5cbiAgICAgICAgICBLZWxvbGEgRGVuZGEgUGVtaW5qYW1hbiAje3JlY29yZC5wYXJhbXMuaWR9XG4gICAgICAgIDwvVGV4dD5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94IG1iPVwibGdcIiBwPVwibWRcIiBzdHlsZT17eyBcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2U4ZjVlOScsIFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2M4ZTZjOSdcbiAgICAgIH19PlxuICAgICAgICA8c3Ryb25nPkluZm9ybWFzaSBLZXRlcmxhbWJhdGFuOjwvc3Ryb25nPlxuICAgICAgICA8ZGl2PlRhbmdnYWwgSmF0dWggVGVtcG86IHtyZWNvcmQucGFyYW1zLmR1ZV9kYXRlfTwvZGl2PlxuICAgICAgICA8ZGl2PkhhcmkgS2V0ZXJsYW1iYXRhbjogPEJhZGdlIHZhcmlhbnQ9XCJkYW5nZXJcIj57ZGlmZkRheXN9IGhhcmk8L0JhZGdlPjwvZGl2PlxuICAgICAgICA8ZGl2PkRlbmRhIHBlciBIYXJpOiBScDUsMDAwPC9kaXY+XG4gICAgICAgIDxkaXY+PHN0cm9uZz5Ub3RhbCBEZW5kYTogUnB7ZGVmYXVsdEZpbmUudG9Mb2NhbGVTdHJpbmcoJ2lkLUlEJyl9PC9zdHJvbmc+PC9kaXY+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveCBtYj1cImxnXCI+XG4gICAgICAgIDxMYWJlbD5KdW1sYWggRGVuZGEgKFJwKTwvTGFiZWw+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIG5hbWU9XCJmaW5lX2Ftb3VudFwiXG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0RmluZX1cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgICAgXG4gICAgICA8Qm94IG1iPVwibGdcIj5cbiAgICAgICAgPExhYmVsPlN0YXR1cyBQZW1iYXlhcmFuPC9MYWJlbD5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIG5hbWU9XCJwYWlkX3N0YXR1c1wiXG4gICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgeyB2YWx1ZTogJ0JlbHVtIERpYmF5YXInLCBsYWJlbDogJ0JlbHVtIERpYmF5YXInIH0sXG4gICAgICAgICAgICB7IHZhbHVlOiAnU3VkYWggRGliYXlhcicsIGxhYmVsOiAnU3VkYWggRGliYXlhcicgfVxuICAgICAgICAgIF19XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPVwiQmVsdW0gRGliYXlhclwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgPEJveCBtYj1cImxnXCI+XG4gICAgICAgIDxMYWJlbD5UYW5nZ2FsIFBlbWJheWFyYW48L0xhYmVsPlxuICAgICAgICA8SW5wdXRcbiAgICAgICAgICBuYW1lPVwicGFpZF9kYXRlXCJcbiAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXt0b2RheS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF19XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICAgIFxuICAgICAgey8qIEhpZGRlbiBmaWVsZCB1bnR1ayBkYXlzX2xhdGUgKi99XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgIG5hbWU9XCJkYXlzX2xhdGVcIlxuICAgICAgICB2YWx1ZT17ZGlmZkRheXN9XG4gICAgICAvPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlRmluZUZvcm07IiwiLy8gc3JjL2FkbWluL2NvbXBvbmVudHMvU3RhdHVzQmFkZ2UuanN4XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQmFkZ2UsIEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuXG5jb25zdCBTdGF0dXNCYWRnZSA9IChwcm9wcykgPT4ge1xuICAvLyBEZWZlbnNpdmUgcHJvZ3JhbW1pbmc6IENlayBhcGFrYWggZGF0YSBhZGFcbiAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcbiAgXG4gIGlmICghcmVjb3JkIHx8ICFwcm9wZXJ0eSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc3RhdHVzID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXTtcblxuICAvLyBMb2dpYyBXYXJuYSBTZWRlcmhhbmFcbiAgbGV0IHZhcmlhbnQgPSAnbGlnaHQnO1xuICBpZiAoWydEaWtlbWJhbGlrYW4nLCAnU3VkYWggRGliYXlhciddLmluY2x1ZGVzKHN0YXR1cykpIHZhcmlhbnQgPSAnc3VjY2Vzcyc7XG4gIGlmIChbJ1RlcmxhbWJhdCcsICdCZWx1bSBEaWJheWFyJywgJ0RpdG9sYWsnXS5pbmNsdWRlcyhzdGF0dXMpKSB2YXJpYW50ID0gJ2Rhbmdlcic7XG4gIGlmIChzdGF0dXMgPT09ICdEaXBpbmphbScpIHZhcmlhbnQgPSAncHJpbWFyeSc7XG4gIGlmIChzdGF0dXMgPT09ICdNZW51bmdndSBQZXJzZXR1anVhbicpIHZhcmlhbnQgPSAnaW5mbyc7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94PlxuICAgICAgPEJhZGdlIHZhcmlhbnQ9e3ZhcmlhbnR9PntzdGF0dXMgfHwgJy0nfTwvQmFkZ2U+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNCYWRnZTsiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBUb3BCYXIgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvVG9wQmFyV2l0aExvZ291dCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVG9wQmFyID0gVG9wQmFyXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL0Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgUmV0dXJuQm9va0Zvcm0gZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvUmV0dXJuQm9va0Zvcm0nXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJldHVybkJvb2tGb3JtID0gUmV0dXJuQm9va0Zvcm1cbmltcG9ydCBNYW5hZ2VGaW5lRm9ybSBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9NYW5hZ2VGaW5lRm9ybSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuTWFuYWdlRmluZUZvcm0gPSBNYW5hZ2VGaW5lRm9ybVxuaW1wb3J0IFN0YXR1c0JhZGdlIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL1N0YXR1c0JhZGdlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TdGF0dXNCYWRnZSA9IFN0YXR1c0JhZGdlIl0sIm5hbWVzIjpbIlRvcEJhcldpdGhMb2dvdXQiLCJwcm9wcyIsInRvZ2dsZVNpZGViYXIiLCJoYW5kbGVMb2dvdXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJmbGV4IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsInB4IiwicHkiLCJiZyIsImJvcmRlckJvdHRvbSIsInN0eWxlIiwiaGVpZ2h0IiwiQnV0dG9uIiwidmFyaWFudCIsIm9uQ2xpY2siLCJtciIsInR5cGUiLCJJY29uIiwiaWNvbiIsIlRleHQiLCJmb250V2VpZ2h0Iiwic2l6ZSIsIkRhc2hib2FyZCIsInN0YXRzIiwic2V0U3RhdHMiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiYXBpIiwiQXBpQ2xpZW50IiwidXNlRWZmZWN0IiwiZmV0Y2hTdGF0cyIsInJlc3BvbnNlIiwiZ2V0UGFnZSIsInBhZ2VOYW1lIiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsInAiLCJMb2FkZXIiLCJtdCIsImNvbG9yIiwiSW5mb0NhcmQiLCJ0aXRsZSIsInZhbHVlIiwic3VidGl0bGUiLCJiYWRnZSIsImJveFNoYWRvdyIsImJvcmRlclJhZGl1cyIsIm1iIiwiSDMiLCJIMSIsIm1hcmdpblJpZ2h0IiwiQmFkZ2UiLCJkaXNwbGF5IiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdyaWRHYXAiLCJ0b3RhbF9ib29rcyIsInRvdGFsX21lbWJlcnMiLCJwZW5kaW5nX2JvcnJvd2luZ3MiLCJsYXRlX2JvcnJvd2luZ3MiLCJ0b3RhbF91bnBhaWRfYW1vdW50IiwidG9Mb2NhbGVTdHJpbmciLCJ1bnBhaWRfZmluZXMiLCJ0b3RhbF9wYWlkX2Ftb3VudCIsIkgyIiwiUmV0dXJuQm9va0Zvcm0iLCJyZWNvcmQiLCJyZXNvdXJjZSIsImFjdGlvbiIsInJldHVybkRhdGUiLCJzZXRSZXR1cm5EYXRlIiwiRGF0ZSIsIm5vdGVzIiwic2V0Tm90ZXMiLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInRvSVNPU3RyaW5nIiwic3BsaXQiLCJmb3JtIiwidGFyZ2V0Iiwic3VibWl0IiwiYXMiLCJvblN1Ym1pdCIsIm1ldGhvZCIsIkxhYmVsIiwiSW5wdXQiLCJvbkNoYW5nZSIsImUiLCJyZXF1aXJlZCIsInBsYWNlaG9sZGVyIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwicGFyYW1zIiwiaWQiLCJ1c2VyX2lkIiwiYm9va19pZCIsImJvcnJvd19kYXRlIiwiZHVlX2RhdGUiLCJzdGF0dXMiLCJNYW5hZ2VGaW5lRm9ybSIsInRvZGF5IiwiZHVlRGF0ZSIsImRpZmZUaW1lIiwiTWF0aCIsIm1heCIsImRpZmZEYXlzIiwiY2VpbCIsImRlZmF1bHRGaW5lIiwiYm9sZCIsIm5hbWUiLCJkZWZhdWx0VmFsdWUiLCJTZWxlY3QiLCJvcHRpb25zIiwibGFiZWwiLCJTdGF0dXNCYWRnZSIsInByb3BlcnR5IiwiaW5jbHVkZXMiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJUb3BCYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFHQSxNQUFNQSxnQkFBZ0IsR0FBSUMsS0FBSyxJQUFLO0VBQ2xDO0lBQ0EsTUFBTTtFQUFFQyxJQUFBQTtFQUFjLEdBQUMsR0FBR0QsS0FBSztJQUUvQixNQUFNRSxZQUFZLEdBQUdBLE1BQU07RUFDekI7RUFDQUMsSUFBQUEsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksR0FBRyxrQkFBa0I7SUFDM0MsQ0FBQztFQUVELEVBQUEsb0JBQ0VDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtNQUNGQyxJQUFJLEVBQUEsSUFBQTtFQUNKQyxJQUFBQSxhQUFhLEVBQUMsS0FBSztFQUNuQkMsSUFBQUEsY0FBYyxFQUFDLGVBQWU7RUFDOUJDLElBQUFBLFVBQVUs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
