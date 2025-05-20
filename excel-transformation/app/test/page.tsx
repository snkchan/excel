"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ConvertedExcelDataType } from "@/app/types"
import { useReactToPrint } from 'react-to-print'
import { Title } from "./(component)/Title"
import { SubTitle } from "./(component)/SubTitle"
import { SubTable } from "./(component)/SubTable"
import { Details } from "./(component)/Details"
import { CompanyName } from "./(component)/CompanyName"
import { Footer } from "./(component)/Footer"
import Table from "./(component)/Table"

export default function Test() {
  const router = useRouter()
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({contentRef: printRef,
    documentTitle: "인수증",
    pageStyle: `
      @page {
        size: A4;
        margin: 15mm 5mm 5mm 5mm ; /* 상 우 하 좌 여백 */
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        /* 프린트 시 특정 요소 숨기기 */
        button {
          display: none !important;
        }
        /* 프린트 시 배경색 유지 */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `, })

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    
    const storedData = localStorage.getItem('selectedShipments')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
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
    <div className="w-full h-full flex justify-center pt-2">
      <div className="w-[794px]">
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-colors mr-2"
          >
            홈으로
          </button>
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            인쇄하기
          </button>
        </div>
        <div ref={printRef}>
          <Title data={data} hasRecipient = {true} />
          <SubTitle data={data} />
          <Table data={data}/>
          <SubTable data={data} />
          <Details data={data} />
          <CompanyName />
          <Footer />
        </div>
      </div>
    </div>
  )
}

