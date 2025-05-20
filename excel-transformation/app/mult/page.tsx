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
import HomeBtn from "./(component)/HomeBtn"

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
        size: A4 landscape;
        margin: 20mm 5mm;
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
          border: 1px solid black !important; /* 테두리 색상 */
          padding: 4px 8px !important; /* 셀 패딩 조정 */
          word-wrap: break-word !important; /* 긴 단어 줄바꿈 */
          overflow-wrap: break-word !important; /* 긴 단어 줄바꿈 (CSS3) */
          text-align: center !important; /* 텍스트 가운데 정렬 */
        }
  
  
        /* 컬럼 너비 조정 (화면에 맞춰 대략적으로 설정) */
        th:nth-child(1), td:nth-child(1) { width: 6% !important; } /* 순번 */
        th:nth-child(2), td:nth-child(2) { width: 12% !important; } /* 성명 */
        th:nth-child(3), td:nth-child(3) { width: 14% !important; } /* 연락처 */
        th:nth-child(4), td:nth-child(4) { width: 40% !important; text-align: center !important; } /* 주소 (왼쪽 정렬 유지) */
        th:nth-child(5), td:nth-child(5) { width: 10% !important;  } /* 품종 */
        th:nth-child(6), td:nth-child(6) { width: 10% !important;  } /* 포수 */
        th:nth-child(7), td:nth-child(7) { width: 10% !important;  } /* 중량 */
        th:nth-child(8), td:nth-child(8) { width: 10% !important; } /* 확인 */
  
        /* 입력 필드 위치 및 크기 조정 (화면 스타일과 유사하게) */
        .print-input-header {
            margin-left: 18rem !important; /* ml-[27rem] */
            width: 30rem !important; /* w-[30rem] */
            font-size: 1.5rem !important; /* text-2xl */
            font-weight: bold !important; /* font-bold */
            padding-left: 0.5rem !important; /* pl-2 */
         
        }
  
        /* 합계 행 배경색 강제 적용 */
        table tbody tr.bg-\\[#cbe1c4\\] { /* 클래스 이름 그대로 사용 */
             background-color: #cbe1c4 !important; /* 합계 행 배경색 */
        }
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
        margin: 5mm 2mm;
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
            <HomeBtn/>
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
            <div className="w-full flex justify-start mb-3">
              <input className="text-2xl font-bold pl-2  w-[30rem] ml-[27rem] print-input-header" defaultValue={"2025년 수입대행종자 "} />
            </div>
            <table className="min-w-full border border-black text-center">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="border border-black px-2 py-1 w-[4rem]">순번</th>
                  <th className="border border-black px-2 py-1 w-[12rem]">성명</th>
                  <th className="border border-black px-2 py-1 w-[10rem]">연락처</th>
                  <th className="border border-black px-2 py-1 w-[40rem]">주소</th>
                  <th className="border border-black px-2 py-1 ">품 종</th>
                  <th className="border border-black px-2 py-1  w-[4rem]">포수</th>
                  <th className="border border-black px-2 py-1 w-[4rem]" >중량</th>
                  <th className="border border-black px-2 py-1 w-[5rem]">확인</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-black px-2 py-1 ">{idx+1}</td>
                    <td className="border border-black px-2 py-1 ">{item.recipient}</td>
                    <td className="border border-black px-2 py-1 ">{item.phoneNumber}</td>
                    <td className="border border-black px-2 py-1 ">{item.address}</td>
                    <td className="border border-black px-2 py-1  max-w-[100px] text-sm ">{koreanProdcutName(item.productName as string)}{item.remarks ? `(${item.remarks})` : ""}</td>
                    <td className="border border-black px-2 py-1 bg-blue-100 ">{item.quantity}</td>
                    <td className="border border-black px-2 py-1  ">{item.weight}</td>
                    <td className="border border-black px-2 py-1"></td>
                  </tr>
                ))}
                <tr className="bg-[#cbe1c4]">
                <th className="border border-black px-2 py-1 w-[4rem]"/>
                  <th className="border border-black px-2 py-1 w-[12rem]"/>
                  <th className="border border-black px-2 py-1 w-[10rem] font-bold">합계({data.length}곳)</th>
                  <th className="border border-black px-2 py-1 w-[40rem]"></th>
                  <th className="border border-black px-2 py-1 "/>
                  <th className="border border-black px-2 py-1 w-[4rem] font-bold">
                    {data.reduce((acc, item) => acc + (item.quantity ?? 0), 0)}
                  </th>
                  <th className="border border-black px-2 py-1 w-[4rem] font-bold">
                    {data.reduce((acc, item) => acc + (item.weight ?? 0), 0)}
                  </th>
                  <th className="border border-black px-2 py-1 w-[5rem]"/>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center">
          <div ref={tablePrintRef} className="w-[900px]">
            <Title data={data} hasRecipient={false} />
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