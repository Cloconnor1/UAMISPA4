document.addEventListener("DOMContentLoaded", function () {
    const exerciseList = document.getElementById("exercise-list");
    const exerciseForm = document.getElementById("exercise-form");
    const activityTypeInput = document.getElementById("activity-type");
    const distanceInput = document.getElementById("distance");
    const dateCompletedInput = document.getElementById("date-completed");

    // In-memory data store for exercises with dummy data
    const exercises = [
        {
            id: 1,
            activity_type: "Cycling",
            distance_miles: 12.2,
            date_completed: "2023-10-18",
            pinned: false,
        },
        {
            id: 2,
            activity_type: "Running",
            distance_miles: 5.5,
            date_completed: "2023-10-16",
            pinned: false,
        },
        {
            id: 3,
            activity_type: "Swimming",
            distance_miles: 0.75,
            date_completed: "2023-10-15",
            pinned: true,
        },
    ];

    // Function to display exercises
    function displayExercises() {
        exerciseList.innerHTML = ""; // Clear existing list
        exercises.forEach((exercise) => {
            // Create and append exercise elements to the list
            const exerciseItem = document.createElement("tr");
            exerciseItem.innerHTML = `
                <td>${exercise.activity_type}</td>
                <td>${exercise.distance_miles}</td>
                <td>${exercise.date_completed}</td>
                <td>
                    <button class="pin-button" data-id="${exercise.id}">Pin</button>
                    <button class="delete-button" data-id="${exercise.id}">Delete</button>
                </td>
            `;

            // Add event listeners for pin and delete buttons
            const pinButton = exerciseItem.querySelector(".pin-button");
            pinButton.addEventListener("click", () => pinExercise(exercise.id));
            const deleteButton = exerciseItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => deleteExercise(exercise.id));

            exerciseList.appendChild(exerciseItem);
        });
    }

    // Function to add a new exercise
    function addExercise() {
        const newExercise = {
            id: exercises.length + 1,
            activity_type: activityTypeInput.value,
            distance_miles: parseFloat(distanceInput.value),
            date_completed: dateCompletedInput.value,
            pinned: false,
        };

        exercises.push(newExercise);

        // Clear the form inputs and update the exercise list
        activityTypeInput.value = "";
        distanceInput.value = "";
        dateCompletedInput.value = "";
        displayExercises();
    }

    // Function to pin/unpin an exercise
    function pinExercise(exerciseId) {
        const exercise = exercises.find((e) => e.id === exerciseId);
        if (exercise) {
            exercise.pinned = !exercise.pinned;
            // Move the pinned exercise to the top
            if (exercise.pinned) {
                const index = exercises.indexOf(exercise);
                exercises.splice(index, 1);
                exercises.unshift(exercise);
            }
            displayExercises(); // Update the exercise list
        }
    }

    // Function to delete an exercise
    function deleteExercise(exerciseId) {
        const index = exercises.findIndex((e) => e.id === exerciseId);
        if (index !== -1) {
            exercises.splice(index, 1);
            displayExercises(); // Update the exercise list
        }
    }

    // Attach a submit event listener to the exercise form
    exerciseForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting
        addExercise();
    });

    // Display exercises when the page loads
    displayExercises();
});
