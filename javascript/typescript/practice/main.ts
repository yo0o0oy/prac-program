// typescriptはrequireは基本使わずimport形式で書く
import * as fs from 'fs'

interface Data {
    name: string,
    count: number,
}
function total(data: Data[]): number {
    let t = 0;
    data.forEach((item: Data)=> {
        t += item.count
    })
    return t
}

const content = fs.readFileSync('data.json')
const data: Data[] = JSON.parse(content.toString())
console.log(total(data))
