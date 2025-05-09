import { keyMap, ROW_TITLE_VALUE_ARR } from "../not-comp/const"
// 영어 키를 한국어 키로 변환하는 함수
export const convertEngToKor = (title: string) => {
  const korTitle = Object.entries(keyMap).find(([, eng]) => eng === title)?.[0]
  return korTitle || title
}

export function DeliveryInstrctionHeaderTitle() {
  return (
    <div className="text-4xl font-bold  flex items-center justify-center   py-4  ">
      <div className="text-red-500/80 w-fit h-fit  ">Main 출고지시서</div>
    </div>
  )
}

export function RowTitle() {
  return (
    <div className="w-full h-fit">
      <div className="grid h-fit w-full grid-cols-[repeat(4,minmax(80px,0.3fr))_repeat(2,minmax(150px,0.8fr))_minmax(200px,1fr)_repeat(3,minmax(60px,0.25fr))_minmax(30px,0.1fr)]">
        {ROW_TITLE_VALUE_ARR.map((title, idx) => (
          <div className="font-bold border border-gray-200" key={idx}>
            <span className="flex items-center justify-center bg-gray-100">
              {convertEngToKor(title)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
