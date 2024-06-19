document.addEventListener("DOMContentLoaded", () => {
    const questionInput = document.getElementById("questionInput");
    const inputContainer = document.getElementById("inputContainer");
    const initialText = document.getElementById("initialText");

    const textarea = document.querySelector("textarea");

    questionInput.addEventListener("keyup", (e) => {
        e.preventDefault();

        if (e.key === "Enter" && !e.shiftKey) {
            const message = questionInput.value.trim();

            if (message) {
                initialText.style.display = "none";
                inputContainer.classList.remove("centerText");
                textarea.style.height = "auto";

                const messageElement = document.createElement("div");

                messageElement.classList.add("messageItem", "ms-auto", "me-0");
                messageElement.textContent = message;

                inputContainer.appendChild(messageElement);

                questionInput.value = "";
                questionInput.focus();
            }
        }
    });
});
