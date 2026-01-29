// STUDENT REGISTRATION

function register() {

  let name = document.getElementById("name").value;
  let roll = document.getElementById("roll").value;
  let email = document.getElementById("email").value;
  let event = document.getElementById("event").value;

  let student = {
    name: name,
    roll: roll,
    email: email,
    event: event,
    status: "Pending"
  };

  let data = JSON.parse(localStorage.getItem("students")) || [];
  data.push(student);
  localStorage.setItem("students", JSON.stringify(data));

  document.getElementById("msg").innerText = "Registration Successful!";

  checkStatus();
}


// ADMIN VIEW PARTICIPANTS

function showData() {

  let data = JSON.parse(localStorage.getItem("students")) || [];

  let output = "";

  if (data.length === 0) {
    output = "<p>No registrations found</p>";
  }

  data.forEach((item, index) => {

    output += `
      <div style="background:white; padding:10px; margin:10px;">
        <b>${item.name}</b><br>
        Roll: ${item.roll}<br>
        Event: ${item.event}<br>
        Status: ${item.status}<br><br>

        <button onclick="updateStatus(${index}, 'Confirmed')">Confirm</button>
        <button onclick="updateStatus(${index}, 'Rejected')">Reject</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </div>
    `;
  });

  document.getElementById("output").innerHTML = output;
}



// UPDATE STATUS

function updateStatus(index, newStatus) {

  let data = JSON.parse(localStorage.getItem("students"));
  data[index].status = newStatus;

  localStorage.setItem("students", JSON.stringify(data));

  showData();
}


// ANNOUNCEMENT SYSTEM

function sendAnnouncement() {

  let text = document.getElementById("announcementText").value;

  localStorage.setItem("announcement", text);

  alert("Announcement Sent Successfully!");
}


// STUDENT STATUS + ANNOUNCEMENT DISPLAY

function checkStatus() {

  let data = JSON.parse(localStorage.getItem("students")) || [];

  if (data.length > 0) {
    let last = data[data.length - 1];
    document.getElementById("statusBox").innerText = last.status;
  }

  let ann = localStorage.getItem("announcement");
  if (ann) {
    document.getElementById("announcementBox").innerText = ann;
  }
}

function deleteUser(index) {

  if (confirm("Are you sure to delete this registration?")) {

    let data = JSON.parse(localStorage.getItem("students"));
    data.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(data));

    showData();
  }
}


