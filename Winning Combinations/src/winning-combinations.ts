type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const payingSymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const wildSymbol = 0;
  const result: WinningCombinationsResult = [];
  let lastValueAdded: number | null = null;

// For that passes through all line values
  for (let i = 0; i < lines.length; i++) {
    const symbol = lines[i];
    let newSymbol = 0;
// Checks if is a valid symbol
    if (symbol === wildSymbol || payingSymbols.includes(symbol)) {
      const consecutiveSymbols: number[] = [symbol];
      const winningPositions: number[] = [i];
// For that passes through all line values, comparing them to the current value
      for (let j = i + 1; j < lines.length; j++) {
// Checks if the current value is a wild or not
        if(symbol === wildSymbol){
          if(payingSymbols.includes(lines[j]) && newSymbol === 0) {
            newSymbol = lines[j]
            consecutiveSymbols.push(lines[j]);
            winningPositions.push(j);
          }
          else if(lines[j] === newSymbol || lines[j] === wildSymbol){
            consecutiveSymbols.push(lines[j]);
            winningPositions.push(j);
          }else{
            break;
          }
        }
        else{
          if (lines[j] === symbol || lines[j] === wildSymbol) {
            consecutiveSymbols.push(lines[j]);
            winningPositions.push(j);
          } else {
            break;
          }
        }
      }

// Get real value when line starts with a wild
      let currentValue = 0;
      for(let i = 0; i < consecutiveSymbols.length; i++){
        if(currentValue < consecutiveSymbols[i]){
          currentValue = consecutiveSymbols[i];
        }
      }

// Push Results
      if(lines.every(item => item === 0)){
        const symbolExists = result.some(([existingSymbol]) => existingSymbol === consecutiveSymbols[0]);
        if (!symbolExists) {
          result.push([currentValue, winningPositions]);
          lastValueAdded = currentValue;
        }
      }
      else if (consecutiveSymbols.length >= 3 && currentValue !== lastValueAdded && currentValue > 0) {
        const symbolExists = result.some(([existingSymbol]) => existingSymbol === consecutiveSymbols[0]);
        if (!symbolExists) {
          result.push([currentValue, winningPositions]);
          lastValueAdded = currentValue;
        }
      }
    }
  }
  
// Return Results
  if (result.length > 0) {
    return result;
  } else {
    return [];
  }
}

export const WinningCombinations = { call };