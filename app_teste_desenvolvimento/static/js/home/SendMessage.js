function getCookie(name) {
    let cookieValue = null;

    if(document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for(let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if(cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

                break;
            }
        }
    }

    return cookieValue;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const userInput = document.getElementById("userInput");

    userInput.addEventListener("keyup", (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            
            form.requestSubmit();
        }
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
    
        if(message) {
            const initialText = document.getElementById("initialText");
            const interfaceInput = document.getElementById("interface");
    
            const messageElement = document.createElement("div");
    
            initialText.style.display = "none";
            interfaceInput.classList.remove("centerText");
            textarea.style.height = "auto";
    
            messageElement.classList.add("messageItem", "ms-auto", "me-0");
            messageElement.textContent = message;
    
            interfaceInput.appendChild(messageElement);
            interfaceInput.scrollTop = interfaceInput.scrollHeight;
            
            userInput.value = "";
            
            const csrftoken = getCookie("csrftoken");

            const request = new Request(
                "/get_message/",
                {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrftoken
                    },
                    mode: "same-origin",
                    body: JSON.stringify({ "message": message })
                }
            ); 
        
            fetch(request)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    
        userInput.focus();
    });
    
});