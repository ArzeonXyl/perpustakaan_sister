import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Zap, Heart } from "lucide-react"; 
import { motion } from "framer-motion"; // <-- PASTIKAN INI DIIMPOR

import BookIllustration from './a.jpg'; 

export default function Home() {
    const bookRecommendations = [
    {
        title: "Atomic Habits",
        sinopsis: "Buku yang ngajarin gimana kebiasaan kecil bisa ngubah hidup jadi jauh lebih baik. Praktis, relatable, dan bikin kamu pengen mulai dari hal sederhana.",
        icon: BookOpen,
    },
    {
        title: "Deep Work",
        sinopsis: "Panduan buat nemuin fokus di dunia yang serba cepat. Ngebantu kamu kerja lebih dalam, lebih tenang, dan hasilnya lebih berarti.",
        icon: BookOpen,
    },
    {
        title: "Ikigai",
        sinopsis: "Perjalanan mencari alasan untuk bangun setiap pagi. Buku yang lembut tapi dalam, ngajak kamu mikir ulang soal kebahagiaan dan makna hidup.",
        icon: BookOpen,
    },
    {
        title: "The Subtle Art of Not Giving a F*ck",
        sinopsis: "Cara jujur dan apa adanya buat ngadepin hidup. Bukan tentang cuek, tapi soal milih hal yang bener-bener penting buat kamu.",
        icon: BookOpen,
    },
    {
        title: "Think Again",
        sinopsis: "Ngajarin pentingnya ngeragukan diri sendiri — bukan karena lemah, tapi karena dari sanalah kita tumbuh dan belajar lagi.",
        icon: BookOpen,
    },
    {
        title: "Man’s Search for Meaning",
        sinopsis: "Kisah nyata yang nyentuh tentang gimana harapan dan makna bisa nyelamatin manusia, bahkan di masa tergelap.",
        icon: BookOpen,
    },
    {
        title: "The Mountain Is You",
        sinopsis: "Tentang menghadapi diri sendiri dan belajar berdamai dengan luka. Buku reflektif yang bikin kamu pengen jadi versi terbaik dirimu.",
        icon: BookOpen,
    },
    {
        title: "Show Your Work!",
        sinopsis: "Buat kamu yang pengen mulai berbagi karya tanpa takut. Buku ini ngajak kamu lebih berani, terbuka, dan autentik dalam berkarya.",
        icon: BookOpen,
    },
    {
        title: "The Psychology of Money",
        sinopsis: "Cerita dan pelajaran sederhana tentang cara berpikir soal uang, keputusan, dan kebahagiaan tanpa jadi kaku atau serakah.",
        icon: BookOpen,
    },
    ];


    const benefitCards = [
        {
            title: "🧠 Meningkatkan Fokus",
            desc: "Membaca melatih otak untuk tetap hadir pada satu hal dalam waktu lama. Semakin sering dilakukan, semakin mudah kita menjaga konsentrasi di tengah distraksi digital yang nggak ada habisnya.",
            icon: Brain,
        },
        {
            title: "🌏 Memperluas Wawasan",
            desc: "Setiap buku adalah jendela baru yang membuka cara kita melihat dunia. Melalui cerita, ide, dan pengalaman orang lain, kita belajar memahami perbedaan, menemukan inspirasi, dan memperkaya sudut pandang.",
            icon: Zap,
        },
        {
            title: "☕ Menenangkan Pikiran",
            desc: "Beberapa halaman bacaan bisa jadi jeda kecil di hari yang padat. Membaca menenangkan pikiran, membantu kita melepas penat, dan kembali segar menghadapi hari.",
            icon: Heart,
        },
         {
            title: "💞 Menumbuhkan Empati",
            desc: "Lewat karakter dan kisah yang beragam, membaca membantu kita memahami perasaan orang lain. Kita jadi lebih peka, hangat, dan terbuka terhadap dunia sekitar.",
            icon: Heart,
        },
         {
            title: "🎨 Memicu Kreativitas",
            desc: "Ide-ide yang kita temui di buku bisa memantik imajinasi baru. Membaca mengasah cara berpikir segar dan membantu menemukan inspirasi di tempat tak terduga.",
            icon: Heart,
        },
         {
            title: "✨ Memperkaya Hidup",
            desc: "Setiap bacaan membawa nilai dan pengalaman baru yang memberi warna dalam hidup. Membaca membantu kita menemukan makna di hal-hal kecil yang sering terlewat.",
            icon: Heart,
        },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };


    
    const carouselRef = useRef(null);

    // Hitung batas drag sekali saat komponen dimuat
    useEffect(() => {
        if (carouselRef.current) {
            // scrollWidth: Total lebar semua kartu
            // offsetWidth: Lebar viewport yang terlihat (maks-w-6xl)
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);
    
   // src/pages/Home.jsx (Definisi Komponen FlipCard)

const FlipCard = ({ book }) => {
    // 🔥🔥 STATE UNTUK MELACAK HOVER (BUKAN KLIK) 🔥🔥
    const [isHovered, setIsHovered] = useState(false);

    // Gunakan isHovered sebagai kondisi flip
    const isFlipped = isHovered; 

    return (
        <motion.div
            // Layout dan Events
            className="snap-start w-full h-full relative" 
            // 🔥 GANTI onClick dengan onMouseEnter dan onMouseLeave 🔥
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: "1000px", height: "450px" }} 
            whileHover={{ scale: 1.01 }} 
        >
            {/* Bagian Depan Kartu: COVER */}
            <motion.div
                className="absolute w-full h-full bg-gray-900 border border-gray-700 rounded-xl cursor-pointer 
                           flex flex-col justify-center items-center p-4 backface-hidden" 
                // Rotasi berdasarkan isHovered
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ zIndex: isFlipped ? 0 : 1 }} 
            >
                {/* Konten Cover */}
                <div className="h-full w-full flex items-center justify-center">
                    <book.icon className="text-blue-800" size={48} />
                </div>
            </motion.div>

            {/* Bagian Belakang Kartu: SINOPSIS */}
            <motion.div
                // Rotasi terbalik berdasarkan isHovered
                className="absolute w-full h-full bg-blue-800 text-white rounded-xl cursor-pointer 
                           flex flex-col p-6 backface-hidden overflow-y-auto"
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ zIndex: isFlipped ? 1 : 0 }} 
            >
                <h3 className="text-xl font-bold text-white mb-2 border-b pb-1">{book.title}</h3>
                <p className="text-xl leading-relaxed flex-grow">{book.sinopsis || "Sinopsis tidak tersedia."}</p>
            </motion.div>
        </motion.div>
    );
};

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden 
                        bg-gradient-to-br
                        text-gray-900">

            <header className="border top-0 z-50 flex items-center justify-between p-4 md:px-12  ">
              {/* 1. Logo MyLibrary (Kiri) */}
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-extrabold text-blue-800">
                  RumaBaca
                </span>
              </div>

              {/* 2. Navigasi dan Auth (Kanan) */}
              <div className="flex items-center space-x-8">
                {/* Navigasi Link */}
                <nav className=" md:flex space-x-8 text-lg">
                  <Link to="/" className="hover:text-blue-800">
                    Buku
                  </Link>
                  <a href="#" className="hover:text-blue-800">
                    Baca Buku itu penting
                  </a>
                  <a href="#" className="hover:text-blue-800">
                    Tentang RumaBaca
                  </a>
                  <a href="#" className="hover:text-blue-800">
                    Kontak
                  </a>
                </nav>
              </div>
            </header>
            {/* 1. HERO SECTION (Teks Senter) */}
            <main className="flex-grow flex items-center justify-center p-6 md:p-12">
                {/* Konten Utama (Text, Tombol, dan Gambar) */}
                <section className="text-center mx-auto pt-10 pb-5"> 
                    {/* Headline Utama */}
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.2 }} 
                        className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tighter" 
                    > 
                        Membaca buku  
                    </motion.h1> 
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.2 }} 
                        className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tighter" 
                    > 
                        di mana pun, kapan pun 
                    </motion.h1> 
                    
                    {/* Sub-headline */} 
                    <motion.p 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.3 }} 
                        className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto" 
                    > 
                        Perpustakaan digital yang memudahkan kamu menemukan dan membaca ribuan buku secara online. 
                    </motion.p> 

                    {/* Tombol Login dan Register */} 
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.3 }} 
                        className="flex flex-wrap gap-4 justify-center mb-16" // Jeda 64px (mb-16)
                    > 
                        <Link 
                            to="/login" 
                            className="bg-blue-800 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-blue-800/50 transition duration-300 ease-in-out flex items-center gap-2 hover:scale-[1.02] text-lg" 
                        > 
                            Login <ArrowRight size={20} /> 
                        </Link> 
                        <Link 
                            to="/register" 
                            className="bg-transparent border border-gray-400 hover:border-blue-800 text-gray-800 hover:text-blue-800 font-semibold px-8 py-4 rounded-xl transition duration-300 ease-in-out hover:bg-gray-50 hover:scale-[1.02] text-lg" 
                        > 
                            Register 
                        </Link> 
                    </motion.div> 
                    <motion.img 
                        src={BookIllustration} // Menggunakan import yang benar
                        alt="Ilustrasi Buku" 
                        className="w-full mx-auto rounded-xl"
                    />
                    
                </section> 
            </main>


            {/* ------------------------------------------------------------- */}

            {/* 2. REKOMENDASI SECTION (Diatur agar rapat dan sejajar) */}
            <motion.section 
                className="py-12 md:py-20 px-6 text-center border-t-2 border-gray-200"
            >
            {/* Header Section (Judul dan Tombol Katalog) */}
            <div className="max-w-6xl mx-auto mb-8 md:mb-10">
                <h2 className="text-3xl md:text-4xl  text-center font-extrabold">
                    Rekomendasi Buku
                </h2>
            </div>
            {/* CONTAINER SCROLLABLE CSS MURNI */}
            <div className="max-w-6xl mx-auto"> 
                <div
                    className="flex gap-4 overflow-x-scroll snap-x snap-mandatory pb-4 scroll-smooth no-scrollbar mr-[-20px]" 
                >
                    {bookRecommendations.map((book, i) => (
                        // 🔥 Ganti div lama dengan panggilan FlipCard 🔥
                        <div key={i} className="snap-start flex-shrink-0 w-[calc((100%/3)-10px)]"> 
                            <FlipCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
            </motion.section>

            {/* ------------------------------------------------------------- */}

            {/* 3. SECTION KENAPA BACA BUKU ITU PENTING */}
            <motion.section 
                className="py-12 md:py-20 px-6"
                initial="hidden"
                whileInView="visible" 
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.2 }} 
            >
                {/* Header Section (Judul Besar dan Tombol Katalog di Kanan) */}
                {/* Note: Tidak ada tombol katalog, jadi kita hanya buat judul di tengah */}
                <div className="max-w-6xl mx-auto w-full mb-8 md:mb-10">
                      <motion.h1 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.3 }} 
                        className="text-4xl text-center md:text-5xl font-extrabold mb-4 leading-tight tracking-tighter" 
                    > 
                       Kenapa Membaca Buku Penting?
                    </motion.h1> 
                </div>

                {/* Grid Card Manfaat (Card Bentuk Tulisan) */}
                <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
                  {benefitCards.map((benefit, i) => (
                      <motion.div
                          key={i}
                          variants={itemVariants}
                          // Pastikan transisi umum ada di sini untuk semua perubahan
                          transition={{ duration: 0.3 }} 
                          
                          // CARD UTAMA: Gunakan class hover untuk inversi warna
                          // Awal: Putih dengan border Ungu, Teks Hitam
                          // Hover: Background Ungu, Teks Putih
                          className="col-span-1 min-w-0 rounded-xl cursor-default p-8 flex flex-col justify-start w-full h-full 
                                    bg-white border-2 border-blue-800/10 transition duration-300 
                                    hover:bg-blue-800 hover:text-white mt-5" 
                      >
                          {/* Judul */}
                          <h3 
                              className="text-2xl font-bold mb-3 transition duration-300" 
                          >
                              {benefit.title}
                          </h3>
                          
                          {/* Deskripsi */}
                          <p 
                              className="text-base mt-auto transition duration-300" 
                          >
                              {benefit.desc}
                          </p>
                      </motion.div>
                  ))}                 
                </div>
            </motion.section>
            {/* ------------------------------------------------------------- */}

            {/* 4. TENTANG KAMI */}
             <main className="flex-grow flex items-center justify-center p-6 md:p-12">
                {/* Konten Utama (Text, Tombol, dan Gambar) */}
                <section className="text-center mx-auto pt-10 pb-5"> 
                    {/* Headline Utama */}
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.2 }} 
                        className="text-4xl text-blue-800 md:text-5xl font-extrabold mb-4 leading-tight tracking-tighter" 
                    > 
                        RumaBaca menghadirkan ruang digital yang hangat dan ramah untuk siapa pun yang ingin membaca, tempat di mana setiap buku membuka percakapan baru, memperluas cara pandang, dan menghidupkan kembali kebiasaan membaca dengan cara yang modern, ringan, dan menyenangkan. 
                    </motion.h1> 
                    {/* Tombol Login dan Register */} 
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.3 }} 
                        className="flex flex-wrap gap-4 justify-center mt-16 mb-16" // Jeda 64px (mb-16)
                    > 
                        <Link 
                            to="/login" 
                            className="bg-blue-800 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-blue-800/50 transition duration-300 ease-in-out flex items-center gap-2 hover:scale-[1.02] text-lg" 
                        > 
                            Login <ArrowRight size={20} /> 
                        </Link> 
                        <Link 
                            to="/register" 
                            className="bg-transparent border border-gray-400 hover:border-blue-800 text-gray-800 hover:text-blue-800 font-semibold px-8 py-4 rounded-xl transition duration-300 ease-in-out hover:bg-gray-50 hover:scale-[1.02] text-lg" 
                        > 
                            Register 
                        </Link> 
                    </motion.div> 
                </section> 
            </main>
            {/* ------------------------------------------------------------- */}

            {/* 5. FOOTER (Warna Ungu dengan Link Navigasi) */}
            <footer className="bg-blue-800 text-white py-10 px-6 mt-auto">
                <div className=" mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    {/* Kolom Kanan: Navigasi Link */}
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-center md:text-right">
                        <Link to="/" className="text-white">
                            Buku
                        </Link>
                        <a href="#baca-penting" className="text-white">
                            Kenapa Buku Penting
                        </a>
                        <a href="#tentang-kami" className="text-white">
                            Tentang Kami
                        </a>
                        <a href="#kontak" className="text-white">
                            Kontak
                        </a>
                    </div>
                    <div className="text-center">
                        <h3 className="text-[10rem] md:text-[150px]  font-extrabold">RumaBaca</h3>
                    </div>
                </div>
            </footer>
        </div>
    );
}