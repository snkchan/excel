import { ConvertedExcelDataType } from "@/app/types"

/**
 * 공급 조합명 / 공급내역 컴포넌트
 */

type SbuTitlePt = {
  data: Array<ConvertedExcelDataType>
}
export function SubTitle({ data }: SbuTitlePt) {
  const { address } = data[0]
  return (
    <>
      <div className="flex gap-x-2 items-center pt-1 mt-6">
        <Circle />
        <span className="text-md ">공 급 조 합 명 </span>
        <span className="text-xl pb-1">:</span>
        <input
          className="text-xl  custom-text px-2 py-1 border border-white w-[75%] "
          defaultValue={address ?? ""}
        />
      </div>
      <div className="flex gap-x-2 items-center py-1">
        <Circle />
        <span className="text-md min-w-[10rem]">공 급 내 역</span>
      </div>
    </>
  )
}

function Circle() {
  return (
    <div className="min-w-[16px] size-[16px] rounded-full border border-black" />
  )
}
