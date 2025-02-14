import { ConvertedExcelDataType } from "@/app/types"

/**
 * 공급 조합명 / 공급내역 컴포넌트
 */

type SbuTitlePt = {
  data: Array<ConvertedExcelDataType>
}
export function SubTitle({ data }: SbuTitlePt) {
  const { address, recipient } = data[0]
  return (
    <>
      <div className="flex gap-x-2 items-center pt-1 mt-6">
        <Circle />
        <span className="text-lg ">공 급 조 합 명 </span>
        <span className="text-xl pb-1">:</span>
        <span className="text-xl font-semibold custom-text">
          {recipient} / {address}
        </span>
      </div>
      <div className="flex gap-x-2 items-center py-1">
        <Circle />
        <span className="text-lg min-w-[10rem]">공 급 내 역 </span>
        <p className="flex w-full justify-end font-bold text-lg pr-2">
          (주) NH무역 보관용[1]
        </p>
        {/** 글자 크기, 폰트. [1]은 무슨의미인지?  */}
      </div>
    </>
  )
}

function Circle() {
  return (
    <div className="min-w-[18px] size-[18px] rounded-full border border-black" />
  )
}
