"use client"
import { useState } from "react"
import * as XLSX from "xlsx"
import { transformRequestDate } from "./not-comp/business-logic"
import {
  convertKorToEng,
  DeliveryInstrctionHeaderTitle,
  RowTitle,
} from "./hold"
import { ROW_TITLE_KEY_ARR, ROW_TITLE_VALUE_ARR } from "./not-comp/const"
export default function Exce() {
  const [parsedData, setParsedData] = useState<any>(null) // 초기값을 null로 설정

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer
      const data = new Uint8Array(arrayBuffer)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 3, range: 4 })
      // 날짜형식 변환
      const processedData = transformRequestDate(rawData)
      // 키 변환 및 "요약" 필터링
      const convertedData = convertKorToEng(processedData)
      setParsedData(convertedData)
    }

    reader.onerror = () => {
      console.error("파일을 읽는 중 오류가 발생했습니다.")
    }

    reader.readAsArrayBuffer(file)
  }
  const lastIdx = parsedData && parsedData.length - 1
  const lastArr = parsedData && parsedData[lastIdx]
  const remainingArr = parsedData && parsedData.slice(0, -1)

  return (
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <DeliveryInstrctionHeaderTitle />
      <RowTitle />
      {/* Row 컴포넌트에 데이터 전달 */}
      {remainingArr &&
        remainingArr.map((info, idx) => (
          <div
            className="grid h-fit w-full grid-cols-[repeat(4,0.3fr)_repeat(2,0.8fr)_1fr_repeat(3,0.25fr)_0.1fr]"
            key={idx}
          >
            {ROW_TITLE_VALUE_ARR.map((key, keyIdx) => (
              <div className="font-bold border border-gray-200" key={keyIdx}>
                <span className="flex items-center justify-center text-gray-600 py-2">
                  {info[key]}
                </span>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
