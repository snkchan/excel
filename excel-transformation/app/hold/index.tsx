import { keyMap, ROW_TITLE_VALUE_ARR } from "../not-comp/const"

export const devertEngToKor = (data: Array<any>) => {
  const reversedKeyMap: Record<string, string> = Object.fromEntries(
    Object.entries(keyMap).map(([kor, eng]) => [eng, kor])
  )

  const convertedData = data
    .filter((item) => item["requestDate"] !== "요약") // "요약" 필터링
    .map((item) => {
      const newItem: any = {}
      for (const key in item) {
        if (reversedKeyMap[key]) {
          newItem[reversedKeyMap[key]] = item[key] // 키 변환
        }
      }
      return newItem
    })

  return [
    ...convertedData,
    ...data.filter((item) => item["requestDate"] === "요약"),
  ]
}

export const convertKorToEng = (data: Array<any>) => {
  const convertedData = data
    .filter((item) => item["요청일자"] !== "요약") // "요약" 필터링
    .map((item) => {
      const newItem: any = {}
      for (const key in item) {
        if (keyMap[key]) {
          newItem[keyMap[key]] = item[key] // 키 변환
        }
      }
      return newItem
    })

  return [
    ...convertedData,
    ...data.filter((item) => item["요청일자"] === "요약"),
  ]
}

// 영어 키를 한국어 키로 변환하는 함수
export const convertEngToKor = (title) => {
  const korTitle = Object.entries(keyMap).find(([, eng]) => eng === title)?.[0]
  return korTitle || title // 매핑이 없으면 원래 제목 반환
}

export function DeliveryInstrctionHeaderTitle() {
  return (
    <div className="text-5xl font-bold w-full flex items-center justify-center pb-2 ">
      <div className="text-red-500 w-fit h-fit  p-3 rounded-full border-4 border-gray-700 ">
        main 출고지시서
      </div>
    </div>
  )
}

export function RowTitle() {
  return (
    <div className="w-full h-fit">
      <div className="grid h-fit w-full grid-cols-[repeat(4,0.3fr)_repeat(2,0.8fr)_1fr_repeat(3,0.25fr)_0.1fr]">
        {ROW_TITLE_VALUE_ARR.map((title, idx) => (
          <div className="font-bold border border-gray-200" key={idx}>
            <span className="flex items-center justify-center">
              {convertEngToKor(title)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
