console.log("Content script running");
document.body.innerHTML += "<div>Hello from Chrome Extension!</div>";

document.body.innerHTML += '<div class="floating-button"></div>';
const styleElement = document.createElement("style");
const styleCss = `
.floating-button {
    position: fixed;
    bottom: 20px; /* Adjust this value to change the distance from the bottom */
    right: 20px; /* Adjust this value to change the distance from the right */
    background-color: #3498db; /* Button background color */
    color: #fff; /* Button text color */
    width: 50px; /* Button width */
    height: 50px; /* Button height */
    border-radius: 50%; /* Make the button circular */
    border: none; /* Remove border */
    cursor: pointer; /* Show pointer cursor on hover */
    z-index: 9999; /* Ensure the button stays above other elements */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
    display: flex; /* Make the icon center vertically and horizontally */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    transition: background-color 0.3s ease; /* Add transition for background-color */
  }
  
  .floating-button:hover {
    background-color: #2980b9; /* Button background color on hover */
    transform: scale(1.1); /* Scale up the button on hover */
  }
  
  .floating-button i {
    font-size: 24px; /* Adjust the icon size */
    transition: transform 0.3s ease; /* Add transition for transform */
  }
  
  `;

styleElement.innerHTML = styleCss;
document.head.appendChild(styleElement);
