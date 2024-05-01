function sendToOpenAI() {
    //const userInput = "Please create english test case for the attached app screen. If you have already generated the test case,mention test case name/ number that you are updating and update only the elements that have changed. Don't generate extra english, but start with test case number that is being updated.";
    const userInput = "Assume that there is only login, and no view balance etc. functionalities. Now update the test case created";
    const imageInput = document.getElementById('imageInput').files[0];
    console.log(imageInput);
    const responseArea = document.getElementById('responseArea');
    let imageDataUrl = `data:image/jpeg;base64,${imageInput}`;
    if (!imageInput) {
            responseArea.innerHTML = "Please upload an image file.";
            return;
    }

    const data = {
        model: "gpt-4-vision-preview",  // Specify the model
        messages: [{
            role: "user",
            content: [
                {
                  type: "text",
                  text: userInput,
                },
                // {                       //
                //   type: "image_url",
                //   image_url: {
                //     //url: "https://www.alldigitaltricks.com/wp-content/uploads/2020/04/SBI-yono-reset-mpin-1.png",
                //     url: "https://ankitkachru.github.io/img/YONO2.jpeg",
                //   },
                // },                      //
              ],
        }]
    };

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': $OPEN_AI_API_KEY
            
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the data for debugging
        const aiText = data.choices[0].message.content; // Assuming API response structure
        responseArea.innerHTML = aiText; // Displaying the response
    })
    .catch(error => {
        console.error('Error:', error);
        responseArea.innerHTML = "Error: Could not retrieve response.";
    });
}



