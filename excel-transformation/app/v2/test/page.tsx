"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ConvertedExcelDataType } from "@/app/types"
import { Title } from "./(component)/Title"
import { SubTitle } from "./(component)/SubTitle"

import { SubTable } from "./(component)/SubTable"
import { Details } from "./(component)/Details"
import { CompanyName } from "./(component)/CompanyName"
import { Footer } from "./(component)/Footer"
import Table from "./(component)/Table"
// import { Table } from "./(component)/table/Table"

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
  // console.log(data)
  if (!data[0]) return
  return (
    <div className="w-full h-full flex justify-center pt-6">
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

