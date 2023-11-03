'use client'
import { useState, useEffect } from "react"

export default function Home() {
  const [expression, setExpression] = useState('')
  const [calcularRaizQuadrada, setCalcularRaizQuadrada] = useState(false)
  const [entradaInvalida, setEntradaInvalida] = useState(false)

  const valueArrow = (e) => {
    setEntradaInvalida(false)
    switch (/\d$/.test(e.target.value)) {
      case true:
        setExpression(expression + e.target.value)
        break;
      case false:
        if (/\d$/.test(expression)) setExpression(expression + e.target.value)
        break;
    }
  }

  const calculator = {
    equal: () => {
      const resultado = expression.replace(/\b0\d+\b/g, (match) => Number(match));
      setExpression(eval(resultado).toString())
    },
    reset: () => { setExpression('') },
    numberSquared: () => {
      let potentiation = Math.pow(eval(expression), 2)
      setExpression(potentiation.toString())
    },
    deleteLast: () => { setExpression(expression.substring(0, expression.length - 1)) },
    squareRoot: () => {
      calculator.equal()
      setCalcularRaizQuadrada(true)
    }
  }

  useEffect(() => {
    if (/entrada invalida/gi.test(expression) && entradaInvalida === false) {
      setExpression(expression.replace(/entrada invalida/gi, ''))
    }
  }, [expression])

  useEffect(() => {
    if (calcularRaizQuadrada) {
      expression > 0 ? setExpression(Math.sqrt(expression).toString()) : invalidExpression()
    }
    setCalcularRaizQuadrada(false)
  }, [calcularRaizQuadrada])

  const invalidExpression = () => {
    setEntradaInvalida(true)
    setExpression('entrada invalida')
  }

  return (
    <main className={"flex items-center justify-center h-screen bg-slate-900"}>
      <div className="bg-lime-600 w-96 h-auto p-2">
        <div className={"flex align items-center w-auto rounded bg-white m-3 h-20"}>
          {expression}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button value='%' onClick={valueArrow}>%</button>
          <button onClick={valueArrow}>CE</button>
          <button onClick={calculator.reset}>C</button>
          <button value='7' onClick={calculator.deleteLast}>&lt;</button>

          <button value='' onClick={valueArrow}>1/x</button>
          <button value='' onClick={calculator.numberSquared}>x²</button>
          <button value='' onClick={calculator.squareRoot}>²√x</button>
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
          <button onClick={calculator.equal}>=</button>
        </div>
      </div>
    </main>
  )
}