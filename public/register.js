document.getElementById("registerForm").addEventListener("submit",async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try{
        const response = await fetch("/api/auth/register",{
            method :"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password,role})
        });
        const data = await response.json();
        //This waits for the backend to respond and then converts the response (which is JSON) into a JavaScript object called data
        if(response.ok){
            alert("Registered successfully! Please login.");
            window.location.href = "/login.html";
        }else{
            alert("Registeration failed:" + data.message);
        }
    }catch(err){
        console.error("Error:",err);
        alert("Something went wrong during registration!");
    }

});