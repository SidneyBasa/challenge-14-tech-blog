document.querySelector("#commentForm").addEventListener("commentButton",event=>{
    event.preventDefault();
    const commentObj = {
        comment:document.querySelector("#commentInput").value
    }
    console.log(commentObj)
    // Creating a blogpost
    // http://api/blogs
    fetch("/api/blogs/:id",{
        method:"POST",
        body:JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})