// === MINI MANI WIDGET ===
// Add this script to any website: <script src="https://YOURDOMAIN.com/mini-mani.js"></script>

(function () {
    // Create the button
    const bubble = document.createElement("div");
    bubble.innerText = "💬 Mini Mani";
    bubble.style.position = "fixed";
    bubble.style.bottom = "20px";
    bubble.style.right = "20px";
    bubble.style.background = "#4B4DED";
    bubble.style.color = "#fff";
    bubble.style.padding = "12px 18px";
    bubble.style.borderRadius = "25px";
    bubble.style.cursor = "pointer";
    bubble.style.fontFamily = "Georgia";
    bubble.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
    document.body.appendChild(bubble);

    // Create the chat box
    const box = document.createElement("div");
    box.style.position = "fixed";
    box.style.bottom = "70px";
    box.style.right = "20px";
    box.style.width = "300px";
    box.style.height = "380px";
    box.style.background = "white";
    box.style.borderRadius = "12px";
    box.style.boxShadow = "0 4px 18px rgba(0,0,0,0.2)";
    box.style.display = "none";
    box.style.flexDirection = "column";
    box.style.fontFamily = "Georgia";

    box.innerHTML = `
        <div style="background:#4B4DED;color:#fff;padding:12px;text-align:center;font-weight:bold;">
            Mini Mani
        </div>
        <div id="mani-messages" style="flex:1;padding:10px;overflow-y:auto;font-size:14px;"></div>
        <input id="mani-input" placeholder="Ask Mini Mani..." 
               style="border:none;border-top:1px solid #ccc;padding:12px;width:100%;outline:none;">
    `;
    document.body.appendChild(box);

    bubble.onclick = () => {
        box.style.display = box.style.display === "none" ? "flex" : "none";
    };

    // Send and receive messages
    document.getElementById("mani-input").addEventListener("keypress", async function (e) {
        if (e.key === "Enter") {
            const text = this.value;
            this.value = "";
            appendMessage("You", text);

            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer YOUR_API_KEY_HERE"
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: "You are Mini Mani, Imani's helpful assistant." },
                        { role: "user", content: text }
                    ]
                })
            });

            const data = await res.json();
            const reply = data.choices[0].message.content;
            appendMessage("Mini Mani", reply);
        }
    });

    function appendMessage(sender, text) {
        const msgBox = document.getElementById("mani-messages");
        const div = document.createElement("div");
        div.innerHTML = `<strong>${sender}:</strong> ${text}`;
        div.style.marginBottom = "10px";
        msgBox.appendChild(div);
        msgBox.scrollTop = msgBox.scrollHeight;
    }
})();
