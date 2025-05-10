"use client"
import * as XLSX from "xlsx"
import {
  ConvertedExcelDataType,
  ConvertedTitleDataType,
  ExcelDataType,
  summaryType,
  TitleDataType,
} from "../types"
import { convertOrderData, convertTitleData } from "./(business-logic)"
import { ChangeEvent, Dispatch, SetStateAction, useState, useRef, useEffect } from "react"
import { convertEngToKor, DeliveryInstrctionHeaderTitle } from "../hold"
import { ROW_TITLE_VALUE_ARR } from "../not-comp/const"
import { useRouter } from "next/navigation"

export default function V2() {
  const [excelData, setExcelData] = useState<Array<ConvertedExcelDataType>>([]) // 초기값을 null로 설정
  const [titleData, setTitleData] = useState<ConvertedTitleDataType>({
    sender: "",
    receiver: "",
  })
  const [clickedIdxArr, setClickedIdxArr] = useState([-1])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer
      const data = new Uint8Array(arrayBuffer)

      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0] // sheetName을 배열안에 순서대로 넣은 정보
      const sheet = workbook.Sheets[sheetName]
      const enteredData: Array<ExcelDataType | summaryType> =
        XLSX.utils.sheet_to_json(sheet, { header: 3, range: 4 })

      const enteredTitleData: ConvertedTitleDataType = convertTitleData(
        XLSX.utils
          .sheet_to_json(sheet, { header: 3, range: 0 })
          .slice(0, 2) as Array<TitleDataType>
      )

      // const summaryData = enteredData.slice(-1) as Array<summaryType>
      // console.log(summaryData)
      const orderData = enteredData.slice(
        0,
        enteredData.length - 1
      ) as Array<ExcelDataType>

      const convertedData = convertOrderData(orderData)
      setExcelData(convertedData)
      setTitleData(enteredTitleData)
    }

    reader.onerror = () => {
      console.error("파일을 읽는 중 오류가 발생했습니다.")
    }

    reader.readAsArrayBuffer(file)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 localStorage 정리
      localStorage.removeItem('selectedShipments')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">출고지시서</h1>
          <div className="flex gap-4 items-center">
            {/* 선택된 개수 표시 */}
            {clickedIdxArr.filter(idx => idx !== -1).length > 0 && (
              <span className="text-blue-600 font-semibold text-base mr-2 whitespace-nowrap">
                총 {clickedIdxArr.filter(idx => idx !== -1).length}개 선택
              </span>
            )}
            <UpLoadExcelBtn handleFileUpload={handleFileUpload} />
            {clickedIdxArr.length > 1 && (
              <button
                onClick={() => {
                  const selectedData = clickedIdxArr
                    .filter((idx) => idx !== -1)
                    .map((idx) => excelData[idx]);
                  
                  // localStorage에 데이터 저장
                  localStorage.setItem('selectedShipments', JSON.stringify(selectedData));
                  
                  // 페이지 이동
                  window.location.href = '/v2/test';
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
                </svg>
                인수증 확인
              </button>
            )}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        {excelData.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ExcelDataSheet
              titleData={titleData}
              excelData={excelData}
              clickedIdxArr={clickedIdxArr}
              setClickedIdxArr={setClickedIdxArr}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">파일이 없습니다</h3>
              <p className="mt-1 text-sm text-gray-500">
                엑셀 파일을 업로드하여 출고지시서를 확인하세요.
              </p>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110"
        aria-label="맨 위로 이동"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

type SenderReceiverInfoPT = {
  titleData: ConvertedTitleDataType
}

function SenderReceiverInfo({ titleData }: SenderReceiverInfoPT) {
  const { receiver, sender } = titleData
  return (
    <div className=" w-full h-fit py-3">
      <div className="font-semibold text-lg flex items-center">
        발신 : <span className="custom-text pl-3">{sender}</span>
      </div>
      <div className="font-semibold text-lg flex items-center">
        수신 : <span className="custom-text pl-3">{receiver}</span>
      </div>
    </div>
  )
}

type UpLoadExcelBtnPT = {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

/** 엑셀 파일업로드 버튼 컴포넌트*/
function UpLoadExcelBtn({ handleFileUpload }: UpLoadExcelBtnPT) {
  return (
    <div className="relative">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 10l-4-4m0 0l-4 4m4-4v12" />
        </svg>
        파일 선택
      </button>
    </div>
  )
}

type ExcelDataSheetPT = {
  titleData: ConvertedTitleDataType
  excelData: Array<ConvertedExcelDataType>
  clickedIdxArr: Array<number>
  setClickedIdxArr: Dispatch<SetStateAction<Array<number>>>
}

/**엑셀 표 컴포넌트 */
function ExcelDataSheet({
  titleData,
  excelData,
  clickedIdxArr,
  setClickedIdxArr,
}: ExcelDataSheetPT) {
  return (
    <div className="pb-10">
      <DeliveryInstrctionHeaderTitle />
      <SenderReceiverInfo titleData={titleData} />
      <div className="overflow-x-auto rounded-lg shadow">
        <RowTitle />
        <div>
          {excelData.map((shipment, idx) => (
            <ShipmentCell
              shipment={shipment}
              key={idx}
              idx={idx}
              clickedIdxArr={clickedIdxArr}
              setClickedIdxArr={setClickedIdxArr}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/**출고지시서 항목들을 나타내는 title 컴포넌트*/
function RowTitle() {
  return (
    <div className="w-full h-fit">
      <div className="grid h-fit w-full grid-cols-[minmax(60px,1fr)_minmax(80px,1.3fr)_minmax(40px,0.7fr)_minmax(40px,0.7fr)_minmax(50px,0.85fr)_minmax(140px,2fr)_minmax(260px,3.5fr)_minmax(60px,1fr)_minmax(150px,2fr)_minmax(80px,1.3fr)] text-sm rounded-t-lg overflow-hidden">
        {ROW_TITLE_VALUE_ARR.map((title, idx) => (
          <div
            className="font-bold border-b border-gray-200 bg-blue-50 text-gray-700 py-3 px-2 text-center"
            key={idx}
          >
            {convertEngToKor(title)}
          </div>
        ))}
      </div>
    </div>
  )
}

type ShipmentCellPT = {
  shipment: ConvertedExcelDataType
  clickedIdxArr: Array<number>
  setClickedIdxArr: Dispatch<SetStateAction<Array<number>>>
  idx: number
}

/**  출고지시서 표의 한줄을 나타내는 컴포넌트*/
function ShipmentCell({
  shipment,
  clickedIdxArr,
  setClickedIdxArr,
  idx,
}: ShipmentCellPT & { idx: number }) {
  const isSelected = clickedIdxArr.includes(idx);

  const onClickShipmentCell = () => {
    setClickedIdxArr((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <div
      onClick={onClickShipmentCell}
      className={`
        cursor-pointer grid w-full grid-cols-[minmax(60px,1fr)_minmax(80px,1.3fr)_minmax(40px,0.7fr)_minmax(40px,0.7fr)_minmax(50px,0.85fr)_minmax(140px,2fr)_minmax(260px,3.5fr)_minmax(60px,1fr)_minmax(150px,2fr)_minmax(80px,1.3fr)]
        border-b border-gray-200 transition-colors duration-150
        ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}
        relative
      `}
      style={idx === clickedIdxArr.length - 1 ? { borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' } : {}}
    >
      {/* 왼쪽 진한 파란색 보더 (선택된 경우만) */}
      {isSelected && (
        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-lg" />
      )}
      {ROW_TITLE_VALUE_ARR.map((column, colIdx) => (
        <div
          className="flex items-center justify-center p-3 text-gray-800 text-sm"
          key={colIdx}
        >
          {shipment[column as keyof ConvertedExcelDataType]}
        </div>
      ))}
    </div>
  );
}
