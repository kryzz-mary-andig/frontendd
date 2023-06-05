const form = document.getElementById("form_sentence");
if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);


    let sentence = formData.get("sentence");
    if(sentence <=5 ){
      alertMessage("error","Please state more than 1 the color");
      return; 
    }
    
    const response =  await window.axios.openAI(formData.get("sentence"));
    document.getElementById("response_user").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\\n/g,"");
  };
}

function alertMessage(status, sentence){
  window.Toastify.showToast({
    text: sentence,
    duration: 5000,
    stopOnFocus: true, 
    style: {
      textAlign: "center",
      background: status == "error" ?"red": "green",
      color: "white",
      padding: "5px",
      marginTop: "2px",
    }
  });

}