import { ConvertedExcelDataType, ExcelDataType } from "@/app/types"
import { keyMap } from "../const"

/**  */

/** 원본 엑셀파일중 null인 데이터를 키값은 유지 데이터는 빈값으로 변환 */

/** 엑셀 기준 [1 === 1900년 1월 1일]을 현재 날짜 변환 */
export const excelDateToJSDate = (excelDate: number) => {
  const excelStartDate = new Date(1900, 0, 1) // 1900년 1월 1일 기준
  return new Date(excelStartDate.getTime() + (excelDate - 1) * 86400000)
}

/** date 객체를 'MM월 DD일' 형식으로 변환 */
export const formatDateToMMDD = (date: Date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  return `${mm}월 ${dd}일`
}

/** ["요청일자", "납기일"]을 날짜 포맷으로 변환 */
export const transformDates = (data: Array<ConvertedExcelDataType>) => {
  console.log("실행")
  return data.map((row) => {
    if (typeof row.requestDate === "number") {
      console.log("납기일자 실행")
      row.requestDate = formatDateToMMDD(excelDateToJSDate(row.requestDate))
    }
    if (typeof row.deliveryDate === "number") {
      console.log("납기일자 실행")
      row.deliveryDate = formatDateToMMDD(excelDateToJSDate(row.deliveryDate))
    }
    return row
  })
}

/** 한글 key -> 영어 key 변환 + 날짜 변환 + 빈데이터는 키값은 유지 데이터는 빈값으로  */
export const convertOrderData = (data: Array<ExcelDataType>) => {
  const keyChangedData = convertChangeKeyToEng(data)
  console.log("test")
  return transformDates(keyChangedData)
}

/** order 정보의 key값을 한글 -> 영어 변환 */
export const convertChangeKeyToEng = (
  data: Array<ExcelDataType>
): Array<ConvertedExcelDataType> => {
  return data.map((item) => {
    const newObj = createInitEngData()
    for (const key in item) {
      const engKey = keyMap[key as keyof ExcelDataType]
      if (engKey) {
        newObj[engKey] = item[key as keyof ExcelDataType] ?? null // undefined 방지
      }
    }
    return newObj
  })
}

/** 변환된 데이터의 초기값 */
const createInitEngData = (): any => {
  return {
    address: null,
    associationName: null,
    deliveryDate: null,
    phoneNumber: null,
    productName: null,
    quantity: null,
    recipient: null,
    remarks: null,
    requestDate: null,
    weight: null,
  }
}
