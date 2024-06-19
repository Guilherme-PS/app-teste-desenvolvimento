const textarea = document.querySelector("textarea");

const maxLines = 10;
const lineHeight = 20;

textarea.addEventListener("keyup", e => {
    textarea.style.height = "auto";

    let targetHeight = e.target.scrollHeight;
    let maxHeight = lineHeight * maxLines;

    if (targetHeight > maxHeight) {
        targetHeight = maxHeight;

        textarea.style.overflowY = "scroll";
    }

    else {
        textarea.style.overflowY = "hidden";
    }

    textarea.style.height = `${targetHeight}px`;
});

textarea.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
    }
});