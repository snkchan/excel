"use client"
import { useState } from "react"
import * as XLSX from "xlsx"

import { DeliveryInstrctionHeaderTitle, RowTitle } from "./hold"
import { ROW_TITLE_VALUE_ARR } from "./not-comp/const"
import { convertOrderData } from "./not-comp/business-logic"
import { ConvertedExcelDataType, ExcelDataType, summaryType } from "./types"
export default function Exce() {
  const [orderData, setOrderData] = useState<Array<ConvertedExcelDataType>>([]) // 초기값을 null로 설정
  const [, setSummaryData] = useState<Array<summaryType>>([])

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

      const summaryData = enteredData.slice(-1) as Array<summaryType>
      const orderData = enteredData.slice(
        0,
        enteredData.length - 1
      ) as Array<ExcelDataType>
      const convertedData = convertOrderData(orderData)
      setOrderData(convertedData)
      setSummaryData(summaryData)
    }

    reader.onerror = () => {
      console.error("파일을 읽는 중 오류가 발생했습니다.")
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <DeliveryInstrctionHeaderTitle />
      <RowTitle />
      {/* Row 컴포넌트에 데이터 전달 */}
      {orderData &&
        orderData.map((info, idx) => (
          <div
            className="grid h-fit w-full grid-cols-[repeat(4,minmax(80px,0.3fr))_repeat(2,minmax(150px,0.8fr))_minmax(200px,1fr)_repeat(3,minmax(60px,0.25fr))_minmax(30px,0.1fr)]"
            key={idx}
          >
            {ROW_TITLE_VALUE_ARR.map((key, keyIdx) => (
              <div className="font-bold border border-gray-200" key={keyIdx}>
                <span className="flex items-center justify-center text-gray-600 py-2">
                  {info[key as keyof ConvertedExcelDataType]}
                </span>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
