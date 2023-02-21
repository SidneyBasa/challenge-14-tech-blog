document.querySelector("#signupform").addEventListener("submit",event=>{
    event.preventDefault();
    const loginObj = {
        username:document.querySelector("#signupId").value,
        password:document.querySelector("#signupPassword").value
    }
    console.log(loginObj)
    fetch("/api/userlogin",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/dashboard"
        } else {
            alert("trumpet sound")
        }
    })
})