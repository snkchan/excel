"use client"
import { ConvertedExcelDataType } from "@/app/types"
import { formatDeliveryDate } from "../../v2/(business-logic)"
import { useState, useRef, useEffect } from "react"

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

  const contentEditableRef = useRef<HTMLDivElement>(null)

  const [additionalText, setAdditionalText] = useState("")

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = `
        <span style="font-size: 16px; color: red; font-weight: bold; white-space: pre;">${formattedDeliveryDate} </span><span style="font-size: 14px; color: black; white-space: pre;">${additionalText}</span>
      `;

      const range = document.createRange();
      const selection = window.getSelection();
      const targetNode = contentEditableRef.current.lastChild;
      if(targetNode && selection && targetNode.nodeType === Node.TEXT_NODE) {
        range.setStart(targetNode, targetNode.textContent?.length || 0);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (targetNode && selection) {
          range.selectNodeContents(targetNode);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
      }
    }
  }, [formattedDeliveryDate]);

  const handleInput = () => {
    if (contentEditableRef.current) {
      const divContent = contentEditableRef.current.textContent || "";
      const dateStringWithSpace = `${formattedDeliveryDate} `;
      const dateStringLength = dateStringWithSpace.length;

      if (divContent.startsWith(dateStringWithSpace)) {
         const userText = divContent.substring(dateStringLength);
         setAdditionalText(userText);
      } else {
        console.warn("Formatted date part was modified or deleted. Resetting.");
        setAdditionalText("");
      }
    }
  };

  const onClickDiv = () => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  };

  return (
    <div className="w-full h-[100px] border-2 border-black mt-3 grid grid-cols-2">
      <div className="border-r-[0.5px] w-full border-r-gray-500 px-2 py-1 grid grid-rows-[1fr_2fr]">
        <div className="w-full h-fit">{`<특이사항>`}</div>
        <div className="w-full flex items-center gap-x-5">
          <div
            ref={contentEditableRef}
            contentEditable="true"
            className="resize-none border border-white w-full text-gray-500 text-sm h-14 p-1 outline-none"
            style={{ overflowY: 'auto' }}
            onInput={handleInput}
            onClick={onClickDiv}
          >
          </div>
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
