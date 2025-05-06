"use client"
import React from "react"
import { Sparkles, Bot, Heart, Globe, Search, Pencil } from "lucide-react"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <div className="flex h-screen bg-white text-black">
      {/* 왼쪽 사이드 메뉴 */}
      <aside className="w-64 border-r border-gray-200 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Sogaeting AI</h1>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            당신의 감정, 스타일, 관계의 흐름을 읽는 <br /> 감정 기반 연애 코칭
            서비스
          </p>
          <button>
            <Search size={16} /> 검색하기
          </button>
          <button>
            <Pencil size={16} /> 새 글 쓰기
          </button>
        </div>
        <div className="pt-6 border-t border-gray-100 space-y-2 text-sm">
          <p className="font-semibold">서비스 소개</p>
          <ul className="text-gray-600 space-y-1">
            <li>- 연애 감정 분석</li>
            <li>- 맞춤형 데이트 코칭</li>
            <li>- 감정 기반 연애 운세</li>
            <li>- 글로벌 AI 파트너 연동</li>
          </ul>
        </div>
      </aside>

      {/* 메인 대화 화면 */}
      <main className="flex-1 p-10 overflow-y-auto">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          사랑의 언어, AI로 시작하다
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl shadow">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Bot size={24} />
                <h3 className="text-lg font-semibold">연애 감정 분석</h3>
              </div>
              <p className="text-sm text-gray-600">
                카톡 대화, 성향, 최근 감정 상태를 기반으로 연애 흐름을 분석해요.
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart size={24} />
                <h3 className="text-lg font-semibold">맞춤형 데이트 코칭</h3>
              </div>
              <p className="text-sm text-gray-600">
                당신의 성향과 상대의 스타일을 반영한 코칭을 제공합니다.
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={24} />
                <h3 className="text-lg font-semibold">감정 기반 연애 운세</h3>
              </div>
              <p className="text-sm text-gray-600">
                오늘의 감정 흐름과 연애운을 진단하고 위로 콘텐츠도 함께
                제공해요.
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe size={24} />
                <h3 className="text-lg font-semibold">글로벌 AI 파트너</h3>
              </div>
              <p className="text-sm text-gray-600">
                GPT-4, Kursor, Perplexity와 연동해 더 정밀하고 풍부한 연애
                분석을 제공해요.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
