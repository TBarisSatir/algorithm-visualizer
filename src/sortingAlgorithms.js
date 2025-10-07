export const generateRandomArray = (size, min, max) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
};

// ===================================================================================
// BUBBLE SORT
// ===================================================================================

export const bubbleSortWithSteps = (array) => {
  const arr = [...array];
  const steps = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: [],
    message: "Initial array state",
  });

  for (let i = 0; i < n - 1; i++) {
    let swappedThisPass = false;
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...arr],
        compared: [j, j + 1],
        swapped: [],
        sorted: arr.slice(n - i),
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedThisPass = true;
        steps.push({
          array: [...arr],
          compared: [],
          swapped: [j, j + 1],
          sorted: arr.slice(n - i),
          message: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }
    if (!swappedThisPass) {
      steps.push({
        array: [...arr],
        compared: [],
        swapped: [],
        sorted: [...arr],
        message: "Array is sorted, no swaps in last pass.",
      });
      break;
    }
  }
  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: [...arr],
    message: "Sorting complete",
  });
  return steps;
};

// ===================================================================================
// MERGE SORT
// ===================================================================================

function merge(arr, left, mid, right, steps) {
  let n1 = mid - left + 1;
  let n2 = right - mid;
  let L = new Array(n1);
  let R = new Array(n2);

  for (let i = 0; i < n1; i++) L[i] = arr[left + i];
  for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

  let i = 0,
    j = 0,
    k = left;
  while (i < n1 && j < n2) {
    steps.push({
      array: [...arr],
      compared: [left + i, mid + 1 + j],
      swapped: [],
      sorted: [],
      message: `Comparing ${L[i]} and ${R[j]}`,
    });
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      steps.push({
        array: [...arr],
        compared: [],
        swapped: [k],
        sorted: [],
        message: `Placing ${L[i]} at index ${k}`,
      });
      i++;
    } else {
      arr[k] = R[j];
      steps.push({
        array: [...arr],
        compared: [],
        swapped: [k],
        sorted: [],
        message: `Placing ${R[j]} at index ${k}`,
      });
      j++;
    }
    k++;
  }
  while (i < n1) {
    arr[k] = L[i];
    steps.push({
      array: [...arr],
      compared: [],
      swapped: [k],
      sorted: [],
      message: `Placing remaining ${L[i]}`,
    });
    i++;
    k++;
  }
  while (j < n2) {
    arr[k] = R[j];
    steps.push({
      array: [...arr],
      compared: [],
      swapped: [k],
      sorted: [],
      message: `Placing remaining ${R[j]}`,
    });
    j++;
    k++;
  }
}

function mergeSortRecursive(arr, left, right, steps) {
  if (left >= right) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSortRecursive(arr, left, mid, steps);
  mergeSortRecursive(arr, mid + 1, right, steps);
  merge(arr, left, mid, right, steps);
}

export const mergeSortWithSteps = (array) => {
  const arr = [...array];
  const steps = [];
  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: [],
    message: "Initial array state for Merge Sort",
  });
  mergeSortRecursive(arr, 0, arr.length - 1, steps);
  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: [...arr],
    message: "Merge Sort complete",
  });
  return steps;
};

// ===================================================================================
// QUICK SORT
// ===================================================================================

function partition(arr, low, high, steps) {
  let pivot = arr[high];
  let i = low - 1;
  // Step: Announce the pivot
  steps.push({
    array: [...arr],
    pivotIndex: high,
    compared: [],
    swapped: [],
    sorted: [], // Ensure all properties exist
    message: `Choosing ${pivot} as the pivot.`,
  });

  for (let j = low; j < high; j++) {
    // Step: Compare element with pivot
    steps.push({
      array: [...arr],
      pivotIndex: high,
      partitionIndex: i,
      compared: [j],
      swapped: [], // Ensure all properties exist
      sorted: [], // Ensure all properties exist
      message: `Comparing ${arr[j]} with pivot.`,
    });

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      // Step: Announce a swap
      steps.push({
        array: [...arr],
        pivotIndex: high,
        partitionIndex: i,
        compared: [], // Ensure all properties exist
        swapped: [i, j],
        sorted: [], // Ensure all properties exist
        message: `Swapping ${arr[i]} and ${arr[j]}.`,
      });
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  // Step: Place pivot in its final sorted position
  steps.push({
    array: [...arr],
    pivotIndex: null,
    compared: [], // Ensure all properties exist
    swapped: [i + 1, high],
    sorted: [arr[i + 1]], // The pivot is now technically sorted
    message: `Placing pivot ${pivot} in its sorted position.`,
  });
  return i + 1;
}

function quickSortRecursive(arr, low, high, steps) {
  if (low < high) {
    let pi = partition(arr, low, high, steps);
    quickSortRecursive(arr, low, pi - 1, steps);
    quickSortRecursive(arr, pi + 1, high, steps);
  }
}

export const quickSortWithSteps = (array) => {
  const arr = [...array];
  const steps = [];
  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: [],
    message: "Initial array state for Quick Sort",
  });
  quickSortRecursive(arr, 0, arr.length - 1, steps);
  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: [...arr],
    message: "Quick Sort complete",
  });
  return steps;
};
