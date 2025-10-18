const CheckWin = (squares) => {
  const winCase = [
    // 5 Hàng ngang
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],

  // 5 Hàng dọc
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],

  // 2 Hàng chéo
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20]
  ]

 for ( const line of winCase ) {
  const isAllOdd = line.every(v => squares[v] % 2 === 1)
  const isAllEven = line.every(v => squares[v] % 2 === 0 && squares[v] !== 0)
  if(isAllOdd) return {winner: 'Odd' ,line: line }
  if(isAllEven) return {winner: 'Even' ,line: line }
  }
  return null
}
export default CheckWin