/**
 * 공급내역 표 컴포넌트
 */

import {
  ForageVarieties,
  ItalianRyegrassKeyArr,
  MainBreedKeyArr,
} from "@/app/not-comp/const"
import { ConvertedExcelDataType } from "@/app/types"

type TablePT = {
  data: Array<ConvertedExcelDataType>
}

export function Table({ data }: TablePT) {
  const { quantity, weight, productName } = data[0]
  if (
    typeof quantity === undefined ||
    typeof weight === undefined ||
    typeof productName === undefined
  )
    return
  return (
    <table className="table-fixed border-collapse border-2 border-black w-full h-[627px] max-w-[794px]">
      <TableHeader />
      <TableBody
        quantity={quantity}
        weight={weight}
        productName={productName}
      />
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

type TableBodyPT = {
  quantity: number | undefined
  weight: number | undefined
  productName: string | undefined
}

function TableBody({ quantity, weight, productName }: TableBodyPT) {
  /* 품종을 기준으로 확인하는 함수
   이탈리안 라이그라스 0
   호밀 1
   연맥 2 
   그 외 -1 
   반환
  **/
  const getForageTypeIndex = (productName: string | undefined): number => {
    if (typeof productName === "undefined") return -1

    if (Object.values(ForageVarieties.italianRyegrass).includes(productName)) {
      return 0
    }
    const ryeValues = Object.values(ForageVarieties.rye).flatMap(Object.values)
    if (ryeValues.includes(productName)) {
      return 1
    }

    const oatValues = Object.values(ForageVarieties.oat).flatMap(Object.values)
    if (oatValues.includes(productName)) {
      return 2
    }
    return -1 // 해당하지 않는 경우
  }

  const forageType = getForageTypeIndex(productName)

  return (
    <tbody>
      <tr className="grid grid-cols-[20px_auto]">
        <td className="table-border flex flex-col justify-center h-[528px]">
          사료
        </td>
        <td className="grid grid-rows-[396px_66px_66px]">
          {forageType === 0 && (
            <ItalianRyegrass
              quantity={quantity}
              weight={weight}
              productName={productName}
            />
          )}
          {forageType === 1 && (
            <Rye
              quantity={quantity}
              weight={weight}
              productName={productName}
            />
          )}
          {forageType === 2 && (
            <Oats
              quantity={quantity}
              weight={weight}
              productName={productName}
            />
          )}
        </td>
      </tr>
    </tbody>
  )
}

type TableItemPT = {
  breedType?: string | undefined
  quantity?: number
  weight?: number
}

function TableItem({ breedType, quantity, weight }: TableItemPT) {
  return (
    <div className="grid grid-cols-[150px_85px_85px_150px] h-[33px]">
      <p className="table-border">{breedType}</p>
      <p className="table-border">{quantity}</p>
      <p className="table-border">{weight}</p>
      <input className="table-border text-[12px] w-full text-center" />{" "}
      {/**선하증권 비고란 검색*/}
    </div>
  )
}

type ItalianRyegrassPT = {
  quantity: number | undefined
  weight: number | undefined
  productName: string | undefined
}

function ItalianRyegrass({ productName, quantity, weight }: ItalianRyegrassPT) {
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

type RyePT = {
  quantity: number | undefined
  weight: number | undefined
  productName: string | undefined
}

function Rye({ productName, quantity, weight }: RyePT) {
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

type OatsPT = {
  quantity: number | undefined
  weight: number | undefined
  productName: string | undefined
}

function Oats({ productName, quantity, weight }: OatsPT) {
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
          <div className="table-border center">100</div>
          <div className="table-border center">200</div>
        </td>
        <td className="table-border"></td>
      </tr>
    </tfoot>
  )
}
