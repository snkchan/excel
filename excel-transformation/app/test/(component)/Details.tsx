import { ConvertedExcelDataType } from "@/app/types"

type DetailsPT = {
  data: Array<ConvertedExcelDataType>
}

/**
 *
 * 수입대행 인수증의 부가정보 (연락처를 입력받음)
 */

export function Details({ data }: DetailsPT) {
  const { phoneNumber } = data[0]
  return (
    <div className="w-full h-[160px]  grid grid-cols-[1.3fr_1fr]">
      <div className="px-4 py-2 grid grid-rows-4 w-full">
        <p className="px-4 py-2 tracking-wider font-bold">
          상기 물량을 정히 인수하였음을 확인합니다.
        </p>
        <p className="w-full items-center justify-center flex space-x-14">
          <span className="tracking-widest">202</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
        <div className="flex items-center justify-between">
          <p>인 수 인 :</p>
          <p className="pr-6">(인)</p>
        </div>

        <p>
          연 락 처 : <span className="custom-text pl-4">{phoneNumber}</span>{" "}
        </p>
      </div>
      <div className="w-full flex items-end justify-end ">
        <table className="w-[18rem] h-[100px] table-fixed border border-black grid-rows-3 border-collapse">
          <tbody>
            <tr className="grid grid-cols-[1fr_1.3fr] w-full h-full border-collapse">
              <td className="w-full flex items-center justify-center table-border  tracking-[.5rem]">
                차량번호
              </td>
              <td className="table-border" />
              <td className="flex items-center justify-center table-border tracking-[.5rem]">
                운송기사
              </td>
              <td className="table-border" />
              <td className="w-full flex items-center justify-center table-border tracking-[1.25rem] pl-3">
                연락처
              </td>
              <td className="table-border" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
