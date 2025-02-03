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

export type ConvertedExcelDataType = Partial<{
  address: string
  associationName: string
  deliveryDate: number | string
  phoneNumber: string
  productName: string
  quantity: number
  recipient: string
  remarks: string
  requestDate: number | string
  weight: number
}>

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
