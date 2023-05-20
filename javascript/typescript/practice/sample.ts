// ## 型 types ##

// boolean
let a: boolean = true
// number
let b: number = 1
// string
let c: string = 'c'
// ※ 省略可能

// any（基本的に使用禁止）
let d: any = 'd'
// void（= 何も返さない）
function func(e: number, f: number): void {
    e += f
}

// Array
let g: string[] = ['g', 'gg']
let h: Array<number> = [1, 2, 3]

// Object
interface I {
    i: number,
    ii: number,
    // ....
}
let i: I = { i: 10, ii: 20 }

// undefined
interface J {
    j: number,
    jj?: number,
    // ....
}
let j: J = { j: 10 }
// nullable
interface K {
    k: number,
    kk: number | null,
    // ....
}
let k: K = { k: 10, kk: null }

