import { ConvertedExcelDataType } from "@/app/types"

/**
 * 받는사람 / 주소 data전달받아서 공급조합명 출력
 */
type TitlePt = {
  data: Array<ConvertedExcelDataType>
}

export function Title({ data }: TitlePt) {
  const { recipient, phoneNumber } = data[0]
  return (
    <div className=" grid grid-cols-[0.4fr_1fr_0.4fr]  font-bold text-3xl  tracking-widest  ">
      <div className="w-1 bg-transparent" />
      <p className="border-2 drop-shadow-xl bg-white border-black py-3 px-8 text-center ">
        {/** 박스 dropShadow 변경해야함 */}
        수입대행 종자 인수증
      </p>
      <div className="text-base flex flex-col items-center justify-center h-full custom-text">
        <p>{recipient}</p>
        <p>{phoneNumber}</p>
      </div>
    </div>
  )
}
