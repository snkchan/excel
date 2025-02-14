/**
 * 공급내역 표 컴포넌트
 */

import { ItalianRyegrassKeyArr, MainBreedKeyArr } from "@/app/not-comp/const"

export function Table() {
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
