const crosswordRow = (boundaries, cellWidth, i) => 
({
  name: 'crosswordRow',
  children: Object.fromEntries(
    Array.from(
      {length: boundaries.right - boundaries.left},
      (_, j) => [`cell${i}_${j}`, {
        name: 'cell',
        props: {
          style: {
            width: cellWidth + "%",
          }
        }
      }]
    )
  )
})

export { crosswordRow }
