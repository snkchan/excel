import { ConvertedExcelDataType } from "@/app/types"
import { useState } from "react"
import { baseVariety, italianRyegrass, oat, rye } from "./const"

type TabelPT = {data:Array<ConvertedExcelDataType>}




export default function Table({data}:TabelPT){
   const {weight,quantity,productName,remarks} = data[0]
   const [,setRemark] = useState(remarks)
  const checkbreed = (productName: string) => {
   const normalizedProductName = normalizeProductName(productName as string)
    if(productName === "Florida 80") return 0
    if(Object.keys(italianRyegrass).includes(normalizedProductName)) return 1
    if([ ...Object.keys(rye.earlyMid)].includes(normalizedProductName)) return 2
    if([ ...Object.keys(rye.midLate)].includes(normalizedProductName)) return 3
    if([ ...Object.keys(oat.earlyMid)].includes(normalizedProductName)) return 4
    if([ ...Object.keys(oat.midLate)].includes(normalizedProductName)) return 5
    return -1
  }


  const breedNum = checkbreed(productName as string)
  
  return <table className="w-full border-2 border-black border-collapse">
  <TableHeader/>
  <tbody>
   <ItalianRyegrass data={data} breedNum={breedNum} setRemark={setRemark} />
   <Rye data={data} breedNum={breedNum} setRemark={setRemark}/>
   <Oats data={data} breedNum={breedNum} setRemark={setRemark}/>
   <TableFooter quantity={quantity as number} weight={weight as number}/>
  </tbody>
</table>
}

export const normalizeProductName = (productName: string): string => {
  const pn = productName.trim().toLowerCase();
  for (const key of Object.keys(italianRyegrass)) {
    const k = key.trim().toLowerCase();
    // key로 시작하고, 그 뒤에 숫자만 붙어있는지 확인
    const match = pn.match(new RegExp(`^${k}(\\d+)$`));
    if (match) {
      return key; // 원래의 key(대소문자, 한글 등 보존)
    }
  }
  return productName;
}

function TableHeader(){
  return  <><colgroup>
  <col style={{ width: "3%" }} />
  <col style={{ width: "20.3%" }} />
  <col style={{ width: "10.3%" }} />
  <col style={{ width: "16.4%" }} />
  <col style={{ width: "10.6%" }} />
  <col style={{ width: "10.6%" }} />
  <col style={{ width: "28.8%" }} />
</colgroup>
<thead>
  <tr>
    <th rowSpan={2} className="border-[1px] border-black w-[30px] text-center">구<br/>분</th>
    <th colSpan={3} className="border-[1px] border-black text-center">공 급 내 역</th>
    <th colSpan={2} className="border-[1px] border-black text-center">공급수량</th>
    <th rowSpan={2} className="border-[1px] border-black w-[170px] text-center">선하증권</th>
  </tr>
  <tr>
    <th className="border-[1px] border-black text-center min-w-[100px]">초종명</th>
    <th className="border-[1px] border-black text-center">숙기</th>
    <th className="border-[1px] border-black text-center">품종명</th>
    <th className="border-[1px] border-black text-center min-w-[30px]">포</th>
    <th className="border-[1px] border-black text-center min-w-[30px]">KG</th>
  </tr>
</thead></>
}


type FeedDetailRowPT = {
  quantity?: number | null,
  weight?: number | null,
  remark?: string | null,
  setRemark: (remark: string) => void
}

function FeedDetailRow({quantity, weight, remark, setRemark}: FeedDetailRowPT) {
  return <>
    <td className="border-[1px] border-black text-center custom-text">{quantity}</td>
    <td className="border-[1px] border-black text-center custom-text">{weight}</td>
    <td className="border-[1px] border-black p-0 ">
      <input 
        className="w-full h-full  border-none outline-none  text-semibold text-red-500 text-[14px] pl-1  " 
        defaultValue={remark ?? ""} 
        onChange={(e) => setRemark(e.target.value)}
      />
    </td>
  </>
}


type ItalianRyegrassPT= {
  data:Array<ConvertedExcelDataType> 
  breedNum:number | null
  setRemark: (remark: string) => void
}

function ItalianRyegrass({data,breedNum,setRemark}:ItalianRyegrassPT){
  const {quantity,weight,productName:pn,remarks} = data[0]
  const productName = normalizeProductName(pn as string)
  return <> <tr>
  <td rowSpan={16} className="border-[1px] border-black text-center align-middle">사<br/><br/><br/>료</td>
  <td rowSpan={12} colSpan={2} className="border-[1px] border-black text-center align-middle">
    이탈리안<br />라이그라스<br />20Kg
  </td>
  <td className="border-[1px] border-black text-start h-[28px] pl-1">플로리다80</td>
  <FeedDetailRow 
    quantity={breedNum === 0 ? quantity : undefined} 
    weight={breedNum === 0 ? weight : undefined}
    remark={breedNum === 0 ? remarks : undefined}
    setRemark={setRemark}
  />
</tr>
{[
  "그린팜",
  "윈터호그",
  "ED",
  "코위너리",
  "메가플러스",
  "크레덴스",
  "마살",
  "FrostProof",
  "테트라스타",
  "", // 빈 칸 1
  "", // 빈 칸 2
].map((variety,idx) => { 

  const isMatchingVariety = (productName: string) => {
    if (Object.keys(italianRyegrass)[idx] === productName) return true
    return false
  }
  const hasWeightNQuantity = (breedNum:number|null,productName:string )=>{
    return (breedNum === 1 && isMatchingVariety(productName)) || (breedNum === -1 && isEmptyCell(idx))
  }

  const hasVariety = (productName:string)=>{
    if(Object.keys(baseVariety).includes(productName)) return true
    return false
  }
  const isEmptyCell = (idx:number)=>{
    return idx === 9
  }
  return  <tr key={idx}>
  <td className="border-[1px] border-black text-start pl-1 h-[28px]">
    { breedNum === -1 && !hasVariety(productName as string) && isEmptyCell(idx) ? productName : variety}
  </td>
   <FeedDetailRow 
     quantity={hasWeightNQuantity(breedNum,productName as string) ? quantity : undefined} 
     weight={hasWeightNQuantity(breedNum,productName as string) ? weight : undefined}
     remark={hasWeightNQuantity(breedNum,productName as string) ? remarks : undefined}
     setRemark={setRemark}
   />
</tr>
})}
</>
}

type RyePT = {
  data:Array<ConvertedExcelDataType>
  breedNum:number | null
  setRemark: (remark: string) => void
}

function Rye({breedNum,data,setRemark}:RyePT){
  const {quantity,weight,productName,remarks} = data[0]
  
  const isEarlyMid = (breedNum:number|null)=>{
    return breedNum === 2
  }

  const isMidLate = (breedNum:number|null)=>{
    return breedNum === 3
  }

  const isMatchingVariety = (productName: string) => {
    if(isEarlyMid(breedNum)) {
      return Object.keys(rye.earlyMid).includes(productName)
    }
    if(isMidLate(breedNum)) {
      return Object.keys(rye.midLate).includes(productName)
    }
    return false
  }

  return <> <tr>
  <td rowSpan={2} className="border-[1px] border-black text-center align-middle">
    호밀 20Kg
  </td>
  <td className="border-[1px] border-black text-center h-[28px]">조/중생</td>
  <td className="border-[1px] border-black text-start pl-1 ">
    {isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? rye.earlyMid[productName as keyof typeof rye.earlyMid] : ""}
  </td>
  <FeedDetailRow 
    quantity={isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? quantity : undefined} 
    weight={isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? weight : undefined}
    remark={isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? remarks : undefined}
    setRemark={setRemark}
  />
</tr>
<tr>
  <td className="border-[1px] border-black text-center h-[28px]">만생</td>
  <td className="border-[1px] border-black text-start pl-1">
    {isMidLate(breedNum) && isMatchingVariety(productName as string) ? rye.midLate[productName as keyof typeof rye.midLate] : ""}
  </td>
  <FeedDetailRow 
    quantity={isMidLate(breedNum) && isMatchingVariety(productName as string) ? quantity : undefined} 
    weight={isMidLate(breedNum) && isMatchingVariety(productName as string) ? weight : undefined}
    remark={isMidLate(breedNum) && isMatchingVariety(productName as string) ? remarks : undefined}
    setRemark={setRemark}
  />
</tr></>
}



type OatsPT = {
  data:Array<ConvertedExcelDataType>
  breedNum:number | null
  setRemark: (remark: string) => void
}

function Oats({data,breedNum,setRemark}:OatsPT){
  const {quantity,weight,productName,remarks} = data[0]
  
  const isEarlyMid = (breedNum:number|null)=>{
    return breedNum === 4
  }

  const isMidLate = (breedNum:number|null)=>{
    return breedNum === 5
  }

  const isMatchingVariety = (productName: string) => {
    if(isEarlyMid(breedNum)) {
      return Object.keys(oat.earlyMid).includes(productName)
    }
    if(isMidLate(breedNum)) {
      return Object.keys(oat.midLate).includes(productName)
    }
    return false
  }

  return <> <tr>
  <td rowSpan={2} className="border-[1px] border-black text-center align-middle">
    연맥 20Kg
  </td>
  <td className="border-[1px] border-black text-center h-[28px]">조생</td>
  <td className="border-[1px] border-black text-start pl-1">
    {isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? oat.earlyMid[productName as keyof typeof oat.earlyMid] : ""}
  </td>
  <FeedDetailRow 
    quantity={isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? quantity : undefined} 
    weight={isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? weight : undefined}
    remark={isEarlyMid(breedNum) && isMatchingVariety(productName as string) ? remarks : undefined}
    setRemark={setRemark}
  />
</tr>
<tr>
  <td className="border-[1px] border-black text-center h-[28px]">중/만생</td>
  <td className="border-[1px] border-black text-start pl-1">
    {isMidLate(breedNum) && isMatchingVariety(productName as string) ? oat.midLate[productName as keyof typeof oat.midLate] : ""}
  </td>
  <FeedDetailRow 
    quantity={isMidLate(breedNum) && isMatchingVariety(productName as string) ? quantity : undefined} 
    weight={isMidLate(breedNum) && isMatchingVariety(productName as string) ? weight : undefined}
    remark={isMidLate(breedNum) && isMatchingVariety(productName as string) ? remarks : undefined}
    setRemark={setRemark}
  />
</tr></>
}


type TableFooterPt= {
  quantity:number,
  weight:number
}

function TableFooter({quantity,weight}:TableFooterPt){
  return  <tr>
  <td colSpan={4} className="border-[1px] border-black text-center h-[28px]">합계</td>
  <td className="border-[1px] border-black text-center custom-text">{quantity}</td>
  <td className="border-[1px] border-black text-center custom-text">{weight}</td>
  <td className="border-[1px] border-black"></td>
</tr>
}


