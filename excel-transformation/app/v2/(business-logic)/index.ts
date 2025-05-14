import { keyMap } from "@/app/not-comp/const"
import {
  ConvertedExcelDataType,
  ConvertedTitleDataType,
  ExcelDataType,
  TitleDataType,
} from "@/app/types"

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
  return data.map((row) => {
    if (typeof row.requestDate === "number") {
      row.requestDate = formatDateToMMDD(excelDateToJSDate(row.requestDate))
    }
    if (typeof row.deliveryDate === "number") {
      row.deliveryDate = formatDateToMMDD(excelDateToJSDate(row.deliveryDate))
    }
    return row
  })
}

/** 한글 key -> 영어 key 변환 + 날짜 변환 + 빈데이터는 키값은 유지 데이터는 빈값으로  */
export const convertOrderData = (data: Array<ExcelDataType>) => {
  const keyChangedData = convertChangeKeyToEng(data)

  return transformDates(keyChangedData)
}

/** order 정보의 key값을 한글 -> 영어 변환 */
export const convertChangeKeyToEng = (
  data: Array<ExcelDataType>
): Array<ConvertedExcelDataType> => {
  return data.map((item) => {
    const newObj = {} as ConvertedExcelDataType  // 빈 객체로 시작하고 타입 단언
    for (const key in item) {
      const engKey = keyMap[key as keyof ExcelDataType] as keyof ConvertedExcelDataType
      if (engKey) {
        const value = item[key as keyof ExcelDataType]
        // 타입 단언을 사용하여 할당
        ;(newObj[engKey] as any) = value ?? null
      }
    }
    return newObj
  })
}

export const convertTitleData = (
  data: Array<TitleDataType>
): ConvertedTitleDataType => {
  return { sender: data[0].__EMPTY, receiver: data[1].__EMPTY }
}

// /** 변환된 데이터의 초기값 */
// const createInitEngData = (): Partial<ConvertedExcelDataType> => {
//   return {
//     address: undefined,
//     associationName: undefined,
//     deliveryDate: undefined,
//     phoneNumber: undefined,
//     productName: undefined,
//     quantity: undefined,
//     recipient: undefined,
//     remarks: undefined,
//     requestDate: undefined,
//     weight: undefined,
//   }
// }

export const formatDeliveryDate = (date: string | number): string => {
  if (typeof date === "number" || typeof date === undefined) return ""
  const match = date.match(/^(\d{2})월 (\d{2})일$/)
  if (!match) return "" // 예외사항이면 빈 문자열 반환

  const [, month, day] = match

  // 현재 연도 가져오기 (올해 기준)
  const year = new Date().getFullYear()

  // Date 객체 생성
  const dateObj = new Date(year, Number(month) - 1, Number(day))

  // 요일을 한국어로 가져오기
  const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(
    dateObj
  )

  return `${month}/${day}(${weekday})`
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}년 ${month}월 ${day}일`
}