//MergeSort

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);

    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);

    animations.push([i, i]);

    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);

    animations.push([j, j]);

    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//QuickSort

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push(["compare", i, endIdx]);
    animations.push(["compare", i, endIdx]);
    if (array[i] < pivotValue) {
      animations.push(["swap", i, array[pivotIdx]]);
      animations.push(["swap", pivotIdx, array[i]]);
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
      pivotIdx++;
    }
  }
  animations.push(["swap", pivotIdx, array[endIdx]]);
  animations.push(["swap", endIdx, array[pivotIdx]]);
  [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
  return pivotIdx;
}

//HeapSort

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  buildMaxHeap(array, animations);
  for (let end = array.length - 1; end > 0; end--) {
    animations.push(["swap", 0, array[end]]);
    animations.push(["swap", end, array[0]]);
    [array[0], array[end]] = [array[end], array[0]];
    siftDown(array, 0, end, animations);
  }
  return animations;
}

function buildMaxHeap(array, animations) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(array, currentIdx, array.length, animations);
  }
}

function siftDown(array, startIdx, endIdx, animations) {
  let childOneIdx = 2 * startIdx + 1;
  while (childOneIdx < endIdx) {
    const childTwoIdx = childOneIdx + 1 < endIdx ? childOneIdx + 1 : -1;
    let idxToSwap = childOneIdx;
    if (childTwoIdx !== -1 && array[childTwoIdx] > array[childOneIdx]) {
      idxToSwap = childTwoIdx;
    }
    animations.push(["compare", startIdx, idxToSwap]);
    animations.push(["compare", startIdx, idxToSwap]);
    if (array[idxToSwap] > array[startIdx]) {
      animations.push(["swap", startIdx, array[idxToSwap]]);
      animations.push(["swap", idxToSwap, array[startIdx]]);
      [array[startIdx], array[idxToSwap]] = [array[idxToSwap], array[startIdx]];
      startIdx = idxToSwap;
      childOneIdx = 2 * startIdx + 1;
    } else {
      return;
    }
  }
}

//BubbleSort

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      animations.push(["compare", j, j + 1]);
      animations.push(["compare", j, j + 1]);
      if (array[j] > array[j + 1]) {
        animations.push(["swap", j, array[j + 1]]);
        animations.push(["swap", j + 1, array[j]]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
}
