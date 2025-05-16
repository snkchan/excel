"use client"
import { ConvertedExcelDataType } from "@/app/types"
import { formatDeliveryDate } from "../../v2/(business-logic)"
import { useState } from "react"

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

  const [text, setText] = useState("특이사항 입력")

  const onClickTextArea = () => {
    if (text === "특이사항 입력") {
      setText("") // 기존 텍스트가 기본값이면 지움
    }
  }

  return (
    <div className="w-full h-[100px] border-2 border-black mt-3 grid grid-cols-2">
      <div className="border-r-[0.5px] w-full border-r-gray-500 px-2 py-1 grid grid-rows-[1fr_2fr]">
        <div className="w-full h-fit">{`<특이사항>`}</div>
        <div className="w-full flex items-center gap-x-5">
          <textarea
            className="resize-none border-2 border-gray-300 w-full text-gray-500 text-sm h-14 p-1"
            value={`${formattedDeliveryDate} ${text}`}
            onClick={onClickTextArea}
            onChange={(e) =>
              setText(e.target.value.replace(`${formattedDeliveryDate} `, ""))
            }
          />
        </div>
      </div>
      <div className="grid grid-rows-3 px-2 py-1">  
        <div>{`<보세창고 출고확인>`}</div>
        <div className="flex items-center gap-x-1">
          <div className="size-[15px] rounded-full border border-black" />
          창고명 :
        </div>
        <div className="flex items-center gap-x-1">
          <div className="size-[15px] rounded-full border border-black" />
          <div className="flex w-full items-center justify-between pr-2">
            <p>출고확인자 :</p>
            <p>(인)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
