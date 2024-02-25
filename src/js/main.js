const floors = document.getElementById("floors");
const lifts = document.getElementById("lifts");
const submit = document.getElementById("submit");
const floorCount = document.getElementById("floor_count");
const liftCount = document.getElementById("lift_count");
const floorsContainer = document.getElementById("floors_container");
const liftsContainer = document.getElementById("lifts_container");

const liftStates = {};
const requestStack = [];

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

  for (let i = 1; i <= lift; i++) {
    createLift(i);
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
    const lift = findLift(floor, direction);
  };
}

function createLift(index) {
  const lift = document.createElement("div");
  const doorLeft = document.createElement("div");
  const doorRight = document.createElement("div");

  liftStates[index] = {
    currentFloor: 1,
    status: "idle",
    nextFloor: null,
  };

  lift.classList.add("lift");
  lift.id = `lift-${index}`;
  doorLeft.classList.add("door", "door--left");
  doorRight.classList.add("door", "door--right");

  lift.appendChild(doorLeft);
  lift.appendChild(doorRight);
  liftsContainer.appendChild(lift);
}

function findLift(floor, direction) {
  // const idleLift = Object.keys(liftStates).find(
  //   (lift) => liftStates[lift].status === "idle"
  // );

  // console.log(idleLift);

  // if (idleLift) {
  //   liftStates[idleLift].status = "moving";
  //   liftStates[idleLift].nextFloor = floor;

  //   console.log("liftStates", liftStates);
  //   return idleLift;
  // }

  // const movingLift = Object.keys(liftStates).find(
  //   (lift) => liftStates[lift].status === "moving"
  // );

  // console.log(movingLift);

  // if (movingLift) {
  //   liftStates[movingLift].nextFloor = floor;
  //   console.log("af liftStates", liftStates);
  //   return movingLift;
  // }

  const idleLift = document.getElementById(`lift-1`);
  const idleListFloor = liftStates[1].currentFloor;
  const floorDiff = Math.abs(idleListFloor - floor);

  setTimeout(() => {
    liftStates[1].currentFloor = floor;
    console.log("floorDiff", floorDiff);
    idleLift.style.transform = `translateY(${floor * -100 + 100}px)`;
    idleLift.style.transition = `transform ${floorDiff}s`;
  }, 0);

  setTimeout(() => {
    openDoors(idleLift);
  }, floorDiff * 1000);

  setTimeout(
    () => {
      closeDoors(idleLift);
    },
    floorDiff * 1000 + 3000
  );
}

function openDoors(lift) {
  const [doorLeft, doorRight] = lift.children;

  doorLeft.classList.remove("doorLeftClose");
  doorRight.classList.remove("doorRightClose");
  doorLeft.classList.add("doorLeftOpen");
  doorRight.classList.add("doorRightOpen");
}

function closeDoors(lift) {
  const [doorLeft, doorRight] = lift.children;

  console.log("closeDoors", doorLeft, doorRight);
  doorLeft.classList.remove("doorLeftOpen");
  doorRight.classList.remove("doorRightOpen");
  doorLeft.classList.add("doorLeftClose");
  doorRight.classList.add("doorRightClose");
}

submit.addEventListener("click", handleSubmit);
