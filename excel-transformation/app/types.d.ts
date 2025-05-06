// types.d.ts
export type ExcelDataType = Partial<{
  "수량(포)": number
  "중량(kg)": number
  납기일: number
  받는사람: string
  비고: string
  요청일자: string
  전화번호: number
  조합명: string
  주소: number
  품종명: string
}>

export type ConvertedExcelDataType = {
  address?: string | null
  associationName?: string | null
  deliveryDate?: number | string | null
  phoneNumber?: string | null
  productName?: string | null
  quantity?: number | null
  recipient?: string | null
  remarks?: string | null
  requestDate?: number | string | null
  weight?: number | null
}

export type ConvertedTitleDataType = {
  sender: string
  receiver: string
}

export type TitleDataType = {
  "종자 출고요청서": string
  __EMPTY: string
  __rowNum__: number
}

export type summaryType = {
  요청일자: "요약"
  "수량(포)": number
  "중량(kg)": number
}

export type convertedSummaryType = {
  requestDate: string
  quantity: string
  weight: string
}

// ---------------수정 타입

export const convertChangeKeyToEng = (
  data: Array<ExcelDataType>
): Array<ConvertedExcelDataType> => {
  return data.map((item) => {
    const newObj: ConvertedExcelDataType = {}
    for (const key in item) {
      const engKey = keyMap[key as keyof ExcelDataType]
      if (engKey) {
        const value = item[key as keyof ExcelDataType]
        newObj[engKey] = value === undefined ? null : value
      }
    }
    return newObj
  })
}
