import { keyMap, ROW_TITLE_VALUE_ARR } from "../not-comp/const"
// 영어 키를 한국어 키로 변환하는 함수
export const convertEngToKor = (title: string) => {
  const korTitle = Object.entries(keyMap).find(([, eng]) => eng === title)?.[0]
  return korTitle || title
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
