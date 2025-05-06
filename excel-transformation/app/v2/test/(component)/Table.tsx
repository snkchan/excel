export default function Table(){
  return <table className="w-full border-2 border-black border-collapse">
  <TableHeader/>
  <tbody>
    {/* 이탈리안 라이그라스 섹션 */}
   <ItalianRyegrass/>
   <Oats/>
   <Rye/>
   <TableFooter/>
  </tbody>
</table>
}

function TableHeader(){
  return  <thead>
  <tr>
    <th rowSpan={2} className="border-2 border-black w-[60px] text-center">구분</th>
    <th colSpan={3} className="border-2 border-black text-center">공 급 내 역</th>
    <th colSpan={2} className="border-2 border-black text-center">공급수량</th>
    <th rowSpan={2} className="border-2 border-black w-[100px] text-center">선하증권</th>
  </tr>
  <tr>
    <th className="border-2 border-black text-center">초종명</th>
    <th className="border-2 border-black text-center">숙기</th>
    <th className="border-2 border-black text-center">품종명</th>
    <th className="border-2 border-black text-center">포</th>
    <th className="border-2 border-black text-center">KG</th>
  </tr>
</thead>
}

function ItalianRyegrass(){
  return <> <tr>
  <td rowSpan={16} className="border-2 border-black text-center align-middle">사료</td>
  <td rowSpan={12} colSpan={2} className="border-2 border-black text-center align-middle">
    이탈리안<br />라이그라스<br />20Kg
  </td>
  <td className="border-2 border-black text-center h-[33px]">플로리다80</td>
  <td className="border-2 border-black text-center">50</td>
  <td className="border-2 border-black text-center">1,000</td>
  <td className="border-2 border-black p-0">
    <input className="w-full h-full text-center border-none outline-none" />
  </td>
</tr>
{[
  "그린팜",
  "윈터호그",
  "ED",
  "코위너리",
  "메가플러스",
  "그레덴스",
  "마살",
  "FrostProof",
  "테트라스타",
  "", // 빈 칸 1
  "", // 빈 칸 2
].map((variety) => (
  <tr key={variety}>
    <td className="border-2 border-black text-center h-[33px]">{variety}</td>
    <td className="border-2 border-black text-center"></td>
    <td className="border-2 border-black text-center"></td>
    <td className="border-2 border-black p-0">
      <input className="w-full h-full text-center border-none outline-none" />
    </td>
  </tr>
))}</>
}

function Oats(){
  return <> <tr>
  <td rowSpan={2} className="border-2 border-black text-center align-middle">
    호밀<br />20Kg
  </td>
  <td className="border-2 border-black text-center">조/중생</td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center">50</td>
  <td className="border-2 border-black text-center">1,000</td>
  <td className="border-2 border-black p-0">
    <input className="w-full h-full text-center border-none outline-none" />
  </td>
</tr>
<tr>
  <td className="border-2 border-black text-center">만생</td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black p-0">
    <input className="w-full h-full text-center border-none outline-none" />
  </td>
</tr></>
}

function Rye(){
  return <> <tr>
  <td rowSpan={2} className="border-2 border-black text-center align-middle">
    연맥<br />20Kg
  </td>
  <td className="border-2 border-black text-center">조생</td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black p-0">
    <input className="w-full h-full text-center border-none outline-none" />
  </td>
</tr>
<tr>
  <td className="border-2 border-black text-center">중/만생</td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black text-center"></td>
  <td className="border-2 border-black p-0">
    <input className="w-full h-full text-center border-none outline-none" />
  </td>
</tr></>
}

function TableFooter(){
  return  <tr>
  <td colSpan={3} className="border-2 border-black text-center h-[33px]">합계</td>
  <td className="border-2 border-black text-center">100</td>
  <td className="border-2 border-black text-center">2,000</td>
  <td className="border-2 border-black"></td>
</tr>
}