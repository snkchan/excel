import { keyMap } from "../const"

/** 엑셀기준 [1 === 1900년 1월 1일] 을 현재 날짜 변환  */
export const excelDateToJSDate = (excelDate: number) => {
  const excelStartDate = new Date(1900, 0, 1) // 1900년 1월 1일
  const convertedDate = new Date(
    excelStartDate.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000
  )
  return convertedDate
}

/** date객체를 mm월 dd일 형식으로 변환 */
export const formatDateToMMDD = (date: Date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0") // 월 (0 기반이므로 +1)
  const dd = String(date.getDate()).padStart(2, "0") // 일
  return `${mm}월-${dd}일`
}

/** ["요청일자"] 항목아래 숫자로된 정보들을 mm-dd형식으로 parsing된 데이터에 저장 */
export const transformRequestDate = (data: Array<convertedExcelDataType>) => {
  return data.map((row) => {
    if (typeof row.requestDate === "number") {
      const date = excelDateToJSDate(row.requestDate)
      row.requestDate = formatDateToMMDD(date)
    }
    return row
  })
}
/** 한글key => 영어key & 요청일자 정보 number => string 형식으로 변환해서 data저장 */
export const convertOrderData = (data: Array<excelDataType>) => {
  const keyChangedData = convertChangeKeyToEng(data)
  const formattedData = transformRequestDate(keyChangedData)
  return formattedData
}

/** order 정보의 key값을 eng => kor 변환 */
export const convertChangeKeyToEng = (
  data: Array<excelDataType>
): Array<convertedExcelDataType> => {
  const convertedData = data.map((item) => {
    const newObj = createInitEngData()
    for (const key in item) {
      const engKey = keyMap[key as keyof excelDataType]
      if (engKey) {
        newObj[engKey] = item[key as keyof excelDataType] || ""
      }
    }

    return newObj
  })

  return convertedData
}

const createInitEngData = () => {
  const newObj: convertedExcelDataType = {
    address: 0,
    associationName: "",
    deliveryDate: "",
    phoneNumber: 0,
    productName: "",
    quantity: "",
    recipient: "",
    remarks: "",
    requestDate: "",
    weight: "",
    columnOne: "",
  }
  return newObj
}
