const floors = document.getElementById("floors");
const lifts = document.getElementById("lifts");
const submit = document.getElementById("submit");
const floorCount = document.getElementById("floor_count");
const liftCount = document.getElementById("lift_count");
const floorsContainer = document.getElementById("floors_container");

function handleSubmit(e) {
  e.preventDefault();
  const floor = floors.value;
  const lift = lifts.value;

  if (floor === "" || lift === "") {
    alert("Please enter the floor and lift count");
    return;
  }

  floorCount.innerText = floor;
  liftCount.innerText = lift;

  // clear the floors container
  floorsContainer.innerHTML = "";

  for (let i = 1; i <= floor; i++) {
    createFloor(i === 1, i, floor); // the first element is appended on the top hence the last floor styles are added with first index
  }
}

function createFloor(lastFloor, index, totalFloors) {
  const floor = document.createElement("div");
  const floorNumber = document.createElement("span");
  const floorButtonsContainer = document.createElement("div");
  const upButton = document.createElement("button");
  const downButton = document.createElement("button");

  const currentFloor = totalFloors - index + 1;
  upButton.innerText = "↑";
  downButton.innerText = "↓";
  floorNumber.innerText = currentFloor;

  floorButtonsContainer.classList.add("floor-btn-container");
  floorNumber.classList.add("floor-number");
  upButton.classList.add("floor-btn");
  downButton.classList.add("floor-btn");

  upButton.addEventListener("click", requestLift(currentFloor, "up"));

  downButton.addEventListener("click", requestLift(currentFloor, "down"));

  floorButtonsContainer.appendChild(floorNumber);
  floorButtonsContainer.appendChild(upButton);
  floorButtonsContainer.appendChild(downButton);
  floor.appendChild(floorButtonsContainer);

  floor.classList.add("floor");
  if (lastFloor) {
    floor.classList.add("floor--last");
  }
  floorsContainer.appendChild(floor);
}

function requestLift(floor, direction) {
  return function () {
    console.log(`Requesting lift to floor ${floor} in ${direction} direction`);
  };
}

submit.addEventListener("click", handleSubmit);
