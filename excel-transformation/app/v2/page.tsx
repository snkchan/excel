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
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
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

  return (
    <div className="w-full h-dvh flex items-center justify-center pt-20">
      <div className="w-[90dvw] h-dvh ">
        <div className="w-full h-fit flex justify-between items-center ">
          <UpLoadExcelBtn handleFileUpload={handleFileUpload} />
          {clickedIdxArr.length > 1 && (
            <ViewCertificateButton
              clickedIdxArr={clickedIdxArr}
              excelData={excelData}
            />
          )}
        </div>

        {excelData.length > 0 && (
          <ExcelDataSheet
            titleData={titleData}
            excelData={excelData}
            clickedIdxArr={clickedIdxArr}
            setClickedIdxArr={setClickedIdxArr}
          />
        )}
      </div>
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
    <div className="relative w-40 h-12  rounded-lg">
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
      <div>
        <RowTitle />
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
  )
}

/**출고지시서 항목들을 나타내는 title 컴포넌트*/
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
  idx, // 현재 아이템의 인덱스 추가
}: ShipmentCellPT & { idx: number }) {
  const onClickShipmentCell = () => {
    setClickedIdxArr((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    )
  }

  return (
    <div
      onClick={onClickShipmentCell}
      className={`cursor-pointer grid h-fit w-full grid-cols-[minmax(60px,1fr)_minmax(80px,1.3fr)_minmax(40px,0.7fr)_minmax(40px,0.7fr)_minmax(50px,0.85fr)_minmax(140px,2fr)_minmax(260px,3.5fr)_minmax(60px,1fr)_minmax(150px,2fr)_minmax(80px,1.3fr)]
        ${
          clickedIdxArr.includes(idx)
            ? "bg-blue-200"
            : "hover:bg-gray-100 group"
        }
      `}
    >
      {ROW_TITLE_VALUE_ARR.map((column, idx) => (
        <div className="font-bold border border-gray-200 " key={idx}>
          <span className="w-full h-fit flex items-center justify-center text-center text-gray-600 break-all p-2 text-sm group-hover:text-black group-hover:text-sm">
            {shipment[column as keyof ConvertedExcelDataType]}
          </span>
        </div>
      ))}
    </div>
  )
}

type ViewCertificateButtonPT = {
  clickedIdxArr: Array<number>
  excelData: Array<ConvertedExcelDataType>
}

/** 인수증 확인하러가기 컴포넌트 */
function ViewCertificateButton({
  clickedIdxArr,
  excelData,
}: ViewCertificateButtonPT) {
  const router = useRouter()
  const onClickBtn = () => {
    const selectedData = clickedIdxArr
      .filter((idx) => idx !== -1)
      .map((idx) => excelData[idx])
    const queryParam = encodeURIComponent(JSON.stringify(selectedData))
    router.push(`/v2/test?data=${queryParam}`)
  }
  return (
    <button
      onClick={onClickBtn}
      className="transition-all w-40 h-12  rounded-lg bg-blue-500 text-white  flex items-center justify-center cursor-pointer"
    >
      인수증 확인하러 가기
    </button>
  )
}
