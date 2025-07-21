import { yearlyTotals } from '../types'


export const getLatestYear = (data:yearlyTotals) : string =>{
  const keys = Object.keys(data);
  const [sorted] = keys.sort((a,b)=>{
    const yearA = +a.slice(0,4);
    const yearB = +b.slice(0,4);
    return yearB - yearA
  })
  //console.log(sorted)
  return sorted
}