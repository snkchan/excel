import { ConvertedExcelDataType } from "@/app/types"
import { formatDeliveryDate } from "../../(business-logic)"

type SubTablePT = {
  data: Array<ConvertedExcelDataType>
}

/**
 * 부가적인 정보를 담는 컴포넌트
 * [특이사항], [보세창고 출자 확인]
 */

export function SubTable({ data }: SubTablePT) {
  const { deliveryDate } = data[0]

  const formattedDeliveryDate = formatDeliveryDate(deliveryDate as string)

  return (
    <div className="w-full h-[100px] border-2 border-black mt-3 grid grid-cols-2">
      <div className="border-r-[0.5px] w-full border-r-gray-500 px-2 py-1 grid grid-rows-[1fr_2fr]">
        <div className=" w-full h-fit">{`<특이사항>`}</div>
        <div className="w-full flex items-center  gap-x-5">
          <div className="w-fit h-fit custom-text">{formattedDeliveryDate}</div>
          <textarea
            className="resize-none border-2 border-gray-300 w-full text-gray-500 text-sm h-14 p-1"
            defaultValue={
              "특이사항 입력 (그냥 모달창으로 입력하게 한후 확인 누르면 text등록이 더좋을듯)"
            }
          />
        </div>
      </div>
      <div className="grid grid-rows-3 px-2 py-1">
        <div>{`<보세창고 출고확인>`}</div>
        <div className="flex items-center gap-x-1">
          <div className=" size-[15px] rounded-full border border-black" />
          창고명 :
        </div>
        <div className="flex items-center gap-x-1">
          <div className=" size-[15px] rounded-full border border-black" />
          <div className="flex w-full items-center justify-between pr-2">
            <p> 출고 확인자 :</p>
            <p>(인)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
