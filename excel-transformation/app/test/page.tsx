"use client"

import { useEffect, useState } from "react"
import { ConvertedExcelDataType } from "@/app/types"
import { Title } from "./(component)/Title"
import { SubTitle } from "./(component)/SubTitle"
import { SubTable } from "./(component)/SubTable"
import { Details } from "./(component)/Details"
import { CompanyName } from "./(component)/CompanyName"
import { Footer } from "./(component)/Footer"
import Table from "./(component)/Table"

export default function Test() {
  const [data, setData] = useState<Array<ConvertedExcelDataType>>([])

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    
    const storedData = localStorage.getItem('selectedShipments')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setData(parsedData)
      } catch (error) {
        console.error("Invalid JSON:", error)
      }
    }
  }, [])

  // // 컴포넌트가 언마운트될 때 localStorage 정리
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('selectedShipments')
  //   }
  // }, [])

  if (!data[0]) return null

  return (
    <div className="w-full h-full flex justify-center pt-2">
      <div className="w-[794px]">
        <Title data={data} />
        <SubTitle data={data} />
        <Table data={data}/>
        <SubTable data={data} />
        <Details data={data} />
        <CompanyName />
        <Footer />
      </div>
    </div>
  )
}

