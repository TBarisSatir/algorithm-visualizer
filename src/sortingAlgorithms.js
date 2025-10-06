/**
 * Generates an array of random integers.
 * @param {number} size - The number of elements in the array.
 * @param {number} min - The minimum value for elements.
 * @param {number} max - The maximum value for elements.
 * @returns {number[]} An array of random integers.
 */
export const generateRandomArray = (size, min, max) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
};

/**
 * Bubble Sort algorithm that records visualization steps.
 * Each step records the entire array state, indices being compared, and potentially swapped.
 * @param {number[]} array - The array to sort.
 * @returns {object[]} An array of step objects, each containing the array state and metadata.
 */
export const bubbleSortWithSteps = (array) => {
  const arr = [...array]; // Create a copy to avoid modifying the original array
  const steps = [];
  const n = arr.length;

  // Record initial state
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
      // Record comparison step
      steps.push({
        array: [...arr],
        compared: [j, j + 1], // Mark elements being compared
        swapped: [],
        sorted: arr.slice(n - i), // Elements already sorted in previous passes
        message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedThisPass = true;

        // Record swap step
        steps.push({
          array: [...arr],
          compared: [], // No comparison highlight after swap
          swapped: [j, j + 1], // Mark elements that were swapped
          sorted: arr.slice(n - i),
          message: `Swapping ${arr[j + 1]} and ${arr[j]}`, // Note: arr[j+1] is old arr[j]
        });
      }
    }
    // If no two elements were swapped in inner loop, then break
    if (!swappedThisPass) {
      steps.push({
        array: [...arr],
        compared: [],
        swapped: [],
        sorted: arr.slice(0, n), // All elements are sorted
        message: "No swaps in this pass, array is sorted",
      });
      break;
    }

    // After each pass, the last `i+1` elements are in their final sorted position
    // Mark them as sorted for visualization
    steps.push({
      array: [...arr],
      compared: [],
      swapped: [],
      sorted: arr.slice(n - 1 - i), // Elements already sorted
      message: `End of pass ${i + 1}. Element ${
        arr[n - 1 - i]
      } is in final position.`,
    });
  }

  // Final state (all sorted)
  steps.push({
    array: [...arr],
    compared: [],
    swapped: [],
    sorted: arr.slice(0, n), // All elements are sorted
    message: "Sorting complete",
  });

  return steps;
};

// You can add mergeSortWithSteps, quickSortWithSteps here following a similar pattern
/*
export const mergeSortWithSteps = (array) => { ... };
export const quickSortWithSteps = (array) => { ... };
*/
