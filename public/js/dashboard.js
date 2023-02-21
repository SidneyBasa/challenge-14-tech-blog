document.querySelector("#dashboardForm").addEventListener("submit",event=>{
    event.preventDefault();
    const blogObj = {
        blog_title:document.querySelector("#title").value,
        blogpost:document.querySelector("#posting").value
    }
    console.log(blogObj)
    // Creating a blogpost
    // http://api/blogs
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
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