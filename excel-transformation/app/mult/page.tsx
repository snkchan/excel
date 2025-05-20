"use client"

import { useEffect, useState, useRef } from "react"
import { ConvertedExcelDataType } from "@/app/types"
import { useReactToPrint } from 'react-to-print'

import Table, { normalizeProductName } from "./(component)/Table"
import { italianRyegrass, oat, rye } from "../test/(component)/const"
import { Title } from "../test/(component)/Title"
import { SubTitle } from "./(component)/SubTitle"
import { SubTable } from "../test/(component)/SubTable"
import { Details } from "../test/(component)/Details"
import { CompanyName } from "../test/(component)/CompanyName"
import { Footer } from "../test/(component)/Footer"

export default function MultPage() {
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])
  const [page, setPage] = useState(0) // 0: 목록, 1: 테이블
  const listPrintRef = useRef<HTMLDivElement>(null)
  const tablePrintRef = useRef<HTMLDivElement>(null)

  // 목록 페이지 프린트 핸들러
  const handleListPrint = useReactToPrint({
    contentRef: listPrintRef,
    documentTitle: "인수증 목록",
    pageStyle: `
      @page {
        size: A4 landscape; /* A4 가로 방향 */
        margin: 10mm; /* 여백 조정 */
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        button {
          display: none !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
  
        /* 테이블 스타일 조정 */
        table {
          width: 100% !important; /* 테이블 너비를 100%로 설정 */
          border-collapse: collapse !important; /* 셀 간 간격 제거 */
          table-layout: fixed !important; /* 컬럼 너비 고정 */
        }
  
        th, td {
          border: 1px solid #d1d5db !important; /* 테두리 색상 */
          padding: 4px 8px !important; /* 셀 패딩 조정 */
          word-wrap: break-word !important; /* 긴 단어 줄바꿈 */
          overflow-wrap: break-word !important; /* 긴 단어 줄바꿈 (CSS3) */
          text-align: center !important; /* 텍스트 가운데 정렬 */
        }
  
        th {
           background-color: #fef9c3 !important; /* 헤더 배경색 */
           font-weight: bold !important;
        }
  
        tbody tr:nth-child(even) {
          background-color: #f9fafb !important; /* 홀수/짝수 행 배경색 */
        }
         tbody tr:hover {
          background-color: #f3f4f6 !important; /* 호버 배경색 */
        }
  
  
        /* 컬럼 너비 조정 (화면에 맞춰 대략적으로 설정) */
        th:nth-child(1), td:nth-child(1) { width: 5% !important; } /* 순번 */
        th:nth-child(2), td:nth-child(2) { width: 12% !important; } /* 성명 */
        th:nth-child(3), td:nth-child(3) { width: 14% !important; } /* 연락처 */
        th:nth-child(4), td:nth-child(4) { width: 25% !important; text-align: center !important; } /* 주소 (왼쪽 정렬 유지) */
        th:nth-child(5), td:nth-child(5) { width: 25% !important; background-color: #d1fae5 !important; } /* 품종 */
        th:nth-child(6), td:nth-child(6) { width: 6% !important; background-color: #dbeafe !important; } /* 포수 */
        th:nth-child(7), td:nth-child(7) { width: 6% !important; background-color: #dbeafe !important; } /* 중량 */
        th:nth-child(8), td:nth-child(8) { width: 7% !important; } /* 확인 */
      }
    `,
  })

  // 테이블 페이지 프린트 핸들러
  const handleTablePrint = useReactToPrint({
    contentRef: tablePrintRef,
    documentTitle: "인수증",
    pageStyle: `
      @page {
        size: A4;
        margin: 5mm;
      }
      @media print {
        body {
          /* 프린트 시 body에 flexbox 적용하여 콘텐츠 중앙 정렬 */
          display: flex;
          justify-content: center; /* 수평 중앙 정렬 */
          align-items: center; /* 수직 중앙 정렬 */
          min-height: 100vh; /* 페이지 전체 높이 */
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        button {
          display: none !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  })

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 데이터 읽어옴
    const storedData = localStorage.getItem('selectedShipments')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        console.log('Multiple shipments data:', parsedData)
      } catch (error) {
        console.error("Invalid JSON:", error)
      }
    }

    // 컴포넌트 언마운트 시 (페이지 이동 시) localStorage에서 데이터 삭제
    return () => {
      console.log("Clearing localStorage on page move or unmount"); // 확인용 로그 추가
      localStorage.removeItem('selectedShipments')
    }
  }, []) // 빈 배열은 컴포넌트 마운트/언마운트 시에만 실행됨

  if (!data[0]) return null

  return (
    <div className="w-full h-full flex justify-center pt-6 bg-gray-100 min-h-screen">
      <div className="w-dvw bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">  
          <h1 className="text-2xl font-bold">다중 인수증 확인</h1>
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold">총 <span className="text-blue-500">{data.length}</span>건</h3>
            <button 
              onClick={() => setPage(prev => prev === 0 ? 1 : 0)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {page === 0 ? "인수증 보기" : "목록으로 돌아가기"}
            </button>
            <button 
              onClick={page === 0 ? handleListPrint : handleTablePrint}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              인쇄하기
            </button>
          </div>
        </div>

        {page === 0 ? (
          <div ref={listPrintRef} className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="border border-gray-300 px-2 py-1 w-[4rem]">순번</th>
                  <th className="border border-gray-300 px-2 py-1 w-[12rem]">성명</th>
                  <th className="border border-gray-300 px-2 py-1 w-[10rem]">연락처</th>
                  <th className="border border-gray-300 px-2 py-1 w-[30rem]">주소</th>
                  <th className="border border-gray-300 px-2 py-1 bg-green-100">품 종</th>
                  <th className="border border-gray-300 px-2 py-1 bg-blue-100 w-[4rem]">포수</th>
                  <th className="border border-gray-300 px-2 py-1 bg-blue-100 w-[4rem]" >중량</th>
                  <th className="border border-gray-300 px-2 py-1 w-[5rem]">확인</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1 text-gray-500 font-bold list-text">{idx+1}</td>
                    <td className="border border-gray-300 px-2 py-1 font-bold text-gray-800 list-text">{item.recipient}</td>
                    <td className="border border-gray-300 px-2 py-1 list-text">{item.phoneNumber}</td>
                    <td className="border border-gray-300 px-2 py-1 list-text">{item.address}</td>
                    <td className="border border-gray-300 px-2 py-1 bg-green-100 max-w-[100px] list-text ">{koreanProdcutName(item.productName as string)}{item.remarks ? `(${item.remarks})` : ""}</td>
                    <td className="border border-gray-300 px-2 py-1 bg-blue-100 list-text">{item.quantity}</td>
                    <td className="border border-gray-300 px-2 py-1 bg-blue-100 list-text">{item.weight}</td>
                    <td className="border border-gray-300 px-2 py-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center">
          <div ref={tablePrintRef} className="w-[900px]">
            <Title data={data} />
            <SubTitle data={data} />
            <Table data={data} />
            <SubTable data={data} />
            <Details data={data} />
            <CompanyName />
            <Footer />
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

const koreanProdcutName = (pn:string)=>{
  const productName = normalizeProductName(pn as string)
  if(productName === "Florida 80") return "플로리다80"
  if(Object.keys(italianRyegrass).includes(productName)) return italianRyegrass[productName as keyof typeof italianRyegrass]
  if(Object.keys(rye.earlyMid).includes(productName)) return rye.earlyMid[productName as keyof typeof rye.earlyMid]
  if(Object.keys(rye.midLate).includes(productName)) return rye.midLate[productName as keyof typeof rye.midLate]
  if(Object.keys(oat.earlyMid).includes(productName)) return oat.earlyMid[productName as keyof typeof oat.earlyMid]
  if(Object.keys(oat.midLate).includes(productName)) return oat.midLate[productName as keyof typeof oat.midLate]
  return productName
}