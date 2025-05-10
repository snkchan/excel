"use client"

import { useEffect, useState } from "react"
import { ConvertedExcelDataType } from "@/app/types"

export default function MultPage() {
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    const storedData = localStorage.getItem('selectedShipments')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        // 콘솔에 데이터 출력
        console.log('Multiple shipments data:', parsedData)
        console.log('Number of selected items:', parsedData.length)
      } catch (error) {
        console.error("Invalid JSON:", error)
      }
    }
  }, [])

  // 컴포넌트가 언마운트될 때 localStorage 정리
  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedShipments')
    }
  }, [])

  if (!data[0]) return null

  return (
    <div className="w-full h-full flex justify-center pt-6">
      <div className="w-[794px]">
        <h1 className="text-2xl font-bold mb-4">다중 인수증 확인</h1>
        <p className="text-gray-600">선택된 항목 수: {data.length}개</p>
        {/* 여기에 추가적인 UI 컴포넌트들을 구현하시면 됩니다 */}
      </div>
    </div>
  )
}