//Hide and show content in the shop page
const actionButton = document.getElementById("action");
const breakfastList = document.getElementById("breakfast-list");

const toggleShowList = () => {
  const isHidden = breakfastList.style.display === "none";
  if (isHidden) {
    // Display hidden element
    breakfastList.style.display = "block";
    actionButton.innerHTML = "Hide List";
  } else {
    // Hide element
    breakfastList.style.display = "none";
    actionButton.innerHTML = "Show List";
  }
};

// Adding click event listener
actionButton.addEventListener("click", toggleShowList);