"use client"
import * as XLSX from "xlsx"
import { ConvertedExcelDataType, ExcelDataType, summaryType } from "../types"
import { convertOrderData } from "./(business-logic)"
import { ChangeEvent, useState } from "react"
import { convertEngToKor, DeliveryInstrctionHeaderTitle } from "../hold"
import { ROW_TITLE_VALUE_ARR } from "../not-comp/const"

export default function V2() {
  const [excelData, setExcelData] = useState<Array<ConvertedExcelDataType>>([]) // 초기값을 null로 설정

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

      // const summaryData = enteredData.slice(-1) as Array<summaryType> // 엑셀원본의 마지막 요약 데이터 추후작업
      const orderData = enteredData.slice(
        0,
        enteredData.length - 1
      ) as Array<ExcelDataType>

      const convertedData = convertOrderData(orderData)
      setExcelData(convertedData)
    }

    reader.onerror = () => {
      console.error("파일을 읽는 중 오류가 발생했습니다.")
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="w-full h-dvh flex items-center justify-center pt-20">
      <div className="w-[90dvw] h-dvh ">
        {/* 수정된 부분 */}
        <UpLoadExcelBtn handleFileUpload={handleFileUpload} />
        {excelData.length > 0 && <ExcelDataSheet excelData={excelData} />}
      </div>
    </div>
  )
}

type UpLoadExcelBtnPT = {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

// 엑셀 파일업로드 버튼 컴포넌트
function UpLoadExcelBtn({ handleFileUpload }: UpLoadExcelBtnPT) {
  return (
    <div className="relative w-40 h-12 bg-red-200 rounded-lg">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <button className="w-full h-full bg-blue-500 text-white rounded-lg flex items-center justify-center cursor-pointer">
        파일 선택
      </button>
    </div>
  )
}

type ExcelDataSheetPT = {
  excelData: Array<ConvertedExcelDataType>
}

// 엑셀 표 컴포넌트
function ExcelDataSheet({ excelData }: ExcelDataSheetPT) {
  return (
    <>
      <DeliveryInstrctionHeaderTitle />
      <div>
        <RowTitle />
        {excelData.map((info, idx) => (
          <div
            className="hover:bg-gray-100 group cursor-pointer grid h-fit w-full grid-cols-[minmax(60px,1fr)_minmax(80px,1.3fr)_minmax(40px,0.7fr)_minmax(40px,0.7fr)_minmax(50px,0.85fr)_minmax(140px,2fr)_minmax(260px,3.5fr)_minmax(60px,1fr)_minmax(150px,2fr)_minmax(80px,1.3fr)]"
            key={idx}
          >
            {ROW_TITLE_VALUE_ARR.map((key, keyIdx) => (
              <div className="font-bold border border-gray-200 " key={keyIdx}>
                <span className="w-full h-fit flex items-center justify-center text-center text-gray-600  break-all p-2 text-sm group-hover:text-black group-hover:text-sm ">
                  {info[key as keyof ConvertedExcelDataType]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function RowTitle() {
  return (
    <div className="w-full h-fit">
      <div className="grid h-fit w-full grid-cols-[minmax(60px,1fr)_minmax(80px,1.3fr)_minmax(40px,0.7fr)_minmax(40px,0.7fr)_minmax(50px,0.85fr)_minmax(140px,2fr)_minmax(260px,3.5fr)_minmax(60px,1fr)_minmax(150px,2fr)_minmax(80px,1.3fr)] text-sm">
        {ROW_TITLE_VALUE_ARR.map((title, idx) => (
          <div className="font-bold border border-gray-200" key={idx}>
            <span className="flex items-center justify-center break-all bg-gray-100 p-1">
              {convertEngToKor(title)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
