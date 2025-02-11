"use client"

import { useSearchParams } from "next/navigation"
import { ItalianRyegrassKeyArr, MainBreedKeyArr } from "../../not-comp/const"
import { useEffect, useState } from "react"
import { ConvertedExcelDataType } from "@/app/types"

export default function Test() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])

  useEffect(() => {
    const dataParam = searchParams.get("data")
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam))
        setData(parsedData)
      } catch (error) {
        console.error("Invalid JSON:", error)
      }
    }
  }, [searchParams])

  console.log(data)

  return (
    <div className="w-full h-full flex justify-center pt-6">
      <div className="w-[794px]">
        <Title />
        <SubTitle />
        <Table />
        <SubTable />
        <Details />
        <CompanyName />
        <Footer />
      </div>
    </div>
  )
}

function Title() {
  return (
    <div className="flex justify-center items-center  font-bold text-4xl  tracking-widest ">
      <p className="border-2 drop-shadow-xl bg-white border-black py-3 px-8">
        {/** 박스 dropShadow 변경해야함 */}
        수입대행 종자 인수증
      </p>
    </div>
  )
}

function SubTitle() {
  return (
    <>
      <div className="flex gap-x-2 items-center pt-1 mt-6">
        <Circle />
        <span className="text-lg">공 급 조 합 명 </span>
        <span className="text-xl pb-1">:</span>
        <span className="text-xl">
          충북 보은군 보은읍 신함1길 121-30(전달받을 데이터임)
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

function Table() {
  return (
    <table className="table-fixed border-collapse border-2 border-black w-full h-[627px] max-w-[794px]">
      <TableHeader />
      <TableBody />
      <TableFooter />
    </table>
  )
}

function TableHeader() {
  return (
    <thead>
      <tr className="grid grid-cols-[20px_450px_170px_150px] h-[66px]  ">
        <td className="table-border center h-[66px]">구분</td>
        <td className="grid-rows-2 w-full h-[66px] border-collapse ">
          <div className="center table-border w-full tracking-[.5rem] h-[33px] ">
            공 급 내 역
          </div>
          <div className="grid grid-cols-[175px_125px_auto] h-[33px]">
            <div className="center table-border w-full ">초종명</div>
            <div className="center table-border w-full ">숙기</div>
            <div className="center table-border w-full">품종명</div>
          </div>
        </td>
        <td className="table-border grid grid-rows-2">
          <div className="center table-border w-full">공 급 수 량</div>
          <div className="grid grid-cols-2">
            <div className="center table-border w-full">포</div>
            <div className="center table-border w-full">K G</div>
          </div>
        </td>
        <td className="table-border flex items-center justify-center">
          선 하 증 권
        </td>
      </tr>
    </thead>
  )
}

function TableBody() {
  return (
    <tbody>
      <tr className="grid grid-cols-[20px_auto]">
        <td className="table-border flex flex-col justify-center h-[528px]">
          사료
        </td>
        <td className="grid grid-rows-[396px_66px_66px]">
          <ItalianRyegrass />
          <Rye />
          <Oats />
        </td>
      </tr>
    </tbody>
  )
}

type TableItemPT = {
  breedType?: string | undefined
}

function TableItem({ breedType }: TableItemPT) {
  return (
    <div className="grid grid-cols-[150px_85px_85px_150px] h-[33px]">
      <p className="table-border">{breedType}</p>
      <p className="table-border"></p>
      <p className="table-border"></p>
      <p className="table-border"></p>
    </div>
  )
}

function ItalianRyegrass() {
  return (
    <div className="grid grid-cols-[300px_auto]">
      <div className="center table-border">{`${MainBreedKeyArr[0]}20Kg`}</div>
      <div>
        {Array.from({ length: 12 }, (_, idx) => (
          <TableItem breedType={ItalianRyegrassKeyArr[idx]} key={idx} />
        ))}
      </div>
    </div>
  )
}

function Rye() {
  return (
    <div className="grid grid-cols-[175px_125px_auto]">
      <div className="center table-border">{`${MainBreedKeyArr[1]} 20Kg`}</div>
      <div className="grid grid-rows-2">
        <p className="center table-border">조/중생</p>
        <p className="center  table-border">만생</p>
      </div>
      <div>
        <TableItem />
        <TableItem />
      </div>
    </div>
  )
}

function Oats() {
  return (
    <div className="grid grid-cols-[175px_125px_auto]">
      <div className="center table-border">{`${MainBreedKeyArr[2]} 20Kg`}</div>
      <div className="grid grid-rows-2">
        <p className="center table-border">조/중생</p>
        <p className="center  table-border">만생</p>
      </div>
      <div>
        <TableItem />
        <TableItem />
      </div>
    </div>
  )
}

function TableFooter() {
  return (
    <tfoot>
      <tr className="grid grid-cols-[470px_170px_150px] h-[33px]">
        <td className="center table-border">합계</td>
        <td className="grid grid-cols-2">
          <div className="table-border center"></div>
          <div className="table-border center"></div>
        </td>
        <td className="table-border"></td>
      </tr>
    </tfoot>
  )
}

function SubTable() {
  return (
    <div className="w-full h-[100px] border-2 border-black mt-3 grid grid-cols-2">
      <div className="border-r-[0.5px] w-full border-r-gray-500 px-2 py-1">{`<특이사항>`}</div>
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

function Details() {
  return (
    <div className="w-full h-[160px]  grid grid-cols-[1.3fr_1fr]">
      <div className="px-4 py-2 grid grid-rows-4 w-full">
        <p className="px-4 tracking-wider">
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

        <p>연 락 처 :</p>
      </div>
      <div className="w-full flex items-end justify-end ">
        <table className="w-[18rem] h-[100px] table-fixed border-2 border-black grid-rows-3 border-collapse">
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

function CompanyName() {
  return (
    <p className="text-xl font-semibold flex items-center  px-16 h-fit w-full">
      (주)NH무역 대표이사 귀중
    </p>
  )
}

function Footer() {
  return (
    <div className="w-full h-fit flex items-center justify-between text-lg font-medium pt-2 ">
      <p>운송사 : (주)농협물류</p>
      <p>Tel.(055)375-0523</p>
      <p>Fax.(055)375-0778</p>
      <p>H.P : 010-3846-8804</p>
    </div>
  )
}

function Circle() {
  return (
    <div className="min-w-[18px] size-[18px] rounded-full border border-black" />
  )
}
