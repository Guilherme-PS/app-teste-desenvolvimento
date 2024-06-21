// Cookie
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

// Função principal
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const userInput = document.getElementById("userInput");
    const initialText = document.getElementById("initialText");
    const interfaceInput = document.getElementById("interface");
    const dots = document.getElementById("dots");

    // Foca o input
    userInput.focus();

    // Submit ao pressionar Enter
    userInput.addEventListener("keyup", (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            
            form.requestSubmit();
        }
    })

    // Submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
        
        if(message) {
            // Desabilita o input
            userInput.disabled = true;   

            // Exibe a mensagem do usuário na tela
            const messageElement = document.createElement("div");
            
            initialText.style.display = "none";
            interfaceInput.classList.remove("centerText");
            textarea.style.height = "auto";
    
            messageElement.classList.add("userInput", "messageItem", "ms-auto", "me-0");
            messageElement.textContent = message;
    
            interfaceInput.appendChild(messageElement);
            
            // Limpa o input
            userInput.value = "";
            
            const csrftoken = getCookie("csrftoken");

            // loading
            interfaceInput.appendChild(dots);
            dots.style.display = "inline-block";
            
            // Ajax
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
                    // Oculta o loading
                    dots.style.display = "none";

                    // Exibe a resposta na tela
                    const answerElement = document.createElement("div");

                    answerElement.classList.add("answer", "messageItem", "me-auto", "ms-0");
                    
                    answerElement.textContent = data.answer;

                    interfaceInput.appendChild(answerElement);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    // Habilita o input
                    userInput.disabled = false;  

                    // Desce a scrollbar
                    interfaceInput.scrollTop = interfaceInput.scrollHeight;

                    // Foca o input
                    userInput.focus();
                })

        }  
    });
    
});
