// document.querySelector("#updateform").addEventListener("submit",event=>{
//     event.preventDefault();
//     const blogUpdateObj = {
//         blog_title:document.querySelector("#title").value,
//         blogpost:document.querySelector("#posting").value
//     }
//     console.log(blogUpdateObj)
//     fetch("/api/blogs",{
//         method:"PUT",
//         body:JSON.stringify(blogUpdateObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         if(res.ok){
//            location.href="/dashboard"
//         } else {
//             alert("trumpet sound")
//         }
//     })
// })

// Saturday March 4 2023 @ 6:33pm
// adding click detection for each section
document.querySelectorAll(".box").forEach(section=> {
    section.addEventListener('click', (e) => {
        console.log("A section box has been detected")
        fetch("/api/blogs",{
            method:"PUT",
            body:JSON.stringify(blogObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.href="/dashboard"
            //    console.log("=========================")
            //    console.log("Test of redirect after blog post creation")
            //    console.log("=========================")
            } else {
                alert("Please login before updating a blog post")
            }
        })
    })
})