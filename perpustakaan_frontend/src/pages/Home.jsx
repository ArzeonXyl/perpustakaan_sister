import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Zap, Heart } from "lucide-react"; 
import { motion } from "framer-motion"; // <-- PASTIKAN INI DIIMPOR

import BookIllustration from './a.jpg'; 

export default function Home() {
    const bookRecommendations = [
        {
            title: "Atomic Habits",
            desc: "Bangun kebiasaan kecil yang menciptakan perubahan besar.",
            icon: BookOpen,
        },
        {
            title: "Deep Work",
            desc: "Pelajari seni fokus mendalam di dunia yang penuh distraksi.",
            icon: BookOpen,
        },
        {
            title: "Ikigai",
            desc: "Temukan alasan hidupmu dan jalani hari dengan makna.",
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

    return (
        <div className="min-h-screen flex flex-col 
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
                className="py-12 md:py-20 px-6 "
                initial="hidden"
                whileInView="visible" 
                variants={sectionVariants}
                viewport={{ once: true, amount: 0.2 }} 
            >

                <div className="max-w-6xl mx-auto w-full mb-8 md:mb-10">
                    
                    {/* Baris 1: Judul di Tengah (Mengambil Seluruh Lebar) */}
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} // <-- 🔥 AKTIF SETIAP KALI TERLIHAT 🔥
                        transition={{ duration: 0.6, delay: 0.3 }} 
                        className="text-4xl text-center md:text-5xl font-extrabold mb-4 leading-tight tracking-tighter" 
                    > 
                        Rekomendasi Buku
                    </motion.h1> 
                </div>        

                {/* Grid Card Rekomendasi: Menggunakan grid-cols-3 dan gap-3 yang rapat */}
                <div className="grid grid-cols-3 gap-3 max-w-6xl mx-auto">
                    {bookRecommendations.map((book, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            // Menggunakan col-span-1 min-w-0 agar mirip struktur di atas
                            className="col-span-1 min-w-0 text-left" 
                        >
                            {/* 1. KOTAK CARD BUKU (Representasi Cover Buku - Hitam) */}
                            <motion.div
                                className="bg-gray-900 border border-gray-700 h-96 rounded-md cursor-pointer 
                                           mb-5 flex items-center justify-center overflow-hidden" 
                            >
                                {/* Ikon di tengah "cover" */}
                                <book.icon className="text-blue-800" size={48} />
                            </motion.div>

                            {/* 2. JUDUL DAN SUB-HEADLINE (DI BAWAH CARD) */}
                            {/* Font size lebih kecil agar tidak makan tempat dan rapat */}
                            <h2 className="text-2xl font-bold mb-1">{book.title}</h2>
                            <p className="text-gray-600 text-base">{book.desc}</p>

                        </motion.div>
                    ))}
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