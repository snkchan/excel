import {  italianRyegrass, oat, rye } from "@/app/test/(component)/const"
import { ConvertedExcelDataType } from "@/app/types"
import { useState, useEffect } from "react"


type TabelPT = {data:Array<ConvertedExcelDataType>}


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

export default function Table({data}:TabelPT){

  
  const totalWeight = data.reduce((acc, curr) => acc + (curr.weight ?? 0), 0)
  const totalQuantity = data.reduce((acc, curr) => acc + (curr.quantity ?? 0), 0)

  // remark를 품종별로 관리 (key: 행 구분자, value: remark)
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});

  // 초기값 세팅
  useEffect(() => {
    const newRemarks: { [key: string]: string } = {};

    // 플로리다80
    const florida80Arr = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === 0);
    newRemarks["Florida80"] = florida80Arr.map(item => item.remarks).filter(Boolean).join(", ");

    // 이탈리안라이그라스 품종
    [
      "그린팜", "윈터호그", "ED", "코위너리", "메가플러스", "크레덴스", "마살", "FrostProof", "테트라스타"
    ].forEach(variety => {
      const matchedArr = data.filter(item => {
        const breedNum = checkbreed(normalizeProductName(item.productName as string));
        return (
          breedNum === 1 &&
          italianRyegrass[normalizeProductName(item.productName as string) as keyof typeof italianRyegrass] === variety
        );
      });
      newRemarks[variety] = matchedArr.map(item => item.remarks).filter(Boolean).join(", ");
    });

    // 호밀
    newRemarks["Elbon"] = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === 2)
      .map(item => item.remarks).filter(Boolean).join(", ");
    newRemarks["Prima"] = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === 3)
      .map(item => item.remarks).filter(Boolean).join(", ");

    // 연맥
    newRemarks["Swan"] = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === 4)
      .map(item => item.remarks).filter(Boolean).join(", ");
    newRemarks["Cassue"] = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === 5)
      .map(item => item.remarks).filter(Boolean).join(", ");

    setRemarks(newRemarks);
  }, [data]);

  // setRemark 핸들러
  const handleRemarkChange = (key: string, value: string) => {
    setRemarks(prev => ({ ...prev, [key]: value }));
  };

  return <table className="w-full border-2 border-black border-collapse">
  <TableHeader/>
  <tbody>
   <ItalianRyegrass data={data} remarks={remarks} setRemark={handleRemarkChange}  />
   <Rye data={data} remarks={remarks} setRemark={handleRemarkChange} />
   <Oats data={data} remarks={remarks} setRemark={handleRemarkChange} />
   <TableFooter quantity={totalQuantity ? Number(totalQuantity)  : null} weight={totalWeight ? Number(totalWeight) : null} />
  </tbody>
</table>
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
  setRemark?: (value: string) => void
}

function FeedDetailRow({quantity, weight, remark, setRemark}: FeedDetailRowPT) {
  return (
    <>
      <td className="border-[1px] border-black text-center custom-text">{quantity}</td>
      <td className="border-[1px] border-black text-center custom-text">{weight}</td>
      <td className="border-[1px] border-black p-0 ">
        <input
          className="w-full h-full border-none outline-none text-semibold text-red-500 text-[14px] pl-1"
          value={remark ?? ""}
          onChange={e => setRemark && setRemark(e.target.value)}
        />
      </td>
    </>
  );
}


type ItalianRyegrassPT= {
  data:Array<ConvertedExcelDataType>,
  remarks: { [key: string]: string },
  setRemark: (key: string, value: string) => void
}

function ItalianRyegrass({data, remarks: remarksObj, setRemark}:ItalianRyegrassPT){
  // Florida80
  const florida80Arr = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === 0);
  const totalQuantity = florida80Arr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  const totalWeight = florida80Arr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);

  // 기타 품종
  const etcArr = data.filter(item => checkbreed(normalizeProductName(item.productName as string)) === -1);
  const etcQuantity = etcArr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  const etcWeight = etcArr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);
  const etcRemarks = etcArr
    .map(item => {
      const name = item.productName || "";
      const remark = item.remarks ? `(${item.remarks})` : "";
      return `${name}${remark}`;
    })
    .filter(Boolean)
    .join(", ");

  // 나머지 품종
  const varieties = [
    "그린팜", "윈터호그", "ED", "코위너리", "메가플러스", "크레덴스", "마살", "FrostProof", "테트라스타", "", ""
  ];

  return (
    <>
      <tr>
        <td rowSpan={16} className="border-[1px] border-black text-center align-middle">사<br/><br/><br/>료</td>
        <td rowSpan={12} colSpan={2} className="border-[1px] border-black text-center align-middle">
          이탈리안<br />라이그라스<br />20Kg
        </td>
        <td className="border-[1px] border-black text-start h-[28px] pl-1">플로리다80</td>
        <FeedDetailRow
          quantity={totalQuantity ? Number(totalQuantity) : null}
          weight={totalWeight ? Number(totalWeight) : null}
          remark={remarksObj["Florida80"] || ""}
          setRemark={value => setRemark("Florida80", value)}
        />
      </tr>
      {varieties.map((variety, idx) => {
        // 빈 칸 1(9번째)에 기타 품종 정보 삽입
        if (idx === 9) {
          return (
            <tr key={idx}>
              <td className="border-[1px] border-black text-start pl-1 h-[28px]"></td>
              <FeedDetailRow
                quantity={etcQuantity ? Number(etcQuantity) : null}
                weight={etcWeight ? Number(etcWeight) : null}
                remark={remarksObj["ETC"] ?? etcRemarks}
                setRemark={value => setRemark("ETC", value)}
              />
            </tr>
          );
        }

        // 나머지 품종 로직
        const matchedArr = data.filter(item => {
          const breedNum = checkbreed(normalizeProductName(item.productName as string));
          return (
            breedNum === 1 &&
            italianRyegrass[normalizeProductName(item.productName as string) as keyof typeof italianRyegrass] === variety
          );
        });
        const quantity = matchedArr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
        const weight = matchedArr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);
        const remark = remarksObj[variety] || "";

        return (
          <tr key={idx}>
            <td className="border-[1px] border-black text-start pl-1 h-[28px]">{variety}</td>
            <FeedDetailRow
              quantity={quantity ? Number(quantity) : null}
              weight={weight ? Number(weight) : null}
              remark={remark}
              setRemark={value => setRemark(variety, value)}
            />
          </tr>
        );
      })}
    </>
  );
}

type RyePT = {
  data: Array<ConvertedExcelDataType>,
  remarks: { [key: string]: string },
  setRemark: (key: string, value: string) => void
}

function Rye({ data, remarks: remarksObj, setRemark }: RyePT) {
  // 조/중생(earlyMid)
  const earlyMidArr = data.filter(item =>
    checkbreed(normalizeProductName(item.productName as string)) === 2
  );
  const earlyMidQuantity = earlyMidArr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  const earlyMidWeight = earlyMidArr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);
  const earlyMidRemarks = remarksObj["Elbon"] || "";

  // 만생(midLate)
  const midLateArr = data.filter(item =>
    checkbreed(normalizeProductName(item.productName as string)) === 3
  );
  const midLateQuantity = midLateArr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  const midLateWeight = midLateArr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);
  const midLateRemarks = remarksObj["Prima"] || "";

  return (
    <>
      <tr>
        <td rowSpan={2} className="border-[1px] border-black text-center align-middle">호밀 20Kg</td>
        <td className="border-[1px] border-black text-center h-[28px]">조/중생</td>
        <td className="border-[1px] border-black text-start pl-1">{rye.earlyMid.Elbon}</td>
        <FeedDetailRow
          quantity={earlyMidQuantity ? Number(earlyMidQuantity) : null}
          weight={earlyMidWeight ? Number(earlyMidWeight) : null}
          remark={earlyMidRemarks}
          setRemark={value => setRemark("Elbon", value)}
        />
      </tr>
      <tr>
        <td className="border-[1px] border-black text-center h-[28px]">만생</td>
        <td className="border-[1px] border-black text-start pl-1">{rye.midLate.Prima}</td>
        <FeedDetailRow
          quantity={midLateQuantity ? Number(midLateQuantity) : null}
          weight={midLateWeight ? Number(midLateWeight) : null}
          remark={midLateRemarks}
          setRemark={value => setRemark("Prima", value)}
        />
      </tr>
    </>
  );
}



type OatsPT = {
  data: Array<ConvertedExcelDataType>,
  remarks: { [key: string]: string },
  setRemark: (key: string, value: string) => void
}

function Oats({ data, remarks: remarksObj, setRemark }: OatsPT) {
  // 조생(earlyMid)
  const earlyMidArr = data.filter(item =>
    checkbreed(normalizeProductName(item.productName as string)) === 4
  );
  const earlyMidQuantity = earlyMidArr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  const earlyMidWeight = earlyMidArr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);
  const earlyMidRemarks = remarksObj["Swan"] || "";

  // 중/만생(midLate)
  const midLateArr = data.filter(item =>
    checkbreed(normalizeProductName(item.productName as string)) === 5
  );
  const midLateQuantity = midLateArr.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0);
  const midLateWeight = midLateArr.reduce((acc, cur) => acc + (cur.weight ?? 0), 0);
  const midLateRemarks = remarksObj["Cassue"] || "";

  return (
    <>
      <tr>
        <td rowSpan={2} className="border-[1px] border-black text-center align-middle">연맥 20Kg</td>
        <td className="border-[1px] border-black text-center h-[28px]">조생</td>
        <td className="border-[1px] border-black text-start pl-1">{oat.earlyMid.Swan}</td>
        <FeedDetailRow
          quantity={earlyMidQuantity ? Number(earlyMidQuantity) : null}
          weight={earlyMidWeight ? Number(earlyMidWeight) : null}
          remark={earlyMidRemarks}
          setRemark={value => setRemark("Swan", value)}
        />
      </tr>
      <tr>
        <td className="border-[1px] border-black text-center h-[28px]">중/만생</td>
        <td className="border-[1px] border-black text-start pl-1">{oat.midLate.Cassue}</td>
        <FeedDetailRow
          quantity={midLateQuantity ? Number(midLateQuantity) : null}
          weight={midLateWeight ? Number(midLateWeight) : null}
          remark={midLateRemarks}
          setRemark={value => setRemark("Cassue", value)}
        />
      </tr>
    </>
  );
}


type TableFooterPt = {
  quantity?: number | null,
  weight?: number | null
}

function TableFooter({quantity,weight}:TableFooterPt){
  return  <tr>
  <td colSpan={4} className="border-[1px] border-black text-center h-[28px]">합계</td>
  <td className="border-[1px] border-black text-center custom-text">{quantity}</td>
  <td className="border-[1px] border-black text-center custom-text">{weight}</td>
  <td className="border-[1px] border-black"></td>
</tr>
}


