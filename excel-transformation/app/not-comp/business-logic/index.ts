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
export const transformRequestDate = (data: any) => {
  return data.map((row: any) => {
    if (typeof row["요청일자"] === "number") {
      const date = excelDateToJSDate(row["요청일자"])
      row["요청일자"] = formatDateToMMDD(date)
    }
    return row
  })
}
