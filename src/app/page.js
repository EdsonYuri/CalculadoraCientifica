'use client'
import { useState, useEffect, useCallback } from "react"

export default function Home() {
  const [expression, setExpression] = useState('')
  const [calcularRaizQuadrada, setCalcularRaizQuadrada] = useState(false)

  const valueArrow = (e) => {
    switch (/\d$/.test(e.target.value)) {
      case true:
        setExpression(expression + e.target.value)
        break;
      case false:
        if (/\d$/.test(expression)) setExpression(expression + e.target.value)
        break;
    }
  }

  const equal = () => {
    let resultado = eval(expression)
    setExpression(resultado.toString())
    //erro para resolver: ao executar essa linha o console vai informar o valor do expression antes do componentes atribuir o valor do resultado para ele
  }

  const reset = () => {
    setExpression('')
  }
  const deleteLast = () => {
    setExpression(expression.substring(0, expression.length - 1))
  }

  const squareRoot = () => {
    equal()
    setCalcularRaizQuadrada(true)
    console.log(expression)
    //setExpression(Math.sqrt(eval(expression).toString))*/
  }

  useEffect(() => {
    if (calcularRaizQuadrada) {
      setExpression(Math.sqrt(eval(expression)))
      setCalcularRaizQuadrada(false)
    }
  }, [calcularRaizQuadrada])

  return (
    <main className={"flex items-center justify-center h-screen bg-slate-900"}>
      <div className="bg-lime-600 w-96 h-auto p-2">
        <div className={"flex align items-center w-auto rounded bg-white m-3 h-20"}>
          {expression}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button value='%' onClick={valueArrow}>%</button>
          <button onClick={valueArrow}>CE</button>
          <button onClick={reset}>C</button>
          <button value='7' onClick={deleteLast}>&lt;</button>

          <button value='' onClick={valueArrow}>1/x</button>
          <button value='^2' onClick={valueArrow}>x²</button>
          <button value='' onClick={squareRoot}>²√x</button>
          <button value='/' onClick={valueArrow}>&#247;</button>

          <button value='7' onClick={valueArrow}>7</button>
          <button value='8' onClick={valueArrow}>8</button>
          <button value='9' onClick={valueArrow}>9</button>
          <button value='*' onClick={valueArrow}>X</button>

          <button value='4' onClick={valueArrow}>4</button>
          <button value='5' onClick={valueArrow}>5</button>
          <button value='6' onClick={valueArrow}>6</button>
          <button value='-' onClick={valueArrow}>-</button>

          <button value='1' onClick={valueArrow}>1</button>
          <button value='2' onClick={valueArrow}>2</button>
          <button value='3' onClick={valueArrow}>3</button>
          <button value='+' onClick={valueArrow}>+</button>

          <button value='' onClick={valueArrow}>+/-</button>
          <button value='0' onClick={valueArrow}>0</button>
          <button value='.' onClick={valueArrow}>,</button>
          <button onClick={equal}>=</button>
        </div>
      </div>
    </main>
  )
}
