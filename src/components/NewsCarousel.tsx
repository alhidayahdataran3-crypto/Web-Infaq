"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";

interface NewsItem {
    id: number;
    title: string;
    imageUrl: string | null;
    externalUrl: string | null;
    createdAt: Date;
}

export default function NewsCarousel({ news }: { news: NewsItem[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        if (news.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, [news.length]);

    const prevSlide = () => {
        if (news.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
    };

    useEffect(() => {
        if (isPaused || news.length <= 1) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide, isPaused, news.length]);

    if (news.length === 0) return null;

    return (
        <section className="py-12 bg-gray-50/50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                         <div className="inline-flex items-center gap-2 bg-[#409DA1]/10 text-[#409DA1] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                            <Newspaper className="w-4 h-4" /> Kabar Masjid
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Berita & <span className="text-[#409DA1]">Kegiatan</span>
                        </h2>
                    </div>
                    
                    {news.length > 1 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={prevSlide}
                                className="p-3 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-600 active:scale-90"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="p-3 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-600 active:scale-90"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                <div 
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="overflow-hidden rounded-[2.5rem]">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {news.map((item) => (
                                <div key={item.id} className="w-full flex-shrink-0 px-2 lg:px-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 min-h-[400px]">
                                        {/* Image Section */}
                                        <div className="relative h-64 lg:h-full overflow-hidden group">
                                            {item.imageUrl ? (
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                    <Newspaper className="w-16 h-16 text-gray-200" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                                            <div className="absolute bottom-6 left-6 lg:hidden">
                                                <span className="bg-[#409DA1] text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-widest">
                                                    Berita Terbaru
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                                            <div className="hidden lg:block mb-4">
                                                <span className="bg-[#409DA1]/10 text-[#409DA1] text-[10px] font-bold py-1.5 px-4 rounded-full uppercase tracking-widest">
                                                    Berita Terbaru
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-2xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight">
                                                {item.title}
                                            </h3>
                                            
                                            <p className="text-gray-500 text-lg mb-8 line-clamp-3">
                                                Ikuti keseruan dan update terbaru dari setiap kegiatan yang dilaksanakan di Masjid Al-Hidayah. Klik selengkapnya untuk detail berita.
                                            </p>

                                            <div className="flex items-center gap-6 mt-auto">
                                                {item.externalUrl && (
                                                    <a 
                                                        href={item.externalUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-[#409DA1] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-[#409DA1]/30 hover:bg-[#327e81] hover:-translate-y-1 transition-all active:scale-95"
                                                    >
                                                        Baca Selengkapnya
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                )}
                                                <span className="text-sm font-bold text-gray-300">
                                                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    {news.length > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {news.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === currentIndex ? "w-8 bg-[#409DA1]" : "w-2 bg-gray-200"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
