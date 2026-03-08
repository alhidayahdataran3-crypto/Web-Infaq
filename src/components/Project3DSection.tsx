"use client";

import { Box, Sparkles, Move3D, Layers, ZoomIn } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function Project3DSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#409DA1]/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full -ml-48 -mb-48 blur-3xl" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 bg-[#409DA1]/10 text-[#409DA1] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles className="w-4 h-4" /> Proyek Pembangunan
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8">
                            Visualisasi 3D <br />
                            <span className="text-[#409DA1]">Dapur Utama</span> Masjid
                        </h2>
                        
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Kami menghadirkan keterbukaan informasi melalui visualisasi rancangan dapur masjid yang akan dibangun. Donatur dapat melihat secara detail setiap sudut ruangan untuk memastikan transparansi desain dan fungsi.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[#409DA1]">
                                    <Move3D className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Rotasi 360°</h4>
                                    <p className="text-xs text-gray-500">Putar model ke segala arah</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="p-3 bg-white rounded-xl shadow-sm text-[#409DA1]">
                                    <ZoomIn className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Detail Zoom</h4>
                                    <p className="text-xs text-gray-500">Lihat material lebih dekat</p>
                                </div>
                            </div>
                        </div>

                        <a 
                            href="#donasi" 
                            className="inline-flex items-center gap-3 bg-gray-900 text-white font-bold px-10 py-5 rounded-2xl hover:bg-black hover:-translate-y-1 transition-all shadow-xl active:scale-95 group text-lg"
                        >
                            Infaq Pembangunan
                            <Box className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </a>
                    </div>

                    {/* 3D Viewer Container */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#409DA1]/20 to-transparent rounded-[3rem] blur-2xl group-hover:scale-105 transition-transform duration-700" />
                        
                        <div className="relative aspect-square bg-gray-50 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden shadow-gray-200">
                            <model-viewer
                                src="/3d/dapurr5.glb"
                                poster="/3d-poster.png"
                                alt="3D Model Dapur Masjid Al-Hidayah"
                                auto-rotate
                                camera-controls
                                ar
                                shadow-intensity="1"
                                className="w-full h-full outline-none"
                                stage-light-intensity="2"
                                environment-intensity="1.5"
                                style={{ backgroundColor: 'transparent' }}
                            >
                                <div slot="ar-button" className="absolute bottom-6 right-6 bg-white shadow-xl px-6 py-3 rounded-2xl border border-gray-100 flex items-center gap-2 font-bold text-gray-800 text-sm cursor-pointer active:scale-95 transition-all">
                                    <Box className="w-5 h-5 text-[#409DA1]" />
                                    Lihat di Ruangan (AR)
                                </div>

                                <div className="absolute top-6 left-6 text-[10px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-widest bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50">
                                    <Layers className="w-3 h-3" /> Interactive 3D Model
                                </div>
                            </model-viewer>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-[180px] hidden sm:block">
                            <div className="flex items-center gap-2 text-green-500 font-bold text-xs mb-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Rencana Aktif
                            </div>
                            <p className="text-gray-800 font-bold text-sm">Status: Perancangan Arsitektur 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
