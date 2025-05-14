"use client"

import { useEffect, useState } from "react"
import { ConvertedExcelDataType } from "@/app/types"
import Table from "../test/(component)/Table"
import { SubTable } from "../test/(component)/SubTable"
import { Details } from "../test/(component)/Details"
import { CompanyName } from "../test/(component)/CompanyName"
import { Footer } from "../test/(component)/Footer"

export default function MultPage() {
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    const storedData = localStorage.getItem('selectedShipments')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
        // 콘솔에 데이터 출력
        console.log('Multiple shipments data:', parsedData)
        console.log('Number of selected items:', parsedData.length)
      } catch (error) {
        console.error("Invalid JSON:", error)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedShipments')
    }
  }, [])

  if (!data[0]) return null

  return (
    <div className="w-full h-full flex justify-center pt-6 bg-gray-100 min-h-screen">
      <div className="w-[1100px] bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">다중 인수증 확인</h1>
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
                  <td className="border border-gray-300 px-2 py-1 bg-green-100 max-w-[100px]">{item.productName}{item.remarks ? `(${item.remarks})` : ""}</td>
                  <td className="border border-gray-300 px-2 py-1 bg-blue-100">{item.quantity}</td>
                  <td className="border border-gray-300 px-2 py-1 bg-blue-100">{item.weight}</td>
                  <td className="border border-gray-300 px-2 py-1"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 w-[794px] mx-auto">
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