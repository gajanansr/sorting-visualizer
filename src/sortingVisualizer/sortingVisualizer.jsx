import React from "react";
import {
  getMergeSortAnimations,
  getBubbleSortAnimations,
  getHeapSortAnimations,
  getQuickSortAnimations,
} from "../sortingAlgorithms/sortingAlgorithms.js";
import "./sortingVisualizer.css";

const PRIMARY_COLOR = "#007bff";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 5,
      numberOfBars: 50,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const { numberOfBars } = this.state;
    const array = [];
    for (let i = 0; i < numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  handleSpeedChange = (event) => {
    const speed = event.target.value;
    let animationSpeed;
    if (speed === "slow") animationSpeed = 50; // Slow
    else if (speed === "medium") animationSpeed = 20; // Medium
    else animationSpeed = 2; // Fast
    this.setState({ animationSpeed });
  };

  handleBarCountChange = (event) => {
    const numberOfBars = parseInt(event.target.value, 10);
    this.setState({ numberOfBars }, () => this.resetArray());
  };

  mergeSort() {
    const { animationSpeed } = this.state;
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  quickSort() {
    const { animationSpeed } = this.state;
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [action, barOneIdx, barTwoIdx] = animations[i];
      if (action === "compare") {
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${barTwoIdx}px`;
        }, i * animationSpeed);
      }
    }
  }

  heapSort() {
    const { animationSpeed } = this.state;
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [action, barIdx, newHeight] = animations[i];
      if (action === "compare") {
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barIdx].style.backgroundColor = color;
          arrayBars[newHeight].style.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  bubbleSort() {
    const { animationSpeed } = this.state;
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [action, barOneIdx, barTwoIdx] = animations[i];
      if (action === "compare") {
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${barTwoIdx}px`;
        }, i * animationSpeed);
      }
    }
  }

  render() {
    const { array, numberOfBars } = this.state;

    return (
      <div className="main-div">
        <div className="array-container">
          {/* Array Bars */}
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${Math.floor(100 / this.state.numberOfBars)}%`,
              }}
            ></div>
          ))}
          <br />
        </div>
        <div>
          {/* Controls */}
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>

          <br />

          {/* Speed Dropdown */}
          <label htmlFor="speed-select">Animation Speed: </label>
          <select id="speed-select" onChange={this.handleSpeedChange}>
            <option value="fast">Fast</option>
            <option value="medium">Medium</option>
            <option value="slow">Slow</option>
          </select>

          {/* Bar Count Slider */}
          <label htmlFor="bar-count">Number of Bars: {numberOfBars}</label>
          <input
            id="bar-count"
            type="range"
            min="10"
            max="100"
            value={numberOfBars}
            onChange={this.handleBarCountChange}
          />
        </div>
        <footer className="footer">
          <p>
            Designed and Developed by &copy;{" "}
            <a
              href="https://github.com/gajanansr"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              Gajanan
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

// Utility Functions
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
