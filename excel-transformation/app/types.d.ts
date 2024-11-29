// types.d.ts
export type excelDataType = {
  " 수량(포) ": string
  " 중량(kg) ": string
  납기일: string
  받는사람: string
  비고: string
  요청일자: string
  전화번호: number
  조합명: string
  주소: number
  품종명: string
  열1?: string | undefined
}

export type convertedExcelDataType = {
  address: number
  associationName: string
  deliveryDate: string
  phoneNumber: number
  productName: string
  quantity: string
  recipient: string
  remarks: string
  requestDate: string
  weight: string
  columnOne?: string | undefined
}

export type summaryType = {
  요청일자: "요약"
  " 수량(포) ": number
  " 중량(kg) ": number
}

export type convertedSummaryType = {
  requestDate: string
  quantity: string
  weight: string
}
