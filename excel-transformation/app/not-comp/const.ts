import { ConvertedExcelDataType, ExcelDataType } from "../types"

export const keyMap: Record<keyof ExcelDataType, keyof ConvertedExcelDataType> =
  {
    요청일자: "requestDate",
    품종명: "productName",
    "수량(포)": "quantity",
    "중량(kg)": "weight",
    받는사람: "recipient",
    전화번호: "phoneNumber",
    주소: "address",
    납기일: "deliveryDate",
    비고: "remarks",
    조합명: "associationName",
  }

export const ROW_TITLE_KEY_ARR = Object.keys(keyMap)
export const ROW_TITLE_VALUE_ARR = Object.values(keyMap)

/** 품종관리 상수 선언 */

export const MainBreedMap = {
  "이탈리안 라이그라스": "Italian_Ryegrass",
  호밀: "Rye",
  연맥: "Oats",
}

export const MainBreedKeyArr = Object.keys(MainBreedMap)
export const ManBreedValueArr = Object.values(MainBreedMap)

export const ItalianRyegrassSubMap = {
  플로리다80: "Florida80",
  그린팜: "GreenFarm",
  윈터호크: "WinterHawk",
  ED: "ED",
  코위너리: "Cowinner",
  메가플러스: "MegaPlus",
  크레던스: "Credence",
  마샬: "Marshall",
  FrostProof: "FrostProof",
  테트라스타: "TetraStar",
}
export const ItalianRyegrassKeyArr = Object.keys(ItalianRyegrassSubMap)
export const ItalianRyegrassValueArr = Object.values(ItalianRyegrassSubMap)

export const RyeSubMap = {
  윈터그레이져70: "WinterGrazer70",
  엘본: "Elbon",
  프리마: "Prima",
}

export const OatsSubMap = {
  스완: "Swan",
  카스유: "Cassue",
}

export const SubBreedMap = {
  Italian_Ryegrass: Object.values(ItalianRyegrassSubMap),
  Rye: Object.values(RyeSubMap),
  Oats: Object.values(OatsSubMap),
}

/** 품종 리스트 */
export const ForageVarieties = {
  italianRyegrass: {
    WinterHawk: "윈터호크",
    Florida80: "플로리다80",
    FrostProof: "FrostProof",
    Grazer: "그레이저",
    GreenFarm: "그린팜",
    Tam90: "탐90",
    TetraStar: "테트라스타",
    Ribeye: "Ribeye",
    Kowinearly: "코워너리",
    Marshall: "마샬",
    MegaPlus: "메가플러스",
    NewDawn: "NewDawn",
    Credence: "Credence",
    Dipper: "Dipper",
    ED: "ED",
  },
  rye: {
    earlyMid: {
      Elbon: "Elbon",
      Koolgrazer: "Koolgrazer",
      Wintergrazer70: "Wintergrazer70",
    },
    midLate: {
      Cayuse: "Cayuse",
      Prima: "Prima",
      Spooner: "Spooner",
    },
  },
  oat: {
    earlyMid: {
      Swan: "Swan",
    },
    midLate: {
      Cassue: "Cassue",
    },
  },

}
