"use client"
import * as XLSX from "xlsx"
import { ConvertedExcelDataType, ExcelDataType, summaryType } from "../types"
import { convertOrderData } from "./(business-logic)"
import { useState } from "react"

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
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  )
}
