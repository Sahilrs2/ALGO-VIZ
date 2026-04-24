export function executeAlgorithm(algorithmId, inputData) {
  switch (algorithmId) {
    case 'bubble-sort':
      return bubbleSort(inputData)
    case 'quick-sort':
      return quickSort(inputData)
    case 'merge-sort':
      return mergeSort(inputData)
    case 'insertion-sort':
      return insertionSort(inputData)
    case 'selection-sort':
      return selectionSort(inputData)
    case 'heap-sort':
      return heapSort(inputData)
    case 'linear-search':
      return linearSearch(inputData)
    case 'binary-search':
      return binarySearch(inputData)
    case 'fibonacci':
      return fibonacci(inputData)
    case 'dfs':
      return dfs(inputData)
    case 'bfs':
      return bfs(inputData)
    default:
      return mockAlgorithm(algorithmId, inputData)
  }
}

// ---------------- SORTING ----------------

function bubbleSort(arr) {
  const steps = []
  const data = [...arr]
  let comparisons = 0
  let swaps = 0

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      comparisons++
      steps.push({
        action: 'compare',
        indices: [j, j + 1],
        values: [data[j], data[j + 1]],
        explanation: `Comparing ${data[j]} and ${data[j + 1]}`
      })

      if (data[j] > data[j + 1]) {
        ;[data[j], data[j + 1]] = [data[j + 1], data[j]]
        swaps++
        steps.push({
          action: 'swap',
          indices: [j, j + 1],
          values: [data[j], data[j + 1]],
          explanation: `Swapped elements`
        })
      }
    }
  }

  return {
    algorithm: 'Bubble Sort',
    category: 'sorting',
    steps,
    finalResult: data,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    comparisons,
    swaps
  }
}

function quickSort(arr) {
  const steps = []
  let comparisons = 0
  let swaps = 0

  const partition = (low, high, data) => {
    const pivot = data[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      comparisons++
      steps.push({
        action: 'compare',
        indices: [j, high],
        values: [data[j], pivot],
        explanation: `Comparing ${data[j]} with pivot ${pivot}`
      })

      if (data[j] < pivot) {
        i++
        ;[data[i], data[j]] = [data[j], data[i]]
        swaps++
        steps.push({
          action: 'swap',
          indices: [i, j],
          values: [data[i], data[j]],
          explanation: `Swapped elements`
        })
      }
    }

    ;[data[i + 1], data[high]] = [data[high], data[i + 1]]
    swaps++
    return i + 1
  }

  const sort = (low, high, data) => {
    if (low < high) {
      const pi = partition(low, high, data)
      sort(low, pi - 1, data)
      sort(pi + 1, high, data)
    }
  }

  const data = [...arr]
  sort(0, data.length - 1, data)

  return {
    algorithm: 'Quick Sort',
    category: 'sorting',
    steps,
    finalResult: data,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    comparisons,
    swaps
  }
}

function mergeSort(arr) {
  const steps = []
  let comparisons = 0

  const merge = (left, right) => {
    const result = []
    let i = 0, j = 0

    while (i < left.length && j < right.length) {
      comparisons++
      steps.push({
        action: 'compare',
        indices: [i, j],
        values: [left[i], right[j]],
        explanation: `Comparing ${left[i]} and ${right[j]}`
      })

      if (left[i] <= right[j]) {
        result.push(left[i++])
      } else {
        result.push(right[j++])
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j))
  }

  const sort = (arr) => {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    return merge(sort(arr.slice(0, mid)), sort(arr.slice(mid)))
  }

  const data = sort([...arr])

  return {
    algorithm: 'Merge Sort',
    category: 'sorting',
    steps,
    finalResult: data,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    comparisons,
    swaps: 0
  }
}

function insertionSort(arr) {
  const steps = []
  const data = [...arr]
  let comparisons = 0
  let shifts = 0

  for (let i = 1; i < data.length; i++) {
    const key = data[i]
    let j = i - 1

    while (j >= 0 && data[j] > key) {
      comparisons++
      data[j + 1] = data[j]
      shifts++
      j--
    }

    data[j + 1] = key
  }

  return {
    algorithm: 'Insertion Sort',
    category: 'sorting',
    steps,
    finalResult: data,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    comparisons,
    swaps: shifts
  }
}

function selectionSort(arr) {
  const steps = []
  const data = [...arr]
  let comparisons = 0
  let swaps = 0

  for (let i = 0; i < data.length - 1; i++) {
    let minIdx = i

    for (let j = i + 1; j < data.length; j++) {
      comparisons++
      if (data[j] < data[minIdx]) minIdx = j
    }

    if (minIdx !== i) {
      ;[data[i], data[minIdx]] = [data[minIdx], data[i]]
      swaps++
    }
  }

  return {
    algorithm: 'Selection Sort',
    category: 'sorting',
    steps,
    finalResult: data,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    comparisons,
    swaps
  }
}

// ---------------- SEARCH ----------------

function linearSearch(arr) {
  let comparisons = 0
  const array = arr.length > 1 ? arr.slice(0, -1) : arr;
  const target = arr.length > 1 ? arr[arr.length - 1] : arr[0];

  for (let i = 0; i < array.length; i++) {
    comparisons++
    if (array[i] === target) {
      return {
        algorithm: 'Linear Search',
        category: 'search',
        steps: [],
        finalResult: i,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        comparisons,
        swaps: 0
      }
    }
  }

  return {
    algorithm: 'Linear Search',
    category: 'search',
    steps: [],
    finalResult: -1,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    comparisons,
    swaps: 0
  }
}

function binarySearch(arr) {
  let comparisons = 0
  const array = arr.length > 1 ? [...arr.slice(0, -1)].sort((a,b)=>a-b) : arr;
  const target = arr.length > 1 ? arr[arr.length - 1] : arr[0];
  
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    comparisons++

    if (array[mid] === target) {
      return {
        algorithm: 'Binary Search',
        category: 'search',
        steps: [],
        finalResult: mid,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        comparisons,
        swaps: 0
      }
    }

    if (array[mid] < target) left = mid + 1
    else right = mid - 1
  }

  return {
    algorithm: 'Binary Search',
    category: 'search',
    steps: [],
    finalResult: -1,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    comparisons,
    swaps: 0
  }
}

// ---------------- GRAPH / TREES / OTHERS ----------------

function heapSort(arr) {
  const steps = []
  const data = [...arr]
  let comparisons = 0
  let swaps = 0

  const heapify = (n, i) => {
    let largest = i
    const l = 2 * i + 1
    const r = 2 * i + 2

    if (l < n) {
      comparisons++
      if (data[l] > data[largest]) largest = l
    }
    if (r < n) {
      comparisons++
      if (data[r] > data[largest]) largest = r
    }

    if (largest !== i) {
      ;[data[i], data[largest]] = [data[largest], data[i]]
      swaps++
      steps.push({
        action: 'swap',
        indices: [i, largest],
        values: [data[i], data[largest]],
        explanation: `Swapped for heapify`
      })
      heapify(n, largest)
    }
  }

  for (let i = Math.floor(data.length / 2) - 1; i >= 0; i--) {
    heapify(data.length, i)
  }

  for (let i = data.length - 1; i > 0; i--) {
    ;[data[0], data[i]] = [data[i], data[0]]
    swaps++
    steps.push({
      action: 'swap',
      indices: [0, i],
      values: [data[0], data[i]],
      explanation: `Moved root to end`
    })
    heapify(i, 0)
  }

  return {
    algorithm: 'Heap Sort',
    category: 'sorting',
    steps,
    finalResult: data,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    comparisons,
    swaps
  }
}

function dfs(arr) {
  const steps = []
  const data = [...arr]
  const visited = []
  
  const traverse = (index) => {
    if (index >= data.length) return
    
    steps.push({
      action: 'visit',
      indices: [index],
      values: [data[index]],
      explanation: `Visiting node ${data[index]}`
    })
    visited.push(data[index])
    
    traverse(2 * index + 1)
    traverse(2 * index + 2)
  }
  
  traverse(0)
  
  return {
    algorithm: 'Depth First Search',
    category: 'graph',
    steps,
    finalResult: visited,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    comparisons: 0,
    swaps: 0
  }
}

function bfs(arr) {
  const steps = []
  const data = [...arr]
  const visited = []
  const queue = [0]
  
  while (queue.length > 0) {
    const index = queue.shift()
    if (index >= data.length) continue
    
    steps.push({
      action: 'visit',
      indices: [index],
      values: [data[index]],
      explanation: `Visiting node ${data[index]}`
    })
    visited.push(data[index])
    
    const left = 2 * index + 1
    const right = 2 * index + 2
    
    if (left < data.length) queue.push(left)
    if (right < data.length) queue.push(right)
  }
  
  return {
    algorithm: 'Breadth First Search',
    category: 'graph',
    steps,
    finalResult: visited,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    comparisons: 0,
    swaps: 0
  }
}

function fibonacci(arr) {
  const n = arr[0] || 5
  const steps = []
  const data = [0, 1]
  
  if (n <= 0) return { finalResult: [0] }
  
  for (let i = 2; i <= n; i++) {
    data.push(data[i-1] + data[i-2])
    steps.push({
      action: 'add',
      indices: [i-1, i-2],
      values: [data[i-1], data[i-2]],
      explanation: `Calculated fib(${i}) = ${data[i]}`
    })
  }
  
  return {
    algorithm: 'Fibonacci',
    category: 'dynamic',
    steps,
    finalResult: data,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    comparisons: 0,
    swaps: 0
  }
}

function mockAlgorithm(algorithmId, arr) {
  return {
    algorithm: algorithmId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'other',
    steps: [{
      action: 'mock',
      indices: [0],
      values: arr,
      explanation: `Mock step for ${algorithmId}`
    }],
    finalResult: arr,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    comparisons: 0,
    swaps: 0
  }
}