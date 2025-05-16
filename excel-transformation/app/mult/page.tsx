"use client"

import { useEffect, useState } from "react"
import { ConvertedExcelDataType } from "@/app/types"
import Table, { normalizeProductName } from "../test/(component)/Table"
import { SubTable } from "../test/(component)/SubTable"
import { Details } from "../test/(component)/Details"
import { CompanyName } from "../test/(component)/CompanyName"
import { Footer } from "../test/(component)/Footer"
import { italianRyegrass, oat, rye } from "../test/(component)/const"
import { SubTitle } from "../test/(component)/SubTitle"

export default function MultPage() {
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])

  useEffect(() => {
    const storedData = localStorage.getItem('selectedShipments')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        console.log('Multiple shipments data:', parsedData)
      } catch (error) {
        console.error("Invalid JSON:", error)
      }
    }
  }, [])

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('selectedShipments')
  //   }
  // }, [])

  if (!data[0]) return null

  return (
    <div className="w-full h-full flex justify-center pt-6 bg-gray-100 min-h-screen">
      <div className="w-[1100px] bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">  
        <h1 className="text-2xl font-bold mb-4">다중 인수증 확인</h1>
        <h3 className="text-lg font-bold mb-4">총 <span className="text-blue-500">{data.length}</span>건</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-yellow-100">
                <th className="border border-gray-300 px-2 py-1">순번</th>
                <th className="border border-gray-300 px-2 py-1">성명</th>
                <th className="border border-gray-300 px-2 py-1">연락처</th>
                <th className="border border-gray-300 px-2 py-1">주소</th>
                <th className="border border-gray-300 px-2 py-1 bg-green-100">품 종</th>
                <th className="border border-gray-300 px-2 py-1 bg-blue-100">포수</th>
                <th className="border border-gray-300 px-2 py-1 bg-blue-100">중량</th>
                <th className="border border-gray-300 px-2 py-1">비고</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1">{idx+1}</td>
                  <td className="border border-gray-300 px-2 py-1 font-bold text-gray-800">{item.recipient}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.phoneNumber}</td>
                  <td className="border border-gray-300 px-2 py-1 text-left">{item.address}</td>
                  <td className="border border-gray-300 px-2 py-1 bg-green-100 max-w-[100px]">{koreanProdcutName(item.productName as string)}{item.remarks ? `(${item.remarks})` : ""}</td>
                  <td className="border border-gray-300 px-2 py-1 bg-blue-100">{item.quantity}</td>
                  <td className="border border-gray-300 px-2 py-1 bg-blue-100">{item.weight}</td>
                  <td className="border border-gray-300 px-2 py-1"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 w-[794px] mx-auto">
          <SubTitle data={data}/>
          <Table data={data} />
          <SubTable data={data} />
          <Details data={data} />
          <CompanyName />
          <Footer />
        </div>
      </div>
    </div>
  )
}


const koreanProdcutName = (pn:string)=>{
  const productName = normalizeProductName(pn as string)
  if(productName === "Florida 80") return "플로리다80"
  if(Object.keys(italianRyegrass).includes(productName)) return italianRyegrass[productName as keyof typeof italianRyegrass]
  if(Object.keys(rye.earlyMid).includes(productName)) return rye.earlyMid[productName as keyof typeof rye.earlyMid]
  if(Object.keys(rye.midLate).includes(productName)) return rye.midLate[productName as keyof typeof rye.midLate]
  if(Object.keys(oat.earlyMid).includes(productName)) return oat.earlyMid[productName as keyof typeof oat.earlyMid]
  if(Object.keys(oat.midLate).includes(productName)) return oat.midLate[productName as keyof typeof oat.midLate]
  return productName
}