"use client"
import { useState } from "react"
import * as XLSX from "xlsx"

import { DeliveryInstrctionHeaderTitle, RowTitle } from "./hold"
import { ROW_TITLE_VALUE_ARR } from "./not-comp/const"
import { convertOrderData } from "./not-comp/business-logic"
import { convertedExcelDataType, excelDataType, summaryType } from "./types"
export default function Exce() {
  const [orderData, setOrderData] = useState<Array<convertedExcelDataType>>([]) // 초기값을 null로 설정
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
      const enteredData: Array<excelDataType | summaryType> =
        XLSX.utils.sheet_to_json(sheet, { header: 3, range: 4 })

      const summaryData = enteredData.slice(-1) as Array<summaryType>
      const orderData = enteredData.slice(
        0,
        enteredData.length - 1
      ) as Array<excelDataType>
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
            className="grid h-fit w-full grid-cols-[repeat(4,0.3fr)_repeat(2,0.8fr)_1fr_repeat(3,0.25fr)_0.1fr]"
            key={idx}
          >
            {ROW_TITLE_VALUE_ARR.map((key, keyIdx) => (
              <div className="font-bold border border-gray-200" key={keyIdx}>
                <span className="flex items-center justify-center text-gray-600 py-2">
                  {info[key as keyof convertedExcelDataType]}
                </span>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
